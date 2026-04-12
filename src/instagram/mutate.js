"use strict";

import { RemoveNode } from "../helpers/removeNode.js";

export const Targets = {
};

export const Pages = {};

export function nodeRemovalProxy(targetOne, targetTwo) {
  [targetOne, targetTwo].forEach((element) => {
    if (typeof element === "string" || element instanceof Element) {
      return;
    }
    throw new TypeError(
      `nodeRemovalProxy received unexpected argument, '${typeof element}', expected 'string' or 'Element'`,
    );
  });

  new RemoveNode(targetOne, targetTwo).operate();
}

export function operate() {}
