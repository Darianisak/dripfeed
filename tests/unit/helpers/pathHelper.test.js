"use strict";

import { describe, test, jest, expect, afterEach } from "@jest/globals";
import {
  getDomain,
  getPathname,
  getPathnameFragments,
} from "../../../src/helpers/pathHelper.js";

describe(".getPathname", () => {
  describe("argument validation", () => {
    test("ensures that invalid args raise TypeError", () => {
      expect(() => getPathname("helloWorld")).toThrow(TypeError);
    });

    test("ensures that invalid args raise TypeError message", () => {
      expect(() => getPathname("helloWorld")).toThrow(
        "getPathname expected argument of type HTMLDocument. Found string",
      );
    });
  });

  describe("return data", () => {
    test("ensures that hostname is pathname is returned", () => {
      expect(getPathname(document)).toEqual("/");
    });
  });
});

describe(".getDomain", () => {
  describe("argument validation", () => {
    test("ensures that invalid args raise TypeError", () => {
      expect(() => getDomain("helloWorld")).toThrow(TypeError);
    });

    test("ensures that invalid args raise TypeError message", () => {
      expect(() => getDomain("helloWorld")).toThrow(
        "getDomain expected argument of type HTMLDocument. Found string",
      );
    });
  });

  describe("return data", () => {
    test("ensures that domain is returned", () => {
      expect(getDomain(document)).toEqual("localhost");
    });
  });
});

describe(".getPathnameFragments", () => {
  describe("argument validation", () => {
    test("ensures that invalid document args raise TypeError", () => {
      expect(() => getPathnameFragments("helloWorld")).toThrow(TypeError);
    });

    test("ensures that invalid document args raise TypeError message", () => {
      expect(() => getPathnameFragments("helloWorld")).toThrow(
        "getPathnameFragments expected argument of type HTMLDocument. Found string",
      );
    });

    test("ensures that invalid pathname callback args raise TypeError", () => {
      expect(() => getPathnameFragments(document, "helloWorld")).toThrow(
        TypeError,
      );
    });

    test("ensures that invalid pathname args raise TypeError message", () => {
      expect(() => getPathnameFragments(document, "helloWorld")).toThrow(
        "getPathnameFragments expected argument of type function. Found string",
      );
    });
  });

  describe("return data", () => {
    let getPathnameMock;
    let pathString;

    afterEach(() => {
      if (getPathnameMock) {
        getPathnameMock.mockRestore();
      }
    });

    describe("when pathname uses the default callback", () => {
      test("ensures a default pathname returns an empty array", () => {
        // Default jest pathname is "/"
        expect(getPathnameFragments(document)).toEqual([]);
      });
    });

    describe("when the pathname contains only slashes", () => {
      test("ensures a pathname of a single slash returns an empty array", () => {
        pathString = "/";
        getPathnameMock = jest.fn().mockReturnValue(pathString);
        expect(getPathnameFragments(document, getPathnameMock)).toEqual([]);
      });

      test("ensures a pathname with a leading and trailing slash returns an empty array", () => {
        pathString = "//";
        getPathnameMock = jest.fn().mockReturnValue(pathString);
        expect(getPathnameFragments(document, getPathnameMock)).toEqual([]);
      });

      test("ensures an internal slash still returns an empty array", () => {
        pathString = "///";
        getPathnameMock = jest.fn().mockReturnValue(pathString);
        expect(getPathnameFragments(document, getPathnameMock)).toEqual([]);
      });
    });

    describe("when the pathname contains no slashes", () => {
      test("ensures a pathname with no slashes returns an empty array", () => {
        pathString = "helloWorld";
        getPathnameMock = jest.fn().mockReturnValue(pathString);
        expect(getPathnameFragments(document, getPathnameMock)).toEqual([]);
      });

      test("ensures an empty pathname returns an empty array", () => {
        pathString = "";
        getPathnameMock = jest.fn().mockReturnValue(pathString);
        expect(getPathnameFragments(document, getPathnameMock)).toEqual([]);
      });
    });

    describe("when a single word is bounded with slashes", () => {
      test("ensures a pathname with a trailing slash returns one element", () => {
        pathString = "helloWorld/";
        getPathnameMock = jest.fn().mockReturnValue(pathString);
        expect(getPathnameFragments(document, getPathnameMock)).toEqual([
          "helloWorld",
        ]);
      });

      test("ensures a pathname with a leading slash returns one element", () => {
        pathString = "/helloWorld";
        getPathnameMock = jest.fn().mockReturnValue(pathString);
        expect(getPathnameFragments(document, getPathnameMock)).toEqual([
          "helloWorld",
        ]);
      });

      test("ensures a pathname with a leading and trailing slash returns one element", () => {
        pathString = "/helloWorld/";
        getPathnameMock = jest.fn().mockReturnValue(pathString);
        expect(getPathnameFragments(document, getPathnameMock)).toEqual([
          "helloWorld",
        ]);
      });
    });

    describe("when there's a number of words and slashes", () => {
      test("ensures three slashes returns two elements", () => {
        pathString = "/r/subredditName/";
        getPathnameMock = jest.fn().mockReturnValue(pathString);
        expect(getPathnameFragments(document, getPathnameMock)).toEqual([
          "r",
          "subredditName",
        ]);
      });

      test("ensures redundant internal slashes are removed", () => {
        pathString = "/a/really//long/path//name/";
        getPathnameMock = jest.fn().mockReturnValue(pathString);
        expect(getPathnameFragments(document, getPathnameMock)).toEqual([
          "a",
          "really",
          "long",
          "path",
          "name",
        ]);
      });
    });
  });
});
