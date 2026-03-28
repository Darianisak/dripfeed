import { getDomain } from "./helpers/pathHelper.js";

function extensionRouting(document) {
  const currentDomain = getDomain(document);

  switch (currentDomain) {
    default:
      console.warn(`'${currentDomain}' is not yet supported.`);
      return 127;
  }
}

document.addEventListener("DOMContentLoaded", () => extensionRouting(document));

export { extensionRouting };
