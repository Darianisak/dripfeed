import { RemoveNode } from "../helpers/removeNode.js";

export const Targets = {
  LEFT_SIDEBAR: 0,
  RIGHT_SIDEBAR: 1,
  MAIN_CONTENT: 2,
};

export const Pages = {
  HOME: [Targets.MAIN_CONTENT],
  POST: [Targets.LEFT_SIDEBAR, Targets.RIGHT_SIDEBAR],
  SUBREDDIT: [Targets.LEFT_SIDEBAR, Targets.RIGHT_SIDEBAR],
  USER: [Targets.LEFT_SIDEBAR],
  SEARCH: [Targets.LEFT_SIDEBAR, Targets.RIGHT_SIDEBAR],
  POPULAR: [Targets.MAIN_CONTENT],
};

export function nodeRemovalProxy(targetOne, targetTwo) {
  [targetOne, targetTwo].forEach((element) => {
    if (typeof element === "string" || element instanceof Element) {
      return;
    }
    throw new TypeError(
      `Unexpected type, '${typeof element}', encountered in nodeRemovalProxy.`,
    );
  });

  new RemoveNode(targetOne, targetTwo).operate();
}

export function operate(pageTargets, removeCallback = nodeRemovalProxy) {
  if (!(pageTargets instanceof Array)) {
    throw new TypeError(
      `operate expected pageTargets to be Array, was '${typeof pageTargets}'`,
    );
  }

  pageTargets.forEach((target) => {
    switch (target) {
      case Targets.LEFT_SIDEBAR:
        removeCallback("flex-left-nav-container", "flex-nav-buttons");
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
