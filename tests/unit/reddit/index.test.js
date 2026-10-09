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
  let typeSpy;
  let mutatorSpy;

  afterEach(() => {
    [typeSpy, mutatorSpy].forEach((spy) => {
      if (spy) {
        spy.mockRestore();
      }
    });
  });

  describe("typeValidations", () => {
    test("ensures .routing#getType raises a TypeError when not a function", () => {
      expect(() => routing("helloWorld")).toThrow(TypeError);
    });

    test("ensures .routing#getType raises a TypeError with a specific message", () => {
      expect(() => routing("helloWorld")).toThrow(
        "routing received unexpected argument, 'string', expected 'function'",
      );
    });
  });

  describe("with the default type callback", () => {
    test("ensures the default callback results in a mutator execution", () => {
      const pathnameSpy = jest
        .spyOn(helpers, "getPathnameFragments")
        .mockImplementation(() => []);
      mutatorSpy = jest.spyOn(mutate, "operate").mockImplementation(() => {});
      routing();
      expect(mutatorSpy).toHaveBeenCalledTimes(2);
      pathnameSpy.mockRestore();
    });
  });

  describe("with supported SubPathTypes", () => {
    test("ensures HOME subpath calls operate with expected args", () => {
      mutatorSpy = jest.spyOn(mutate, "operate").mockImplementation(() => {});
      typeSpy = jest.fn().mockReturnValue(Subpath.HOME);
      routing(typeSpy);
      expect(mutatorSpy).toHaveBeenCalledWith(mutate.Pages.HOME);
    });

    test("ensures SUBREDDIT subpath calls operate with expected args", () => {
      mutatorSpy = jest.spyOn(mutate, "operate").mockImplementation(() => {});
      typeSpy = jest.fn().mockReturnValue(Subpath.SUBREDDIT);
      routing(typeSpy);
      expect(mutatorSpy).toHaveBeenCalledWith(mutate.Pages.SUBREDDIT);
    });

    test("ensures POST subpath calls operate with expected args", () => {
      mutatorSpy = jest.spyOn(mutate, "operate").mockImplementation(() => {});
      typeSpy = jest.fn().mockReturnValue(Subpath.POST);
      routing(typeSpy);
      expect(mutatorSpy).toHaveBeenCalledWith(mutate.Pages.POST);
    });

    test("ensures USER subpath calls operate with expected args", () => {
      mutatorSpy = jest.spyOn(mutate, "operate").mockImplementation(() => {});
      typeSpy = jest.fn().mockReturnValue(Subpath.USER);
      routing(typeSpy);
      expect(mutatorSpy).toHaveBeenCalledWith(mutate.Pages.USER);
    });

    test("ensures SEARCH subpath calls operate with expected args", () => {
      mutatorSpy = jest.spyOn(mutate, "operate").mockImplementation(() => {});
      typeSpy = jest.fn().mockReturnValue(Subpath.SEARCH);
      routing(typeSpy);
      expect(mutatorSpy).toHaveBeenCalledWith(mutate.Pages.SEARCH);
    });

    test("ensures POPULAR subpath calls operate with expected args", () => {
      mutatorSpy = jest.spyOn(mutate, "operate").mockImplementation(() => {});
      typeSpy = jest.fn().mockReturnValue(Subpath.POPULAR);
      routing(typeSpy);
      expect(mutatorSpy).toHaveBeenCalledWith(mutate.Pages.POPULAR);
    });
  });

  describe("with unsupported SubPathTypes", () => {
    test("ensures unsupported pathnames return as expected", () => {
      typeSpy = jest
        .spyOn(helpers, "getPathnameFragments")
        .mockImplementation(() => Subpath.UNSUPPORTED);
      expect(routing(typeSpy)).toBe(127);
    });

    test("ensures unexpected SubPathTypes raise TypeError", () => {
      typeSpy = jest
        .spyOn(helpers, "getPathnameFragments")
        .mockImplementation(() => "helloWorld");
      expect(() => routing(typeSpy)).toThrow(TypeError);
    });

    test("ensures unexpected SubPathTypes raise correct error message", () => {
      typeSpy = jest
        .spyOn(helpers, "getPathnameFragments")
        .mockImplementation(() => "helloWorld");
      expect(() => routing(typeSpy)).toThrow(
        "Unexpected subpathType encountered, 'helloWorld'",
      );
    });
  });
});
