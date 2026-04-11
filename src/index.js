import { getDomain } from "./helpers/pathHelper.js";
import * as reddit from "./reddit/index.js";

function extensionRouting() {
  const currentDomain = getDomain();

  switch (currentDomain) {
    case "www.reddit.com":
      reddit.routing();
      break;

    default:
      console.warn(`'${currentDomain}' is not yet supported.`);
      return 127;
  }
}

// Handles initial page load
document.addEventListener("DOMContentLoaded", () => extensionRouting());

export { extensionRouting };
