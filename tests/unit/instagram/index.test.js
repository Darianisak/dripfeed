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
  getSubPathType,
  routing,
  Subpath,
} from "../../../src/instagram/index.js";
import * as helpers from "../../../src/helpers/pathHelper.js";

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
          .mockImplementation(() => ["hello"]);
      });

      test("returns UNSUPPORTED", () => {
        expect(getSubPathType()).toEqual(Subpath.UNSUPPORTED);
      });
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
    describe("#getType", () => {
      describe("with a string argument", () => {
        test("raises TypeError", () => {
          expect(() => routing("helloWorld")).toThrow(TypeError);
        });

        test("raises with message", () => {
          expect(() => routing("helloWorld")).toThrow(
            "routing received unexpected argument, 'string', expected 'function'",
          );
        });
      });

      describe("with the default argument", () => {
        test("does not raise TypeError", () => {
          expect(() => routing()).not.toThrow(TypeError);
        });
      });
    });
  });
});
