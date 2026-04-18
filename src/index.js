"use strict";

import * as domain from "./helpers/domainRouting.js";

// Handles initial page load
document.addEventListener("DOMContentLoaded", () => domain.extensionRouting());
