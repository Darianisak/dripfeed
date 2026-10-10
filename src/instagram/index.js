"use strict";

import * as helpers from "../helpers/pathHelper.js";
import * as mutate from "./mutate.js";

const Subpath = {
  UNSUPPORTED: -1,
  HOME: 0,
};

function getSubPathType() {
  const subpathArray = helpers.getPathnameFragments();

  if (subpathArray[0] === "") {
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

export { routing, getSubPathType, Subpath };
