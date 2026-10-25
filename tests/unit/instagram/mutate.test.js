"use strict";

import * as mutate from "../../../src/instagram/mutate.js";
import * as helpers from "../../../src/helpers/removeNodeCaller.js";

import {
  jest,
  describe,
  beforeEach,
  afterEach,
  test,
  expect,
} from "@jest/globals";

describe("_Targets", () => {
  describe("enumValues", () => {
    test("ensures 'DRAWER_REELS' has the expected value", () => {
      expect(mutate.Targets.DRAWER_REELS).toBe(0);
    });
  });
});

describe("_Pages", () => {
  describe("enumArrays", () => {
    test("ensures 'HOME' has the expected array", () => {
      expect(mutate.Pages.HOME).toEqual([mutate.Targets.DRAWER_REELS]);
    });
  });
});

describe(".operate", () => {
  describe("typeValidations", () => {
    describe("#targetArray", () => {
      test("ensures TypeError raised as expected", () => {
        expect(() => mutate.operate("")).toThrow(TypeError);
      });

      test("ensures TypeError message raised as expected", () => {
        expect(() => mutate.operate("")).toThrow(
          "operate expected pageTargets to be Array, was 'string'",
        );
      });

      test("ensures empty targetArray does not raise error", () => {
        expect(() => mutate.operate([])).not.toThrow(TypeError);
      });
    });
  });

  describe("with an invalid Target.ENUM", () => {
    test("ensures a TypeError is thrown", () => {
      expect(() => mutate.operate(["HelloWorld"])).toThrow(TypeError);
    });

    test("ensures the correct error message is returned", () => {
      expect(() => mutate.operate(["HelloWorld"])).toThrow(
        "Unexpected target, 'HelloWorld', received.",
      );
    });
  });

  describe("with a valid Target.ENUM", () => {
    let nodeCallerSpy;

    beforeEach(() => {
      nodeCallerSpy = jest
        .spyOn(helpers, "removeNodeCaller")
        .mockImplementation(() => {});
    });

    afterEach(() => {
      nodeCallerSpy.mockRestore();
    });

    describe("ensures removeNodeCaller is called for", () => {
      test("DRAWER_REELS", () => {
        mutate.operate([mutate.Targets.DRAWER_REELS]);
        expect(nodeCallerSpy).toHaveBeenCalledTimes(1);
      });
    });
  });
});
