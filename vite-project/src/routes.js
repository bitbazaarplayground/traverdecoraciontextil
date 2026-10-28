import { index, route } from "@react-router/dev/routes";

/**
 * The existing BrowserRouter route tree remains in App during this proof of
 * concept. The Framework wildcard supplies its router context without adding
 * a second BrowserRouter, so the migration can be reviewed and rolled back
 * independently from the eventual route-module conversion.
 */
export default [
  index("./routes/legacy-app.jsx", { id: "routes/legacy-home" }),
  route("*", "./routes/legacy-app.jsx"),
];
