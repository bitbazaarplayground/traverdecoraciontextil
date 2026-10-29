// Primary service coverage only. Valencia projects are assessed case by case,
// so they are intentionally not represented as general structured-data coverage.
export const PRIMARY_SERVICE_AREA_SERVED = [
  { "@type": "City", name: "Almassora" },
  { "@type": "AdministrativeArea", name: "Provincia de Castellón" },
  { "@type": "City", name: "Castellón de la Plana" },
  { "@type": "City", name: "Benicàssim" },
];

export const CONTACT = {
  siteName: "Traver Decoración Textil",
  phoneLandline: "+34 964 562 357",
  phoneLandlineTel: "+34964562357",
  whatsappNumber: "34614952856",
  whatsappUrl: "https://wa.me/34614952856",
  email: "traveralmazora@gmail.com",
  address: {
    streetAddress: "Carrer de Sant Felip, 67",
    addressLocality: "Almassora",
    addressRegion: "Castellón",
    postalCode: "12550",
    addressCountry: "ES",
  },
  secondaryProjectArea: "Valencia",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:30",
      closes: "14:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "17:00",
      closes: "19:00",
    },
  ],
  facebookUrl: "https://www.facebook.com/traver.decoraciontextil",
  mapsUrl: "https://maps.app.goo.gl/nqxT2QX2NCbgYTDF9",
};
