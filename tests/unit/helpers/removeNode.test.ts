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
        test("sets .nodeTree", () => {
          expect(new RemoveNode(ancestor).nodeTree).toEqual(ancestor);
        });
      });

      describe("given strings", () => {
        test("sets .nodeTree", () => {
          expect(new RemoveNode(...selectors).nodeTree).toEqual(ancestor);
        });
      });

      describe("given id string", () => {
        test("sets .nodeSelector", () => {
          expect(new RemoveNode("hello-world").nodeSelector).toEqual(
            "hello-world",
          );
        });
      });
    });

    describe("when invalid", () => {
      const stringArgs = ["foo", "bar", "baz"];
      const numberArgs = [1, 2, 3];
      const ancestorObj = new Ancestors();

      describe("one arg", () => {
        describe("number", () => {
          test("raises SyntaxError", () => {
            expect(() => new RemoveNode(numberArgs[0])).toThrow(SyntaxError);
          });

          test("raises expected message", () => {
            expect(() => new RemoveNode(numberArgs[0])).toThrow(
              SyntaxError(
                "removeNode#constructor - Unexpected argument form: 1",
              ),
            );
          });
        });
      });

      describe("two args", () => {
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

        describe("second arg number", () => {
          test("raises SyntaxError", () => {
            expect(() => new RemoveNode(stringArgs[0], numberArgs[0])).toThrow(
              SyntaxError,
            );
          });

          test("raises expected message", () => {
            expect(() => new RemoveNode(stringArgs[0], numberArgs[0])).toThrow(
              SyntaxError(
                `removeNode#constructor - Unexpected argument form: foo,1`,
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
    const treeSpy = jest.fn();
    const nodeSpy = jest.fn();
    const spies = [treeSpy, nodeSpy];
    let removeNodeObj: RemoveNode;

    beforeEach(() => {
      [treeSpy, nodeSpy].forEach((spy) => {
        spy.mockRestore();
      });
    });

    describe("when nodeTree ", () => {
      beforeEach(() => {
        removeNodeObj = new RemoveNode(new Ancestors());
        removeNodeObj.operate(...spies);
      });

      test("calls tree()", () => {
        expect(treeSpy).toHaveBeenCalledTimes(1);
      });

      test("does not call node() ", () => {
        expect(nodeSpy).toHaveBeenCalledTimes(0);
      });
    });

    describe("when node", () => {
      beforeEach(() => {
        removeNodeObj = new RemoveNode("id-selector");
        removeNodeObj.operate(...spies);
      });

      test("calls node() ", () => {
        expect(nodeSpy).toHaveBeenCalledTimes(1);
      });

      test("does not call tree()", () => {
        expect(treeSpy).toHaveBeenCalledTimes(0);
      });
    });
  });

  describe("#operateNode", () => {
    let response: number;

    describe("when valid", () => {
      beforeEach(() => {
        buildTreeDOM();
        response = new RemoveNode("layer-2_index-1").operateNode();
      });

      afterEach(() => {
        document.getElementsByTagName("html")[0].innerHTML = "";
      });

      test("removes the element", () => {
        expect(document.getElementById("layer-2_index-1")).toBeNull();
      });

      test("returns 0", () => {
        expect(response).toBe(0);
      });
    });

    describe("when invalid", () => {
      let consoleSpy: SpiedFunction<(...data: Console[]) => void>;

      beforeEach(() => {
        consoleSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
      });

      afterEach(() => {
        consoleSpy.mockRestore();
      });

      describe("state", () => {
        beforeEach(() => {
          response = new RemoveNode("element-id", "element-id").operateNode();
        });

        test("messages as expected", () => {
          expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringMatching(
              "removeNode#operateNode called with invalid .nodeSelector",
            ),
          );
        });

        test("console called once", () => {
          expect(consoleSpy).toHaveBeenCalledTimes(1);
        });

        test("returns 1", () => {
          expect(response).toBe(1);
        });
      });

      describe("id", () => {
        beforeEach(() => {
          response = new RemoveNode("an-invalid-id").operateNode();
        });

        afterEach(() => {
          document.getElementsByTagName("html")[0].innerHTML = "";
        });

        test("messages as expected", () => {
          expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringMatching(
              "removeNode#operateNode called but Element was not found",
            ),
          );
        });

        test("console called once", () => {
          expect(consoleSpy).toHaveBeenCalledTimes(1);
        });

        test("returns 2", () => {
          expect(response).toBe(2);
        });
      });
    });
  });

  describe("#operateTree", () => {
    describe("when valid", () => {
      const selectorOne = "layer-2_index-1";
      const selectorTwo = "layer-2_index-2";
      const ancestor = "layer-1_index-0";
      let response: number;

      beforeEach(() => {
        buildTreeDOM();
        response = new RemoveNode(selectorOne, selectorTwo).operateTree();
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
          response = new RemoveNode(new Ancestors()).operateTree();
        });

        test("console called once", () => {
          expect(consoleSpy).toHaveBeenCalledTimes(1);
        });

        test("messages as expected", () => {
          expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringMatching(
              "removeNode#operateTree called with invalid .Ancestors",
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
          ).operateTree();
        });

        test("console warns", () => {
          expect(consoleSpy).toHaveBeenCalledTimes(1);
        });

        test("messages as expected", () => {
          expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringMatching("removeNode#operateTree no ancestors found"),
          );
        });

        test("returns 2", () => {
          expect(response).toBe(2);
        });
      });
    });
  });
});
