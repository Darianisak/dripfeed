import { RemoveNode } from "../helpers/removeNode.js";

export const Targets = {
  LEFT_SIDEBAR: 0,
  RIGHT_SIDEBAR: 1,
  MAIN_CONTENT: 2,
  LEFT_SIGNUP: 3,
};

export const Pages = {
  HOME: [Targets.MAIN_CONTENT],
  POST: [Targets.LEFT_SIDEBAR, Targets.RIGHT_SIDEBAR, Targets.LEFT_SIGNUP],
  SUBREDDIT: [Targets.LEFT_SIDEBAR, Targets.RIGHT_SIDEBAR, Targets.LEFT_SIGNUP],
  USER: [Targets.LEFT_SIDEBAR, Targets.LEFT_SIGNUP],
  SEARCH: [Targets.LEFT_SIDEBAR, Targets.RIGHT_SIDEBAR, Targets.LEFT_SIGNUP],
  POPULAR: [Targets.MAIN_CONTENT],
};

export function nodeRemovalProxy(targetOne, targetTwo) {
  [targetOne, targetTwo].forEach((element) => {
    if (typeof element === "string" || element instanceof Element) {
      return;
    }
    throw new TypeError(
      `nodeRemovalProxy received unexpected argument, '${typeof element}', expected 'string' or 'Element'`,
    );
  });

  try {
    new RemoveNode(targetOne, targetTwo).operate();
  } catch (TypeError) {
    console.warn(TypeError);
  }
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

      case Targets.LEFT_SIGNUP:
        removeCallback("left-sidebar-container", "left-sidebar-container");
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
