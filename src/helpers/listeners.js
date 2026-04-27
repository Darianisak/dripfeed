"use strict";

import * as domain from "./domainRouting.js";

export function initialMutations() {
  document.addEventListener("DOMContentLoaded", () =>
    domain.extensionRouting(),
  );
}

export function responsiveMutations() {
  const mutationObserver = () => {
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.addedNodes.length) {
          domain.extensionRouting();
          break;
        }
      }
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
  };

  document.addEventListener("DOMContentLoaded", () => {
    mutationObserver();
  });
}
