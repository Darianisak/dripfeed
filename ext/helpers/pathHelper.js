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

export { getPathname, getDomain };

window.getDomain = getDomain;
window.getPathname = getPathname;
