import { RemoveNode } from "../helpers/removeNode.js";

export const Targets = {
  LEFT_SIDEBAR: 0,
  RIGHT_SIDEBAR: 1,
  MAIN_CONTENT: 2,
  SIGN_UP_BANNER: 3,
  MOBILE_APP_NON_BLOCKING_CTA: 4,
  MOBILE_APP_FULL_PAGE_CTA: 5,
  MOBILE_APP_HALF_PAGE_CTA: 6,
  MOBILE_SCROLL_BLOCKING: 7,
};

export const Pages = {
  HOME: [Targets.MAIN_CONTENT],
  POST: [Targets.LEFT_SIDEBAR, Targets.SIGN_UP_BANNER, Targets.RIGHT_SIDEBAR],
  SUBREDDIT: [
    Targets.LEFT_SIDEBAR,
    Targets.SIGN_UP_BANNER,
    Targets.RIGHT_SIDEBAR,
  ],
  USER: [Targets.LEFT_SIDEBAR, Targets.SIGN_UP_BANNER],
  SEARCH: [Targets.LEFT_SIDEBAR, Targets.SIGN_UP_BANNER, Targets.RIGHT_SIDEBAR],
  POPULAR: [Targets.MAIN_CONTENT],
  ALL: [
    Targets.MOBILE_APP_NON_BLOCKING_CTA,
    Targets.MOBILE_APP_FULL_PAGE_CTA,
    Targets.MOBILE_APP_HALF_PAGE_CTA,
    Targets.MOBILE_SCROLL_BLOCKING,
  ],
};

export function nodeRemovalProxy(...args) {
  [...args].forEach((element) => {
    if (typeof element === "string" || element instanceof Element) {
      return;
    }
    throw new TypeError(
      `nodeRemovalProxy received unexpected argument, '${typeof element}', expected 'string' or 'Element'`,
    );
  });

  new RemoveNode(...args).operate();
}

export function operate(pageTargets, removeCallback = nodeRemovalProxy) {
  if (!(pageTargets instanceof Array)) {
    throw new TypeError(
      `operate expected pageTargets to be Array, was '${typeof pageTargets}'`,
    );
  }

  if (typeof removeCallback !== "function") {
    throw new TypeError(
      `operate received unexpected argument, '${typeof removeCallback}', expected 'function'`,
    );
  }

  pageTargets.forEach((target) => {
    switch (target) {
      case Targets.LEFT_SIDEBAR:
        removeCallback("flex-left-nav-container", "flex-nav-buttons");
        break;

      case Targets.SIGN_UP_BANNER:
        removeCallback("left-sidebar-container");
        break;

      case Targets.RIGHT_SIDEBAR:
        removeCallback("right-sidebar-contents", "right-rail-experience-root");
        break;

      case Targets.MAIN_CONTENT:
        removeCallback("subgrid-container", "left-sidebar-container");
        break;

      case Targets.MOBILE_APP_NON_BLOCKING_CTA:
        removeCallback("xpromo-bottom-sheet");
        break;

      case Targets.MOBILE_APP_FULL_PAGE_CTA:
        removeCallback(
          "configured-xpromo-mweb3x_feeds_blocking_xpromo_lo_fullscreen",
        );
        break;

      case Targets.MOBILE_APP_HALF_PAGE_CTA:
        removeCallback("configured-xpromo-mweb3x_mid_funnel_blocking_v1_30s");
        break;

      case Targets.MOBILE_SCROLL_BLOCKING:
        document.body.classList.remove("rpl-scroll-lock");
        document.body.style.overflow = null;
        break;

      default:
        throw new TypeError(`Unexpected target, '${target}', received.`);
    }
  });
}
