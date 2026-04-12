"use strict";

import * as removeNode from "../../../src/helpers/removeNode.js";
import * as mutate from "../../../src/instagram/mutate.js";

import {
  describe,
  test,
  jest,
  expect,
  afterEach,
  beforeEach,
} from "@jest/globals";

describe("_Targets", () => {
  describe("enumValues", () => {
    test("ensures 'DRAWER_REELS' has the expected value", () => {
      expect(mutate.Targets.DRAWER_REELS).toBe(0);
    });

    test("ensures 'DRAWER_EXPLORE' has the expected value", () => {
      expect(mutate.Targets.DRAWER_EXPLORE).toBe(1);
    });

    test("ensures 'PAGE_SUGGESTIONS' has the expected value", () => {
      expect(mutate.Targets.PAGE_SUGGESTIONS).toBe(2);
    });
  });
});

describe(".nodeRemovalProxy", () => {
  describe("typeValidations", () => {
    let removeSpy;
    let removeOperateSpy;

    beforeEach(() => {
      removeOperateSpy = jest.fn();

      const mockInstance = {
        operate: removeOperateSpy,
      };

      removeSpy = jest
        .spyOn(removeNode, "RemoveNode")
        .mockImplementation(() => mockInstance);
    });

    afterEach(() => {
      [removeSpy, removeOperateSpy].forEach((spy) => {
        if (spy) {
          spy.mockRestore();
        }
      });
      document.getElementsByTagName("html")[0].innerHTML = "";
    });

    describe("#targetOne", () => {
      test("ensures specific TypeError message raised", () => {
        expect(() => mutate.nodeRemovalProxy(100, "#valid-id")).toThrow(
          "nodeRemovalProxy received unexpected argument, 'number', expected 'string' or 'Element'",
        );
      });

      test("ensures TypeError raised given number input or element", () => {
        expect(() => mutate.nodeRemovalProxy(100, "#valid-id")).toThrow(
          TypeError,
        );
      });

      test("ensures TypeError raised given undefined input or element", () => {
        expect(() => mutate.nodeRemovalProxy(undefined, "#valid-id")).toThrow(
          TypeError,
        );
      });

      test("ensures string allows RemoveNode call", () => {
        mutate.nodeRemovalProxy("#valid-id", "#other-id");
        expect(removeSpy).toHaveBeenCalledWith("#valid-id", "#other-id");
      });

      test("ensures Element allows RemoveNode call", () => {
        const elementArgument = document.createElement("div");
        mutate.nodeRemovalProxy(elementArgument, "#other-id");
        expect(removeSpy).toHaveBeenCalledWith(elementArgument, "#other-id");
      });
    });

    describe("#targetTwo", () => {
      test("ensures specific TypeError message raised", () => {
        expect(() => mutate.nodeRemovalProxy("#valid-id", 100)).toThrow(
          "nodeRemovalProxy received unexpected argument, 'number', expected 'string' or 'Element'",
        );
      });

      test("ensures TypeError raised given number input or element", () => {
        expect(() => mutate.nodeRemovalProxy("#valid-id", 100)).toThrow(
          TypeError,
        );
      });

      test("ensures TypeError raised given undefined input or element", () => {
        expect(() => mutate.nodeRemovalProxy("#valid-id", undefined)).toThrow(
          TypeError,
        );
      });

      test("ensures string allows RemoveNode call", () => {
        mutate.nodeRemovalProxy("#other-id", "#valid-id");
        expect(removeSpy).toHaveBeenCalledWith("#other-id", "#valid-id");
      });

      test("ensures Element allows RemoveNode call", () => {
        const elementArgument = document.createElement("div");
        mutate.nodeRemovalProxy("#other-id", elementArgument);
        expect(removeSpy).toHaveBeenCalledWith("#other-id", elementArgument);
      });
    });

    describe("#targetOne && #targetTwo", () => {
      test("ensures both args as strings is valid", () => {
        mutate.nodeRemovalProxy("#id-1", "#id-2");
        expect(removeSpy).toHaveBeenCalledWith("#id-1", "#id-2");
      });

      test("ensures both args as Elements is valid", () => {
        const elementOne = document.createElement("div");
        const elementTwo = document.createElement("div");

        mutate.nodeRemovalProxy(elementOne, elementTwo);
        expect(removeSpy).toHaveBeenCalledWith(elementOne, elementTwo);
      });

      test("ensures both args as numbers raised TypeError", () => {
        expect(() => mutate.nodeRemovalProxy(1, 2)).toThrow(TypeError);
      });

      test("ensures both args undefined raises TypeError", () => {
        expect(() => mutate.nodeRemovalProxy(undefined, undefined)).toThrow(
          TypeError,
        );
      });
    });
  });
});
