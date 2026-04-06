// Wrapper function for return a URL's `domain` portion.
// This function must be passed an HTMLDocument object.
//
function getDomain(document) {
  if (!(document instanceof HTMLDocument)) {
    throw new TypeError(
      `getDomain expected argument of type HTMLDocument. Found ${typeof document}`,
    );
  }

  return document.location.hostname;
}

// Wrapper function for return a URL's `pathname` portion.
// This function must be passed an HTMLDocument object.
//
function getPathname(document) {
  if (!(document instanceof HTMLDocument)) {
    throw new TypeError(
      `getPathname expected argument of type HTMLDocument. Found ${typeof document}`,
    );
  }

  return document.location.pathname;
}

// Wrapper function for returning a URL's pathname as a `/` delimitted
// String array. This let's us determine which subpage we're on, though the
// index to check to determine that will be condtional on the domain.
//
function getPathnameFragments(document, pathname = getPathname) {
  if (!(document instanceof HTMLDocument)) {
    throw new TypeError(
      `getPathnameFragments expected argument of type HTMLDocument. Found ${typeof document}`,
    );
  } else if (typeof pathname !== "function") {
    throw new TypeError(
      `getPathnameFragments expected argument of type function. Found ${typeof pathname}`,
    );
  }

  const path = pathname(document);

  return path.includes("/")
    ? path.split("/").filter((fragment) => fragment !== "")
    : [];
}

export { getPathname, getDomain, getPathnameFragments };
