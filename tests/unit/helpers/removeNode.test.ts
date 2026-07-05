"use strict";

import {
  describe,
  test,
  expect,
  jest,
  afterEach,
  beforeEach,
} from "@jest/globals";
import { RemoveNode } from "../../../src/helpers/removeNode.js";
import { Ancestors } from "../../../src/helpers/ancestors.js";
import { buildTreeDOM } from "../factory.html.ts";
import { SpiedFunction } from "jest-mock";

describe("removeNode", () => {
  describe("#constructor", () => {
    describe("when valid", () => {
      const selectors = ["layer-1_index-0", "layer-1_index-1"];
      let ancestor: Ancestors;

      beforeEach(() => {
        buildTreeDOM();
        ancestor = new Ancestors(...selectors);
      });

      afterEach(() => {
        document.getElementsByTagName("html")[0].innerHTML = "";
      });

      describe("given Ancestors", () => {
        test("sets .nodeTree as expected", () => {
          expect(new RemoveNode(ancestor).nodeTree).toEqual(ancestor);
        });
      });

      describe("given strings", () => {
        test("sets .nodeTree as expected", () => {
          expect(new RemoveNode(...selectors).nodeTree).toEqual(ancestor);
        });
      });
    });

    describe("when invalid", () => {
      const stringArgs = ["foo", "bar", "baz"];
      const ancestorObj = new Ancestors();

      describe("given string", () => {
        test("raises SyntaxError", () => {
          expect(() => new RemoveNode(stringArgs[0])).toThrow(SyntaxError);
        });

        test("raises expected message", () => {
          expect(() => new RemoveNode(stringArgs[0])).toThrow(
            SyntaxError(
              "removeNode#constructor - Unexpected argument form: foo",
            ),
          );
        });
      });

      describe("given two args", () => {
        describe("first arg ancestor", () => {
          test("raises SyntaxError", () => {
            expect(() => new RemoveNode(ancestorObj, stringArgs[0])).toThrow(
              SyntaxError,
            );
          });

          test("raises expected message", () => {
            expect(() => new RemoveNode(ancestorObj, stringArgs[0])).toThrow(
              SyntaxError(
                `removeNode#constructor - Unexpected argument form: ${[ancestorObj, stringArgs[0]]}`,
              ),
            );
          });
        });

        describe("second arg ancestor", () => {
          test("raises SyntaxError", () => {
            expect(() => new RemoveNode(stringArgs[0], ancestorObj)).toThrow(
              SyntaxError,
            );
          });

          test("raises expected message", () => {
            expect(() => new RemoveNode(stringArgs[0], ancestorObj)).toThrow(
              SyntaxError(
                `removeNode#constructor - Unexpected argument form: foo,[object Object]`,
              ),
            );
          });
        });
      });

      describe("with an unexpected number of args", () => {
        test("given 0, raises SyntaxError", () => {
          expect(() => new RemoveNode()).toThrow(SyntaxError);
        });

        test("given 3, raises SyntaxError", () => {
          expect(() => new RemoveNode(...stringArgs)).toThrow(SyntaxError);
        });
      });
    });
  });

  describe("#operate", () => {
    describe("when valid", () => {
      const selectorOne = "layer-2_index-1";
      const selectorTwo = "layer-2_index-2";
      const ancestor = "layer-1_index-0";
      let response: number;

      beforeEach(() => {
        buildTreeDOM();
        response = new RemoveNode(selectorOne, selectorTwo).operate();
      });

      afterEach(() => {
        document.getElementsByTagName("html")[0].innerHTML = "";
      });

      describe("removes elements", () => {
        test("selectorOne removed", () => {
          expect(document.querySelector(selectorOne)).toBeNull();
        });

        test("selectorTwo removed", () => {
          expect(document.querySelector(selectorTwo)).toBeNull();
        });

        test("ancestor removed", () => {
          expect(document.querySelector(ancestor)).toBeNull();
        });
      });

      test("returns 0", () => {
        expect(response).toBe(0);
      });
    });

    describe("when invalid", () => {
      let consoleSpy: SpiedFunction<(...data: Console[]) => void>;
      let response: number;

      beforeEach(() => {
        consoleSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
      });

      afterEach(() => {
        consoleSpy.mockRestore();
      });

      describe("with an invalid nodeTree", () => {
        beforeEach(() => {
          response = new RemoveNode(new Ancestors()).operate();
        });

        test("console called once", () => {
          expect(consoleSpy).toHaveBeenCalledTimes(1);
        });

        test("messages as expected", () => {
          expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringMatching(
              "removeNode#operate called with invalid .Ancestors",
            ),
          );
        });

        test("returns 1", () => {
          expect(response).toBe(1);
        });
      });

      describe("with no ancestors", () => {
        beforeEach(() => {
          response = new RemoveNode(
            new Ancestors(
              document.createElement("div"),
              document.createElement("div"),
            ),
          ).operate();
        });

        test("console warns", () => {
          expect(consoleSpy).toHaveBeenCalledTimes(1);
        });

        test("messages as expected", () => {
          expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringMatching("removeNode#operate no ancestors found"),
          );
        });

        test("returns 2", () => {
          expect(response).toBe(2);
        });
      });
    });
  });
});
