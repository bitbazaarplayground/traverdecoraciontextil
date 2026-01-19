// Netlify Function: GET /.netlify/functions/availability?days=14
// Returns available 1-hour start times that block 2 hours per booking.

function json(statusCode, bodyObj) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
    body: JSON.stringify(bodyObj, null, 2),
  };
}

/**
 * Parse GMT offset like "GMT", "GMT+1", "GMT-0", "GMT+01:00"
 * Returns offset minutes relative to UTC (e.g. +60 for GMT+1).
 */
function parseGmtOffsetToMinutes(tzName) {
  if (!tzName || tzName === "GMT" || tzName === "UTC") return 0;
  // Examples: "GMT+1", "GMT+01:00", "GMT-0", "GMT-00:30"
  const m = tzName.match(/^GMT([+-])(\d{1,2})(?::?(\d{2}))?$/);
  if (!m) return 0;
  const sign = m[1] === "-" ? -1 : 1;
  const hours = Number(m[2] || 0);
  const mins = Number(m[3] || 0);
  return sign * (hours * 60 + mins);
}

/**
 * Get the timezone offset (minutes) for a given UTC date/time in a target IANA timezone.
 * For Europe/London, this handles DST properly.
 */
function getOffsetMinutesForZone(dateUtc, timeZone) {
  const dtf = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    timeZoneName: "shortOffset", // Node 18 supports this
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const parts = dtf.formatToParts(dateUtc);
  const tzPart = parts.find((p) => p.type === "timeZoneName")?.value;
  return parseGmtOffsetToMinutes(tzPart);
}

/**
 * Convert a local time in a given zone (YYYY-MM-DD + HH:mm) into a UTC Date.
 * We do this by:
 *  - building a "fake UTC date" using the local components
 *  - then subtracting the zone offset at that moment
 */
function zonedLocalToUtcDate({ y, m, d, hh, mm }, timeZone) {
  // Create a date as if local components were UTC
  const pretendUtc = new Date(Date.UTC(y, m - 1, d, hh, mm, 0, 0));
  const offsetMin = getOffsetMinutesForZone(pretendUtc, timeZone);
  return new Date(pretendUtc.getTime() - offsetMin * 60_000);
}

/** Format YYYY-MM-DD for a Date in a specific timezone */
function formatYMDInZone(dateUtc, timeZone) {
  const dtf = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return dtf.format(dateUtc); // en-CA gives YYYY-MM-DD
}

/** Get weekday (1..7) Monday..Sunday for a date in zone */
function weekdayInZone(dateUtc, timeZone) {
  const dtf = new Intl.DateTimeFormat("en-GB", { timeZone, weekday: "short" });
  const w = dtf.format(dateUtc).toLowerCase();
  // mon,tue,wed,thu,fri,sat,sun
  const map = { mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6, sun: 7 };
  const key = w.slice(0, 3);
  return map[key] || 7;
}

/** Simple overlap test: [aStart,aEnd) overlaps [bStart,bEnd) */
function overlaps(aStartMs, aEndMs, bStartMs, bEndMs) {
  return aStartMs < bEndMs && aEndMs > bStartMs;
}

/**
 * Opening hours config (local Europe/London).
 * Each day returns one or more segments with { startHour, endHour }.
 * endHour is "closing hour" (exclusive).
 */
function getOpeningSegments(weekday /* 1..7 */) {
  // Example schedule:
  // Mon-Fri: 09-13 and 16-20
  // Sat: 10-14
  // Sun: closed
  if (weekday >= 1 && weekday <= 5) {
    return [
      { startHour: 9, endHour: 13 },
      { startHour: 16, endHour: 20 },
    ];
  }
  if (weekday === 6) return [{ startHour: 10, endHour: 14 }];
  return []; // Sunday closed
}

/**
 * Generate candidate 1-hour start times (local) for a given date,
 * where each booking blocks `blockMinutes` (e.g. 120).
 */
function generateCandidateStartsForDay({ y, m, d }, timeZone, blockMinutes) {
  const weekday = weekdayInZone(
    new Date(Date.UTC(y, m - 1, d, 12, 0, 0)),
    timeZone
  );
  const segments = getOpeningSegments(weekday);
  const candidates = [];

  for (const seg of segments) {
    const { startHour, endHour } = seg;

    // 1-hour start times, but must fit the block window fully in segment:
    // start + blockMinutes <= endHour
    const latestStart = endHour - blockMinutes / 60;
    for (let hh = startHour; hh <= latestStart; hh += 1) {
      candidates.push({ hh, mm: 0 });
    }
  }
  return candidates;
}

/** Fetch rows from Supabase REST using anon key (RLS must allow reads for admin later; for now these tables are protected, so we fetch only public fields that are readable or we switch to service role later.) */
async function supabaseGet({ url, anonKey, path }) {
  const res = await fetch(`${url}/rest/v1/${path}`, {
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${anonKey}`,
      "Content-Type": "application/json",
    },
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`Supabase GET failed: ${res.status} ${text}`);
  }
  return text ? JSON.parse(text) : [];
}

exports.handler = async function handler(event) {
  try {
    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      return json(500, {
        error: "Missing SUPABASE_URL or SUPABASE_ANON_KEY env vars",
      });
    }

    const timeZone = "Europe/London";
    const blockMinutes = 120;
    const leadTimeDays = 2;

    const days = Math.max(
      1,
      Math.min(
        30,
        Number(
          new URLSearchParams(event.queryStringParameters || {}).get("days") ||
            14
        )
      )
    );

    // Today in London (YYYY-MM-DD)
    const nowUtc = new Date();
    const todayYMD = formatYMDInZone(nowUtc, timeZone);

    // Parse YYYY-MM-DD
    const [ty, tm, td] = todayYMD.split("-").map(Number);

    // earliest bookable date = today + leadTimeDays (in local calendar)
    const earliestLocalNoonUtc = zonedLocalToUtcDate(
      { y: ty, m: tm, d: td, hh: 12, mm: 0 },
      timeZone
    );
    const earliestDate = new Date(
      earliestLocalNoonUtc.getTime() + leadTimeDays * 24 * 60 * 60_000
    );

    // Build list of days (local dates) starting from earliestDate
    const dayList = [];
    for (let i = 0; i < days; i++) {
      const dUtc = new Date(earliestDate.getTime() + i * 24 * 60 * 60_000);
      const ymd = formatYMDInZone(dUtc, timeZone);
      const [y, m, d] = ymd.split("-").map(Number);
      dayList.push({ y, m, d, ymd });
    }

    // Define query range in UTC for fetching bookings/blackouts
    // From first day 00:00 local to last day 23:59 local (converted to UTC)
    const first = dayList[0];
    const last = dayList[dayList.length - 1];

    const rangeStartUtc = zonedLocalToUtcDate(
      { y: first.y, m: first.m, d: first.d, hh: 0, mm: 0 },
      timeZone
    );
    const rangeEndUtc = zonedLocalToUtcDate(
      { y: last.y, m: last.m, d: last.d, hh: 23, mm: 59 },
      timeZone
    );

    // Pull existing reserved bookings + blackouts in a broad range, then filter in JS.
    // NOTE: This requires your Supabase RLS to allow SELECT for anon on these tables.
    // If you’ve locked them down (recommended), we’ll switch this function to use SERVICE_ROLE via Netlify secrets in Step 2.
    const bookings = await supabaseGet({
      url: SUPABASE_URL,
      anonKey: SUPABASE_ANON_KEY,
      path:
        `bookings?select=id,start_time,end_time,status` +
        `&status=eq.reserved` +
        `&start_time=lt.${encodeURIComponent(rangeEndUtc.toISOString())}` +
        `&end_time=gt.${encodeURIComponent(rangeStartUtc.toISOString())}`,
    });

    const blackouts = await supabaseGet({
      url: SUPABASE_URL,
      anonKey: SUPABASE_ANON_KEY,
      path:
        `blackouts?select=id,start_time,end_time,reason` +
        `&start_time=lt.${encodeURIComponent(rangeEndUtc.toISOString())}` +
        `&end_time=gt.${encodeURIComponent(rangeStartUtc.toISOString())}`,
    });

    const busyRanges = [
      ...bookings
        .filter((b) => b.start_time && b.end_time)
        .map((b) => ({
          kind: "booking",
          startMs: new Date(b.start_time).getTime(),
          endMs: new Date(b.end_time).getTime(),
        })),
      ...blackouts
        .filter((b) => b.start_time && b.end_time)
        .map((b) => ({
          kind: "blackout",
          startMs: new Date(b.start_time).getTime(),
          endMs: new Date(b.end_time).getTime(),
        })),
    ];

    const outputDays = [];

    for (const day of dayList) {
      const candidates = generateCandidateStartsForDay(
        day,
        timeZone,
        blockMinutes
      );

      const slots = [];
      for (const c of candidates) {
        const startUtc = zonedLocalToUtcDate(
          { y: day.y, m: day.m, d: day.d, hh: c.hh, mm: c.mm },
          timeZone
        );
        const endUtc = new Date(startUtc.getTime() + blockMinutes * 60_000);

        const startMs = startUtc.getTime();
        const endMs = endUtc.getTime();

        // Filter overlaps
        const blocked = busyRanges.some((r) =>
          overlaps(startMs, endMs, r.startMs, r.endMs)
        );
        if (blocked) continue;

        slots.push({
          label: `${String(c.hh).padStart(2, "0")}:00`,
          start: startUtc.toISOString(),
          end: endUtc.toISOString(),
          blockMinutes,
        });
      }

      // Only include days that have opening segments (and potential slots)
      // (Optional: include empty days if you want calendar to show them)
      outputDays.push({
        date: day.ymd,
        slots,
      });
    }

    return json(200, {
      timezone: timeZone,
      leadTimeDays,
      blockMinutes,
      days: outputDays,
    });
  } catch (err) {
    return json(500, {
      error: err?.message || "Unknown error",
    });
  }
};
