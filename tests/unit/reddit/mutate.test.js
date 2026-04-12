import {
  describe,
  test,
  jest,
  expect,
  afterEach,
  beforeEach,
} from "@jest/globals";
import * as removeNode from "../../../src/helpers/removeNode.js";
import * as mutate from "../../../src/reddit/mutate.js";

const normalizeDOMStrings = (str) => str.replace(/\s+/g, "").trim();

describe("_Targets", () => {
  describe("enumValues", () => {
    test("ensures 'LEFT_SIDEBAR' has the expected value", () => {
      expect(mutate.Targets.LEFT_SIDEBAR).toBe(0);
    });

    test("ensures 'RIGHT_SIDEBAR' has the expected value", () => {
      expect(mutate.Targets.RIGHT_SIDEBAR).toBe(1);
    });

    test("ensures 'MAIN_CONTENT' has the expected value", () => {
      expect(mutate.Targets.MAIN_CONTENT).toBe(2);
    });
  });
});

describe("_Pages", () => {
  describe("enumArrays", () => {
    test("ensures 'HOME' has the expected array", () => {
      expect(mutate.Pages.HOME).toEqual([mutate.Targets.MAIN_CONTENT]);
    });

    test("ensures 'POST' has the expected array", () => {
      expect(mutate.Pages.POST).toEqual([
        mutate.Targets.LEFT_SIDEBAR,
        mutate.Targets.RIGHT_SIDEBAR,
      ]);
    });

    test("ensures 'SUBREDDIT' has the expected array", () => {
      expect(mutate.Pages.SUBREDDIT).toEqual([
        mutate.Targets.LEFT_SIDEBAR,
        mutate.Targets.RIGHT_SIDEBAR,
      ]);
    });

    test("ensures 'USER' has the expected array", () => {
      expect(mutate.Pages.USER).toEqual([mutate.Targets.LEFT_SIDEBAR]);
    });

    test("ensures 'SEARCH' has the expected array", () => {
      expect(mutate.Pages.SEARCH).toEqual([
        mutate.Targets.LEFT_SIDEBAR,
        mutate.Targets.RIGHT_SIDEBAR,
      ]);
    });

    test("ensures 'POPULAR' has the expected array", () => {
      expect(mutate.Pages.POPULAR).toEqual([mutate.Targets.MAIN_CONTENT]);
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

    describe("#removeCallback", () => {
      test("ensures .mutate#operate raises a TypeError when not a function", () => {
        expect(() => mutate.operate([], "helloWorld")).toThrow(TypeError);
      });

      test("ensures .mutate#operate raises a TypeError with a specific message", () => {
        expect(() => mutate.operate([], "helloWorld")).toThrow(
          "operate received unexpected argument, 'string', expected 'function'",
        );
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

  describe("with an overridden removeCallback", () => {
    let removeProxySpy;
    let targets;

    afterEach(() => {
      removeProxySpy.mockRestore();
      targets = [];
    });

    describe("with single item target arrays", () => {
      test("ensures 'RIGHT_SIDEBAR' calls as expected", () => {
        removeProxySpy = jest.fn();
        targets = [mutate.Targets.RIGHT_SIDEBAR];
        mutate.operate(targets, removeProxySpy);
        expect(removeProxySpy).toHaveBeenCalledWith(
          "right-sidebar-contents",
          "right-rail-experience-root",
        );
      });

      test("ensures 'LEFT_SIDEBAR' calls as expected", () => {
        removeProxySpy = jest.fn();
        targets = [mutate.Targets.LEFT_SIDEBAR];
        mutate.operate(targets, removeProxySpy);
        expect(removeProxySpy).toHaveBeenCalledWith(
          "flex-left-nav-container",
          "flex-nav-buttons",
        );
      });

      test("ensures 'MAIN_CONTENT' calls as expected", () => {
        removeProxySpy = jest.fn();
        targets = [mutate.Targets.MAIN_CONTENT];
        mutate.operate(targets, removeProxySpy);
        expect(removeProxySpy).toHaveBeenCalledWith(
          "subgrid-container",
          "left-sidebar-container",
        );
      });
    });

    describe("with multi item target arrays", () => {
      test("ensures three items results in three calls", () => {
        removeProxySpy = jest.fn();
        targets = [
          mutate.Targets.MAIN_CONTENT,
          mutate.Targets.LEFT_SIDEBAR,
          mutate.Targets.MAIN_CONTENT,
        ];
        mutate.operate(targets, removeProxySpy);
        expect(removeProxySpy).toHaveBeenCalledTimes(3);
      });
    });
  });

  describe("with a default removeCallback", () => {
    let operateSpy;
    let nodeSpy;

    afterEach(() => {
      operateSpy.mockRestore();
      nodeSpy.mockRestore();
    });

    test("ensures .operate calls RemoveNode once", () => {
      operateSpy = jest.fn();

      const mockInstance = {
        operate: operateSpy,
      };

      nodeSpy = jest
        .spyOn(removeNode, "RemoveNode")
        .mockImplementation(() => mockInstance);

      mutate.operate([mutate.Targets.MAIN_CONTENT]);
      expect(operateSpy).toHaveBeenCalledTimes(1);
    });

    test("ensures .operate calls RemoveNode once", () => {
      operateSpy = jest.fn();

      const mockInstance = {
        operate: operateSpy,
      };

      nodeSpy = jest
        .spyOn(removeNode, "RemoveNode")
        .mockImplementation(() => mockInstance);

      mutate.operate([
        mutate.Targets.LEFT_SIDEBAR,
        mutate.Targets.RIGHT_SIDEBAR,
      ]);
      expect(operateSpy).toHaveBeenCalledTimes(2);
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

  describe("DOM manipulations", () => {
    let expectedDOM;
    let receivedDOM;

    beforeEach(() => {
      document.body.innerHTML =
        "<div>" +
        '  <div id="main-content">' +
        '    <div id="subgrid-container"></div>' +
        '    <div id="left-sidebar-container">' +
        '      <div id="flex-left-nav-container"></div>' +
        '      <div id="flex-nav-buttons"></div>' +
        "    </div>" +
        '    <div id="right-sidebar">' +
        '      <div id="right-sidebar-contents"></div>' +
        '      <div id="right-rail-experience-root"></div>' +
        "    </div>" +
        "  </div>" +
        "</div>";
    });

    afterEach(() => {
      document.getElementsByTagName("html")[0].innerHTML = "";
      expectedDOM = "";
    });

    describe("with singular removal targets", () => {
      test("ensures that LEFT_SIDEBAR removes as expected", () => {
        expectedDOM = normalizeDOMStrings(
          "<div>" +
            '  <div id="main-content">' +
            '    <div id="subgrid-container"></div>' +
            '    <div id="right-sidebar">' +
            '      <div id="right-sidebar-contents"></div>' +
            '      <div id="right-rail-experience-root"></div>' +
            "    </div>" +
            "  </div>" +
            "</div>",
        );

        mutate.operate([mutate.Targets.LEFT_SIDEBAR]);

        receivedDOM = normalizeDOMStrings(document.body.innerHTML);
        expect(receivedDOM).toEqual(expectedDOM);
      });

      test("ensures that RIGHT_SIDEBAR removes as expected", () => {
        expectedDOM = normalizeDOMStrings(
          "<div>" +
            '  <div id="main-content">' +
            '    <div id="subgrid-container"></div>' +
            '    <div id="left-sidebar-container">' +
            '      <div id="flex-left-nav-container"></div>' +
            '      <div id="flex-nav-buttons"></div>' +
            "    </div>" +
            "  </div>" +
            "</div>",
        );

        mutate.operate([mutate.Targets.RIGHT_SIDEBAR]);

        receivedDOM = normalizeDOMStrings(document.body.innerHTML);
        expect(receivedDOM).toEqual(expectedDOM);
      });

      test("ensures that MAIN_CONTENT removes as expected", () => {
        expectedDOM = normalizeDOMStrings("<div>" + "</div>");

        mutate.operate([mutate.Targets.MAIN_CONTENT]);

        receivedDOM = normalizeDOMStrings(document.body.innerHTML);
        expect(receivedDOM).toEqual(expectedDOM);
      });
    });

    describe("with multiple removal targets", () => {
      test("ensures the LEFT and RIGHT_SIDEBAR are removed", () => {
        expectedDOM = normalizeDOMStrings(
          "<div>" +
            '  <div id="main-content">' +
            '    <div id="subgrid-container"></div>' +
            "  </div>" +
            "</div>",
        );

        mutate.operate([
          mutate.Targets.LEFT_SIDEBAR,
          mutate.Targets.RIGHT_SIDEBAR,
        ]);

        receivedDOM = normalizeDOMStrings(document.body.innerHTML);
        expect(receivedDOM).toEqual(expectedDOM);
      });
    });
  });
});
