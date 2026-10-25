"use strict";

import { removeNodeCaller } from "../helpers/removeNodeCaller.js";

export const Targets = {
  DRAWER_REELS: 0,
};

export const Pages = {
  HOME: [Targets.DRAWER_REELS],
};

export function operate(pageTargets) {
  if (!(pageTargets instanceof Array)) {
    throw new TypeError(
      `operate expected pageTargets to be Array, was '${typeof pageTargets}'`,
    );
  }

  pageTargets.forEach((target) => {
    switch (target) {
      case Targets.DRAWER_REELS:
        console.log(`calling removal`);
        removeNodeCaller("a[href='/reels/']");
        break;

      default:
        throw new TypeError(`Unexpected target, '${target}', received.`);
    }
  });
}
