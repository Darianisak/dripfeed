"use strict";

import {
  describe,
  test,
  jest,
  expect,
  beforeEach,
  afterEach,
} from "@jest/globals";
import { getSubPathType, routing, Subpath } from "../../../src/reddit/index.js";
import * as helpers from "../../../src/helpers/pathHelper.js";
import * as mutate from "../../../src/reddit/mutate.js";

let consoleSpy;

beforeEach(() => {
  consoleSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
});

afterEach(() => {
  consoleSpy.mockRestore();
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

  describe("with a homepage relevant pathname", () => {
    test("ensures the default pathname matches", () => {
      pathnameSpy = jest
        .spyOn(helpers, "getPathnameFragments")
        .mockImplementation(() => []);
      expect(getSubPathType()).toEqual(Subpath.HOME);
    });

    test("ensures queryStrings on the default match", () => {
      pathnameSpy = jest.fn().mockReturnValue(["?search='hello'"]);
      expect(getSubPathType()).toEqual(Subpath.HOME);
    });
  });

  describe("with a popular relevant pathname", () => {
    test("ensures the default pathname matches", () => {
      pathnameSpy = jest
        .spyOn(helpers, "getPathnameFragments")
        .mockImplementation(() => ["r", "popular"]);
      expect(getSubPathType()).toEqual(Subpath.POPULAR);
    });

    test("ensures a pathname without an 'r' prefix won't match", () => {
      pathnameSpy = jest
        .spyOn(helpers, "getPathnameFragments")
        .mockImplementation(() => ["b", "popular"]);
      expect(getSubPathType()).toEqual(Subpath.UNSUPPORTED);
    });

    test("ensures that queryStrings still match", () => {
      pathnameSpy = jest
        .spyOn(helpers, "getPathnameFragments")
        .mockImplementation(() => ["r", "popular", "?search=hello"]);
      expect(getSubPathType()).toEqual(Subpath.POPULAR);
    });

    test("ensures 'popular' at an unexpected index will match default subreddit", () => {
      pathnameSpy = jest
        .spyOn(helpers, "getPathnameFragments")
        .mockImplementation(() => ["r", "subreddit", "popular"]);
      expect(getSubPathType()).toEqual(Subpath.SUBREDDIT);
    });
  });

  describe("with a subreddit relevant pathname", () => {
    test("ensures the default pathname matches", () => {
      pathnameSpy = jest
        .spyOn(helpers, "getPathnameFragments")
        .mockImplementation(() => ["r", "subreddit"]);
      expect(getSubPathType()).toEqual(Subpath.SUBREDDIT);
    });

    test("ensures a pathname without an 'r' prefix won't match", () => {
      pathnameSpy = jest
        .spyOn(helpers, "getPathnameFragments")
        .mockImplementation(() => ["b", "subreddit"]);
      expect(getSubPathType()).toEqual(Subpath.UNSUPPORTED);
    });

    test("ensures that queryStrings still match", () => {
      pathnameSpy = jest
        .spyOn(helpers, "getPathnameFragments")
        .mockImplementation(() => ["r", "subreddit", "?search=hello"]);
      expect(getSubPathType()).toEqual(Subpath.SUBREDDIT);
    });
  });

  describe("with a search relevant pathname", () => {
    test("ensures the default pathname matches", () => {
      pathnameSpy = jest
        .spyOn(helpers, "getPathnameFragments")
        .mockImplementation(() => ["search"]);
      expect(getSubPathType()).toEqual(Subpath.SEARCH);
    });

    test("ensures a pathname without a 'search' prefix won't match", () => {
      pathnameSpy = jest
        .spyOn(helpers, "getPathnameFragments")
        .mockImplementation(() => ["queries", "CoolPerson"]);
      expect(getSubPathType()).toEqual(Subpath.UNSUPPORTED);
    });

    test("ensures that queryStrings still match", () => {
      pathnameSpy = jest
        .spyOn(helpers, "getPathnameFragments")
        .mockImplementation(() => ["search", "?q='hello'"]);
      expect(getSubPathType()).toEqual(Subpath.SEARCH);
    });
  });

  describe("with a user relevant pathname", () => {
    test("ensures the default pathname matches", () => {
      pathnameSpy = jest
        .spyOn(helpers, "getPathnameFragments")
        .mockImplementation(() => ["user", "CoolPerson"]);
      expect(getSubPathType()).toEqual(Subpath.USER);
    });

    test("ensures a pathname without a 'user' prefix won't match", () => {
      pathnameSpy = jest
        .spyOn(helpers, "getPathnameFragments")
        .mockImplementation(() => ["users", "CoolPerson"]);
      expect(getSubPathType()).toEqual(Subpath.UNSUPPORTED);
    });

    test("ensures that queryStrings still match", () => {
      pathnameSpy = jest
        .spyOn(helpers, "getPathnameFragments")
        .mockImplementation(() => ["user", "CoolPerson", "?test=hello"]);
      expect(getSubPathType()).toEqual(Subpath.USER);
    });
  });

  describe("with a post relevant pathname", () => {
    test("ensures the default pathname matches", () => {
      pathnameSpy = jest
        .spyOn(helpers, "getPathnameFragments")
        .mockImplementation(() => [
          "r",
          "subreddit",
          "comments",
          "1s5elrr",
          "hello-world",
        ]);
      expect(getSubPathType()).toEqual(Subpath.POST);
    });

    test("ensures that queryStrings still match", () => {
      pathnameSpy = jest
        .spyOn(helpers, "getPathnameFragments")
        .mockImplementation(() => [
          "r",
          "subreddit",
          "comments",
          "1s5elrr",
          "hello-world",
          "?helloWorld=true",
        ]);
      expect(getSubPathType()).toEqual(Subpath.POST);
    });

    test("ensures a pathname without a 'r' prefix won't match", () => {
      pathnameSpy = jest
        .spyOn(helpers, "getPathnameFragments")
        .mockImplementation(() => [
          "b",
          "subreddit",
          "comments",
          "1s5elrr",
          "hello-world",
          "?helloWorld=true",
        ]);
      expect(getSubPathType()).toEqual(Subpath.UNSUPPORTED);
    });

    test("ensures a pathname without 'comments' prefix won't match", () => {
      pathnameSpy = jest
        .spyOn(helpers, "getPathnameFragments")
        .mockImplementation(() => [
          "r",
          "subreddit",
          "comment-thread",
          "1s5elrr",
          "hello-world",
          "?helloWorld=true",
        ]);
      // Eh, questionable if this is the behaviour we want.
      expect(getSubPathType()).toEqual(Subpath.SUBREDDIT);
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

      test("returns HOME", () => {
        expect(mutatorSpy).toHaveBeenCalledWith(mutate.Pages.HOME);
      });
    });

    describe("with a subreddit", () => {
      beforeEach(() => {
        pathnameSpy = jest
          .spyOn(helpers, "getPathnameFragments")
          .mockImplementation(() => ["r", "subreddit"]);
        routing();
      });

      test("returns SUBREDDIT", () => {
        expect(mutatorSpy).toHaveBeenCalledWith(mutate.Pages.SUBREDDIT);
      });
    });

    describe("with a post", () => {
      beforeEach(() => {
        pathnameSpy = jest
          .spyOn(helpers, "getPathnameFragments")
          .mockImplementation(() => ["r", "subreddit", "comments"]);
        routing();
      });

      test("returns POST", () => {
        expect(mutatorSpy).toHaveBeenCalledWith(mutate.Pages.POST);
      });
    });

    describe("with a user profile", () => {
      beforeEach(() => {
        pathnameSpy = jest
          .spyOn(helpers, "getPathnameFragments")
          .mockImplementation(() => ["user"]);
        routing();
      });

      test("returns USER", () => {
        expect(mutatorSpy).toHaveBeenCalledWith(mutate.Pages.USER);
      });
    });

    describe("with a search request", () => {
      beforeEach(() => {
        pathnameSpy = jest
          .spyOn(helpers, "getPathnameFragments")
          .mockImplementation(() => ["search"]);
        routing();
      });

      test("returns SEARCH", () => {
        expect(mutatorSpy).toHaveBeenCalledWith(mutate.Pages.SEARCH);
      });
    });

    describe("with r/popular", () => {
      beforeEach(() => {
        pathnameSpy = jest
          .spyOn(helpers, "getPathnameFragments")
          .mockImplementation(() => ["r", "popular"]);
        routing();
      });

      test("returns POPULAR", () => {
        expect(mutatorSpy).toHaveBeenCalledWith(mutate.Pages.POPULAR);
      });
    });
  });

  describe("with an unsupported subpath", () => {
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

    test("ensures unsupported pathnames return as expected", () => {
      expect(routing()).toBe(127);
    });
  });
});
