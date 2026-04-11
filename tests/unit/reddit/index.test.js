"use strict";

import { describe, test, jest, expect, afterEach } from "@jest/globals";
import { getSubPathType, routing, Subpath } from "../../../src/reddit/index.js";
import * as helpers from "../../../src/helpers/pathHelper.js";
import * as mutate from "../../../src/reddit/mutate.js";

describe(".getSubPathType", () => {
  let pathnameSpy;

  afterEach(() => {
    if (pathnameSpy) {
      pathnameSpy.mockRestore();
    }
  });

  describe("typeValidations", () => {
    test("ensures .routing#getSubPathType raises a TypeError when not a function", () => {
      expect(() => getSubPathType("helloWorld")).toThrow(TypeError);
    });

    test("ensures .routing#getSubPathType raises a TypeError with a specific message", () => {
      expect(() => getSubPathType("helloWorld")).toThrow(
        "getSubPathType received unexpected argument, 'string', expected 'function'",
      );
    });
  });

  describe("with the default fragments callback", () => {
    test("ensures the default pathname matches", () => {
      pathnameSpy = jest
        .spyOn(helpers, "getPathnameFragments")
        .mockImplementation(() => []);
      expect(getSubPathType()).toEqual(Subpath.HOME);
    });
  });

  describe("with a homepage relevant pathname", () => {
    test("ensures the default pathname matches", () => {
      pathnameSpy = jest.fn().mockReturnValue([]);
      expect(getSubPathType(pathnameSpy)).toEqual(Subpath.HOME);
    });

    test("ensures queryStrings on the default match", () => {
      pathnameSpy = jest.fn().mockReturnValue(["?search='hello'"]);
      expect(getSubPathType(pathnameSpy)).toEqual(Subpath.HOME);
    });
  });

  describe("with a popular relevant pathname", () => {
    test("ensures the default pathname matches", () => {
      pathnameSpy = jest.fn().mockReturnValue(["r", "popular"]);
      expect(getSubPathType(pathnameSpy)).toEqual(Subpath.POPULAR);
    });

    test("ensures a pathname without an 'r' prefix won't match", () => {
      pathnameSpy = jest.fn().mockReturnValue(["b", "popular"]);
      expect(getSubPathType(pathnameSpy)).toEqual(Subpath.UNSUPPORTED);
    });

    test("ensures that queryStrings still match", () => {
      pathnameSpy = jest
        .fn()
        .mockReturnValue(["r", "popular", "?search=hello"]);
      expect(getSubPathType(pathnameSpy)).toEqual(Subpath.POPULAR);
    });

    test("ensures 'popular' at an unexpected index will match default subreddit", () => {
      pathnameSpy = jest.fn().mockReturnValue(["r", "subreddit", "popular"]);
      expect(getSubPathType(pathnameSpy)).toEqual(Subpath.SUBREDDIT);
    });
  });

  describe("with a subreddit relevant pathname", () => {
    test("ensures the default pathname matches", () => {
      pathnameSpy = jest.fn().mockReturnValue(["r", "subreddit"]);
      expect(getSubPathType(pathnameSpy)).toEqual(Subpath.SUBREDDIT);
    });

    test("ensures a pathname without an 'r' prefix won't match", () => {
      pathnameSpy = jest.fn().mockReturnValue(["b", "subreddit"]);
      expect(getSubPathType(pathnameSpy)).toEqual(Subpath.UNSUPPORTED);
    });

    test("ensures that queryStrings still match", () => {
      pathnameSpy = jest
        .fn()
        .mockReturnValue(["r", "subreddit", "?search=hello"]);
      expect(getSubPathType(pathnameSpy)).toEqual(Subpath.SUBREDDIT);
    });
  });

  describe("with a search relevant pathname", () => {
    test("ensures the default pathname matches", () => {
      pathnameSpy = jest.fn().mockReturnValue(["search"]);
      expect(getSubPathType(pathnameSpy)).toEqual(Subpath.SEARCH);
    });

    test("ensures a pathname without a 'search' prefix won't match", () => {
      pathnameSpy = jest.fn().mockReturnValue(["queries", "CoolPerson"]);
      expect(getSubPathType(pathnameSpy)).toEqual(Subpath.UNSUPPORTED);
    });

    test("ensures that queryStrings still match", () => {
      pathnameSpy = jest.fn().mockReturnValue(["search", "?q='hello'"]);
      expect(getSubPathType(pathnameSpy)).toEqual(Subpath.SEARCH);
    });
  });

  describe("with a user relevant pathname", () => {
    test("ensures the default pathname matches", () => {
      pathnameSpy = jest.fn().mockReturnValue(["user", "CoolPerson"]);
      expect(getSubPathType(pathnameSpy)).toEqual(Subpath.USER);
    });

    test("ensures a pathname without a 'user' prefix won't match", () => {
      pathnameSpy = jest.fn().mockReturnValue(["users", "CoolPerson"]);
      expect(getSubPathType(pathnameSpy)).toEqual(Subpath.UNSUPPORTED);
    });

    test("ensures that queryStrings still match", () => {
      pathnameSpy = jest
        .fn()
        .mockReturnValue(["user", "CoolPerson", "?test=hello"]);
      expect(getSubPathType(pathnameSpy)).toEqual(Subpath.USER);
    });
  });

  describe("with a post relevant pathname", () => {
    test("ensures the default pathname matches", () => {
      pathnameSpy = jest
        .fn()
        .mockReturnValue([
          "r",
          "subreddit",
          "comments",
          "1s5elrr",
          "hello-world",
        ]);
      expect(getSubPathType(pathnameSpy)).toEqual(Subpath.POST);
    });

    test("ensures that queryStrings still match", () => {
      pathnameSpy = jest
        .fn()
        .mockReturnValue([
          "r",
          "subreddit",
          "comments",
          "1s5elrr",
          "hello-world",
          "?helloWorld=true",
        ]);
      expect(getSubPathType(pathnameSpy)).toEqual(Subpath.POST);
    });

    test("ensures a pathname without a 'r' prefix won't match", () => {
      pathnameSpy = jest
        .fn()
        .mockReturnValue([
          "b",
          "subreddit",
          "comments",
          "1s5elrr",
          "hello-world",
          "?helloWorld=true",
        ]);
      expect(getSubPathType(pathnameSpy)).toEqual(Subpath.UNSUPPORTED);
    });

    test("ensures a pathname without 'comments' prefix won't match", () => {
      pathnameSpy = jest
        .fn()
        .mockReturnValue([
          "r",
          "subreddit",
          "comment-thread",
          "1s5elrr",
          "hello-world",
          "?helloWorld=true",
        ]);
      // Eh, questionable if this is the behaviour we want.
      expect(getSubPathType(pathnameSpy)).toEqual(Subpath.SUBREDDIT);
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
      expect(mutatorSpy).toHaveBeenCalledTimes(1);
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
      typeSpy = jest.fn().mockReturnValue(Subpath.UNSUPPORTED);
      const consoleSpy = jest
        .spyOn(console, "warn")
        .mockImplementation(() => {});
      expect(routing(typeSpy)).toBe(127);
      consoleSpy.mockRestore();
    });

    test("ensures unexpected SubPathTypes raise TypeError", () => {
      const typeSpy = jest.fn().mockReturnValue("helloWorld");
      expect(() => routing(typeSpy)).toThrow(TypeError);
    });

    test("ensures unexpected SubPathTypes raise correct error message", () => {
      const typeSpy = jest.fn().mockReturnValue("helloWorld");
      expect(() => routing(typeSpy)).toThrow(
        "Unexpected subpathType encountered, 'helloWorld'",
      );
    });
  });
});
