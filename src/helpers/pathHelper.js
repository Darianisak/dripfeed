// Wrapper function for return a URL's `domain` portion.
//
function getDomain() {
  return document.location.hostname;
}

// Wrapper function for return a URL's `pathname` portion.
//
function getPathname() {
  return document.location.pathname;
}

// Wrapper function for returning a URL's pathname as a `/` delimitted
// String array. This let's us determine which subpage we're on, though the
// index to check to determine that will be condtional on the domain.
//
function getPathnameFragments(pathname = getPathname) {
  if (typeof pathname !== "function") {
    throw new TypeError(
      `getPathnameFragments expected argument of type function. Found ${typeof pathname}`,
    );
  }

  const path = pathname();

  return path.includes("/")
    ? path.split("/").filter((fragment) => fragment !== "")
    : [];
}

export { getPathname, getDomain, getPathnameFragments };
