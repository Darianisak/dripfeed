"use strict";

import {
  describe,
  test,
  jest,
  expect,
  beforeEach,
  afterEach,
} from "@jest/globals";
import {
  sanitisedSubPathArray,
  getSubPathType,
  routing,
  Subpath,
} from "../../../src/instagram/index.js";
import * as helpers from "../../../src/helpers/pathHelper.js";
import * as mutate from "../../../src/instagram/mutate.js";

let consoleSpy;

beforeEach(() => {
  consoleSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
});

afterEach(() => {
  consoleSpy.mockRestore();
});

describe(".sanitisedSubPathArray", () => {
  let pathnameSpy;

  afterEach(() => {
    if (pathnameSpy) {
      pathnameSpy.mockRestore();
    }
  });

  describe("when running locally", () => {
    test("removes sinatras routing", () => {
      pathnameSpy = jest
        .spyOn(helpers, "getPathnameFragments")
        .mockImplementation(() => ["instagram", "web", "homepage", "?hello"]);
      expect(sanitisedSubPathArray(true)).toEqual(["", "?hello"]);
    });
  });

  describe("when running remotely", () => {
    test("does not modify the path", () => {
      pathnameSpy = jest
        .spyOn(helpers, "getPathnameFragments")
        .mockImplementation(() => ["instagram", "web", "homepage", "?hello"]);
      expect(sanitisedSubPathArray(false)).toEqual([
        "instagram",
        "web",
        "homepage",
        "?hello",
      ]);
    });
  });
});

describe(".getSubPathType", () => {
  let pathnameSpy;

  afterEach(() => {
    if (pathnameSpy) {
      pathnameSpy.mockRestore();
    }
  });

  describe("with external callers", () => {
    test("ensures getPathnameFragments is called", () => {
      pathnameSpy = jest
        .spyOn(helpers, "getPathnameFragments")
        .mockImplementation(() => []);
      getSubPathType();
      expect(pathnameSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe("with valid subpaths", () => {
    describe("with the homepage", () => {
      beforeEach(() => {
        pathnameSpy = jest
          .spyOn(helpers, "getPathnameFragments")
          .mockImplementation(() => [""]);
      });

      test("returns HOME", () => {
        expect(getSubPathType()).toEqual(Subpath.HOME);
      });
    });
  });

  describe("with invalid subpaths", () => {
    describe("with an invalid route", () => {
      beforeEach(() => {
        pathnameSpy = jest
          .spyOn(helpers, "getPathnameFragments")
          .mockImplementation(() => ["reels", "unsupported"]);
      });

      test("returns UNSUPPORTED", () => {
        expect(getSubPathType()).toEqual(Subpath.UNSUPPORTED);
      });
    });
  });
});

describe(".routing", () => {
  let pathnameSpy;
  let mutatorSpy;

  afterEach(() => {
    [pathnameSpy, mutatorSpy].forEach((spy) => {
      if (spy) {
        spy.mockRestore();
      }
    });
  });

  describe("with a valid subpath", () => {
    beforeEach(() => {
      mutatorSpy = jest.spyOn(mutate, "operate").mockImplementation(() => {});
    });

    describe("with the homepage", () => {
      beforeEach(() => {
        pathnameSpy = jest
          .spyOn(helpers, "getPathnameFragments")
          .mockImplementation(() => [""]);

        routing();
      });

      test("calls .operate as expected", () => {
        expect(mutatorSpy).toHaveBeenCalledWith(mutate.Pages.HOME);
      });
    });

    describe("with an unsupported subpath", () => {
      // Unsuported, as opposed to invalid.
      beforeEach(() => {
        pathnameSpy = jest
          .spyOn(helpers, "getPathnameFragments")
          .mockImplementation(() => Subpath.UNSUPPORTED);
      });

      test("calls console.warn as expected", () => {
        routing();
        expect(consoleSpy).toHaveBeenCalledWith(
          `${document.location.pathname} is not yet supported`,
        );
      });

      test("returns 127", () => {
        expect(routing()).toEqual(127);
      });
    });
  });
});
