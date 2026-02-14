var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// netlify/functions/availability.js
var availability_exports = {};
__export(availability_exports, {
  handler: () => handler
});
module.exports = __toCommonJS(availability_exports);
function json(statusCode, bodyObj) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    },
    body: JSON.stringify(bodyObj, null, 2)
  };
}
function parseGmtOffsetToMinutes(tzName) {
  if (!tzName || tzName === "GMT" || tzName === "UTC") return 0;
  const m = tzName.match(/^GMT([+-])(\d{1,2})(?::?(\d{2}))?$/);
  if (!m) return 0;
  const sign = m[1] === "-" ? -1 : 1;
  const hours = Number(m[2] || 0);
  const mins = Number(m[3] || 0);
  return sign * (hours * 60 + mins);
}
function getOffsetMinutesForZone(dateUtc, timeZone) {
  const dtf = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    timeZoneName: "shortOffset",
    // Node 18 supports this
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });
  const parts = dtf.formatToParts(dateUtc);
  const tzPart = parts.find((p) => p.type === "timeZoneName")?.value;
  return parseGmtOffsetToMinutes(tzPart);
}
function zonedLocalToUtcDate({ y, m, d, hh, mm }, timeZone) {
  const pretendUtc = new Date(Date.UTC(y, m - 1, d, hh, mm, 0, 0));
  const offsetMin = getOffsetMinutesForZone(pretendUtc, timeZone);
  return new Date(pretendUtc.getTime() - offsetMin * 6e4);
}
function formatYMDInZone(dateUtc, timeZone) {
  const dtf = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });
  return dtf.format(dateUtc);
}
function weekdayInZone(dateUtc, timeZone) {
  const dtf = new Intl.DateTimeFormat("en-GB", { timeZone, weekday: "short" });
  const w = dtf.format(dateUtc).toLowerCase();
  const map = { mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6, sun: 7 };
  const key = w.slice(0, 3);
  return map[key] || 7;
}
function overlaps(aStartMs, aEndMs, bStartMs, bEndMs) {
  return aStartMs < bEndMs && aEndMs > bStartMs;
}
function getOpeningSegments(weekday) {
  if (weekday >= 1 && weekday <= 5) {
    return [
      { startHour: 9, endHour: 13 },
      { startHour: 16, endHour: 20 }
    ];
  }
  if (weekday === 6) return [{ startHour: 10, endHour: 14 }];
  return [];
}
function generateCandidateStartsForDay({ y, m, d }, timeZone, blockMinutes) {
  const weekday = weekdayInZone(
    new Date(Date.UTC(y, m - 1, d, 12, 0, 0)),
    timeZone
  );
  const segments = getOpeningSegments(weekday);
  const candidates = [];
  for (const seg of segments) {
    const { startHour, endHour } = seg;
    const latestStart = endHour - blockMinutes / 60;
    for (let hh = startHour; hh <= latestStart; hh += 1) {
      candidates.push({ hh, mm: 0 });
    }
  }
  return candidates;
}
async function supabaseGet({ url, serviceKey, path }) {
  const res = await fetch(`${url}/rest/v1/${path}`, {
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      "Content-Type": "application/json"
    }
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`Supabase GET failed: ${res.status} ${text}`);
  }
  return text ? JSON.parse(text) : [];
}
async function handler(event) {
  try {
    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!SUPABASE_URL || !SERVICE_KEY) {
      return json(500, {
        error: "Missing SUPABASE_URL or SERVICE_KEY env vars"
      });
    }
    const timeZone = "Europe/Madrid";
    const blockMinutes = 120;
    const leadTimeDays = 2;
    const daysRaw = event.queryStringParameters?.days;
    const days = Math.max(1, Math.min(30, Number(daysRaw || 14)));
    const nowUtc = /* @__PURE__ */ new Date();
    const todayYMD = formatYMDInZone(nowUtc, timeZone);
    const [ty, tm, td] = todayYMD.split("-").map(Number);
    const earliestLocalNoonUtc = zonedLocalToUtcDate(
      { y: ty, m: tm, d: td, hh: 12, mm: 0 },
      timeZone
    );
    const earliestDate = new Date(
      earliestLocalNoonUtc.getTime() + leadTimeDays * 24 * 60 * 6e4
    );
    const dayList = [];
    for (let i = 0; i < days; i++) {
      const dUtc = new Date(earliestDate.getTime() + i * 24 * 60 * 6e4);
      const ymd = formatYMDInZone(dUtc, timeZone);
      const [y, m, d] = ymd.split("-").map(Number);
      dayList.push({ y, m, d, ymd });
    }
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
    const bookings = await supabaseGet({
      url: SUPABASE_URL,
      serviceKey: SERVICE_KEY,
      path: `bookings?select=id,start_time,end_time,status&status=eq.reserved&start_time=lt.${encodeURIComponent(rangeEndUtc.toISOString())}&end_time=gt.${encodeURIComponent(rangeStartUtc.toISOString())}`
    });
    const blackouts = await supabaseGet({
      url: SUPABASE_URL,
      serviceKey: SERVICE_KEY,
      path: `blackouts?select=id,start_time,end_time,reason&start_time=lt.${encodeURIComponent(rangeEndUtc.toISOString())}&end_time=gt.${encodeURIComponent(rangeStartUtc.toISOString())}`
    });
    const busyRanges = [
      ...bookings.filter((b) => b.start_time && b.end_time).map((b) => ({
        kind: "booking",
        startMs: new Date(b.start_time).getTime(),
        endMs: new Date(b.end_time).getTime()
      })),
      ...blackouts.filter((b) => b.start_time && b.end_time).map((b) => ({
        kind: "blackout",
        startMs: new Date(b.start_time).getTime(),
        endMs: new Date(b.end_time).getTime()
      }))
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
        const endUtc = new Date(startUtc.getTime() + blockMinutes * 6e4);
        const startMs = startUtc.getTime();
        const endMs = endUtc.getTime();
        const blocked = busyRanges.some(
          (r) => overlaps(startMs, endMs, r.startMs, r.endMs)
        );
        if (blocked) continue;
        slots.push({
          label: `${String(c.hh).padStart(2, "0")}:00`,
          start: startUtc.toISOString(),
          end: endUtc.toISOString(),
          blockMinutes
        });
      }
      outputDays.push({
        date: day.ymd,
        slots
      });
    }
    return json(200, {
      timezone: timeZone,
      leadTimeDays,
      blockMinutes,
      days: outputDays
    });
  } catch (err) {
    return json(500, {
      error: err?.message || "Unknown error"
    });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
//# sourceMappingURL=availability.js.map
