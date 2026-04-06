import { RemoveNode } from "../helpers/removeNode.js";

export const Targets = {
  LEFT_SIDEBAR: 0,
  RIGHT_SIDEBAR: 1,
  MAIN_CONTENT: 2,
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

export function operate(
  document,
  targetArray,
  removeCallback = nodeRemovalProxy,
) {
  if (!(targetArray instanceof Array)) {
    throw new TypeError(
      `operate expected targetArray to be Array, was '${typeof targetArray}'`,
    );
  }

  targetArray.forEach((target) => {
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

export function home(document, mutationFunc = operate) {
  const targets = [Targets.MAIN_CONTENT];

  mutationFunc(document, targets);
}

export function post(document, mutationFunc = operate) {
  const targets = [Targets.LEFT_SIDEBAR, Targets.RIGHT_SIDEBAR];

  mutationFunc(document, targets);
}

export function subreddit(document, mutationFunc = operate) {
  const targets = [Targets.LEFT_SIDEBAR, Targets.RIGHT_SIDEBAR];

  mutationFunc(document, targets);
}

export function user(document, mutationFunc = operate) {
  const targets = [Targets.LEFT_SIDEBAR];

  mutationFunc(document, targets);
}

export function search(document, mutationFunc = operate) {
  const targets = [Targets.LEFT_SIDEBAR, Targets.RIGHT_SIDEBAR];

  mutationFunc(document, targets);
}

export function popular(document, mutationFunc = operate) {
  const targets = [Targets.MAIN_CONTENT];

  mutationFunc(document, targets);
}
