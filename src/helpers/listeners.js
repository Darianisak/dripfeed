"use strict";

import * as domain from "./domainRouting.js";

export function initialMutations() {
  document.addEventListener("DOMContentLoaded", () =>
    domain.extensionRouting(),
  );
}
