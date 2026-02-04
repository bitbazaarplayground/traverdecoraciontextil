import { Helmet } from "react-helmet-async";

export default function NoIndex({ title = "Admin", children }) {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      {children}
    </>
  );
}
