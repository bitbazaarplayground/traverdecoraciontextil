export const FRAMEWORK_STYLES_ELEMENT_ID = "framework-styled-components";

export function getFrameworkStylesHydrationText() {
  if (typeof document === "undefined") return "";

  return (
    document.getElementById(FRAMEWORK_STYLES_ELEMENT_ID)?.textContent || ""
  );
}
