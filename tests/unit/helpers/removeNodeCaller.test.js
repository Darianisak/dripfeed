import { removeNodeCaller } from "../../../src/helpers/removeNodeCaller.js";
import * as removeNode from "../../../src/helpers/removeNode.js";
import {
  describe,
  test,
  expect,
  jest,
  afterEach,
  beforeEach,
} from "@jest/globals";

describe(".removeNodeCaller", () => {
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
        expect(() => removeNodeCaller(100, "#valid-id")).toThrow(
          "removeNodeCaller received unexpected argument, 'number', expected 'string' or 'Element'",
        );
      });

      test("ensures TypeError raised given number input or element", () => {
        expect(() => removeNodeCaller(100, "#valid-id")).toThrow(TypeError);
      });

      test("ensures TypeError raised given undefined input or element", () => {
        expect(() => removeNodeCaller(undefined, "#valid-id")).toThrow(
          TypeError,
        );
      });

      test("ensures string allows RemoveNode call", () => {
        removeNodeCaller("#valid-id", "#other-id");

        expect(removeSpy).toHaveBeenCalledWith("#valid-id", "#other-id");
      });

      test("ensures Element allows RemoveNode call", () => {
        const elementArgument = document.createElement("div");

        removeNodeCaller(elementArgument, "#other-id");

        expect(removeSpy).toHaveBeenCalledWith(elementArgument, "#other-id");
      });
    });

    describe("#targetTwo", () => {
      test("ensures specific TypeError message raised", () => {
        expect(() => removeNodeCaller("#valid-id", 100)).toThrow(
          "removeNodeCaller received unexpected argument, 'number', expected 'string' or 'Element'",
        );
      });

      test("ensures TypeError raised given number input or element", () => {
        expect(() => removeNodeCaller("#valid-id", 100)).toThrow(TypeError);
      });

      test("ensures TypeError raised given undefined input or element", () => {
        expect(() => removeNodeCaller("#valid-id", undefined)).toThrow(
          TypeError,
        );
      });

      test("ensures string allows RemoveNode call", () => {
        removeNodeCaller("#other-id", "#valid-id");

        expect(removeSpy).toHaveBeenCalledWith("#other-id", "#valid-id");
      });

      test("ensures Element allows RemoveNode call", () => {
        const elementArgument = document.createElement("div");

        removeNodeCaller("#other-id", elementArgument);

        expect(removeSpy).toHaveBeenCalledWith("#other-id", elementArgument);
      });
    });

    describe("#targetOne && #targetTwo", () => {
      test("ensures both args as strings is valid", () => {
        removeNodeCaller("#id-1", "#id-2");

        expect(removeSpy).toHaveBeenCalledWith("#id-1", "#id-2");
      });

      test("ensures both args as Elements is valid", () => {
        const elementOne = document.createElement("div");

        const elementTwo = document.createElement("div");

        removeNodeCaller(elementOne, elementTwo);

        expect(removeSpy).toHaveBeenCalledWith(elementOne, elementTwo);
      });

      test("ensures both args as numbers raised TypeError", () => {
        expect(() => removeNodeCaller(1, 2)).toThrow(TypeError);
      });

      test("ensures both args undefined raises TypeError", () => {
        expect(() => removeNodeCaller(undefined, undefined)).toThrow(TypeError);
      });
    });
  });
});
