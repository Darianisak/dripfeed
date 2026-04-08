"use strict";

import { getPathnameFragments } from "../helpers/pathHelper.js";
import * as mutate from "./mutate.js";

const Subpath = {
  UNSUPPORTED: -1,
  HOME: 0,
  POST: 1,
  SUBREDDIT: 2,
  USER: 3,
  SEARCH: 4,
  POPULAR: 5,
};

function getSubPathType(document, pathname = getPathnameFragments) {
  const subpathArray = pathname(document);

  if (subpathArray[0] === "r") {
    if (subpathArray[1] == "popular") {
      // r/popular is a fever dream that really needs extra clearing.
      return Subpath.POPULAR;
    }

    return subpathArray.includes("comments") ? Subpath.POST : Subpath.SUBREDDIT;
  } else if (subpathArray[0] === "user") {
    return Subpath.USER;
  } else if (subpathArray[0] === "search") {
    return Subpath.SEARCH;
  } else if (subpathArray.length <= 1) {
    return Subpath.HOME;
  } else {
    return Subpath.UNSUPPORTED;
  }
}

function routing(document, getType = getSubPathType) {
  const subpathType = getType(document);

  switch (subpathType) {
    case Subpath.HOME:
      mutate.operate(mutate.Pages.HOME);
      break;

    case Subpath.SUBREDDIT:
      mutate.operate(mutate.Pages.SUBREDDIT);
      break;

    case Subpath.POST:
      mutate.operate(mutate.Pages.POST);
      break;

    case Subpath.USER:
      mutate.operate(mutate.Pages.USER);
      break;

    case Subpath.SEARCH:
      mutate.operate(mutate.Pages.SEARCH);
      break;

    case Subpath.POPULAR:
      mutate.operate(mutate.Pages.POPULAR);
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
