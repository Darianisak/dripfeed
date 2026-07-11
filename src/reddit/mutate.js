import { RemoveNode } from "../helpers/removeNode.js";

export const Targets = {
  LEFT_SIDEBAR: 0,
  RIGHT_SIDEBAR: 1,
  MAIN_CONTENT: 2,
  SIGN_UP_BANNER: 3,
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

      default:
        throw new TypeError(`Unexpected target, '${target}', received.`);
    }
  });
}
