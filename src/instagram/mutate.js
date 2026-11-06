"use strict";

import { removeNodeCaller } from "../helpers/removeNodeCaller.js";

export const Targets = {
  DRAWER_REELS: 0,
  FEED_VIDEOS: 1
};

export const Pages = {
  HOME: [Targets.DRAWER_REELS, Targets.FEED_VIDEOS],
};

function removeVideos() {
  const feedArticles = Array.from(document.querySelectorAll("article[data-interactable='|click|']"));
  // TODO - I think this works but is currently hiding everything BUT videos.
  let videoNode = feedArticles.find((article) => 
    article.querySelector("div[aria-label='Video player']") !== null
  )

  if (videoNode) {
    // videoNode.remove();
    videoNode.classList.add("hidden")
    videoNode.hidden = true;
    console.log(`hid video`)
  }
}

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
        removeVideos();
        break;

      default:
        throw new TypeError(`Unexpected target, '${target}', received.`);
    }
  });
}
