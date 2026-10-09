import * as helpers from "../helpers/pathHelper.js";

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

function routing(getType = getSubPathType) {
  if (typeof getType !== "function") {
    throw new TypeError(
      `routing received unexpected argument, '${typeof getType}', expected 'function'`,
    );
  }
}

export { routing, getSubPathType, Subpath };
