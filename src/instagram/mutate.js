"use strict";

import { removeNodeCaller } from "../helpers/removeNodeCaller.js";

export const Targets = {
  DRAWER_REELS: 0,
  FEED_VIDEOS: 1
};

export const Pages = {
  HOME: [Targets.DRAWER_REELS, Targets.FEED_VIDEOS],
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
        removeNodeCaller("a[href='/reels/']");
        break;

      case Targets.FEED_VIDEOS:
        // TODO: We'll add an early exit from classList
        document.querySelectorAll("article[data-interactable='|click|']").forEach(
          (article) => {
            article.querySelector("div[aria-label='Video player']")
          }
        )
        document.querySelectorAll("article").forEach((article) => {  ? article.remove() : '' })

        break;

      default:
        throw new TypeError(`Unexpected target, '${target}', received.`);
    }
  });
}
