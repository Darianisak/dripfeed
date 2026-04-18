"use strict";

import { getDomain } from "./pathHelper.js";
import * as reddit from "../reddit/index.js";

export function extensionRouting() {
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
