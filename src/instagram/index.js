"use strict";

import * as helpers from "../helpers/pathHelper.js";
import * as mutate from "./mutate.js";

const Subpath = {
  UNSUPPORTED: -1,
  HOME: 0,
};

function sanitisedSubPathArray(
  runningLocally = Boolean(document.location.port),
) {
  let subpath = helpers.getPathnameFragments();

  if (runningLocally) {
    // Takes something like ["instagram", "web", "homepage", "query1", "query2", "..."]
    // And returns ["", "query1", "query2", "..."]
    subpath = [""].concat(subpath.slice(3));
  }
  return subpath;
}

function getSubPathType() {
  const subpathArray = sanitisedSubPathArray();

  if (subpathArray.length <= 1) {
    return Subpath.HOME;
  } else {
    return Subpath.UNSUPPORTED;
  }
}

function routing() {
  const subpathType = getSubPathType();

  switch (subpathType) {
    case Subpath.HOME:
      mutate.operate(mutate.Pages.HOME);
      break;

    case Subpath.UNSUPPORTED:
      console.warn(`${document.location.pathname} is not yet supported`);
      return 127;

    default:
      throw new TypeError(
        `Unexpected subpathType encountered, '${subpathType}'`,
      );
  }
}

export { sanitisedSubPathArray, routing, getSubPathType, Subpath };
window.Routing = routing;
