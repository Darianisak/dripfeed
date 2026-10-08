import { removeNodeCaller } from "../helpers/removeNodeCaller.js";

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

export function operate(pageTargets) {
  if (!(pageTargets instanceof Array)) {
    throw new TypeError(
      `operate expected pageTargets to be Array, was '${typeof pageTargets}'`,
    );
  }

  pageTargets.forEach((target) => {
    switch (target) {
      case Targets.LEFT_SIDEBAR:
        removeNodeCaller("flex-left-nav-container", "flex-nav-buttons");
        break;

      case Targets.SIGN_UP_BANNER:
        removeNodeCaller("left-sidebar-container");
        break;

      case Targets.RIGHT_SIDEBAR:
        removeNodeCaller(
          "right-sidebar-contents",
          "right-rail-experience-root",
        );
        break;

      case Targets.MAIN_CONTENT:
        removeNodeCaller("subgrid-container", "left-sidebar-container");
        break;

      case Targets.MOBILE_APP_NON_BLOCKING_CTA:
        removeNodeCaller("xpromo-bottom-sheet");
        break;

      case Targets.MOBILE_APP_FULL_PAGE_CTA:
        removeNodeCaller(
          "configured-xpromo-mweb3x_feeds_blocking_xpromo_lo_fullscreen",
        );
        break;

      case Targets.MOBILE_APP_HALF_PAGE_CTA:
        removeNodeCaller("configured-xpromo-mweb3x_mid_funnel_blocking_v1_30s");
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
