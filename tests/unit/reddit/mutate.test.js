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

describe("_Pages", () => {
  describe("enum values", () => {
    test("ensures LEFT_SIDEBAR has the expected representation", () => {
      expect(mutate.Targets.LEFT_SIDEBAR).toEqual(0);
    });

    test("ensures RIGHT_SIDEBAR has the expected representation", () => {
      expect(mutate.Targets.RIGHT_SIDEBAR).toEqual(1);
    });

    test("ensures MAIN_CONTENT has the expected representation", () => {
      expect(mutate.Targets.MAIN_CONTENT).toEqual(2);
    });
  });
});

describe("_Targets", () => {
  describe("page target arrays", () => {
    test("ensures HOME has the expected target array", () => {
      expect(mutate.Pages.HOME).toEqual([mutate.Targets.MAIN_CONTENT]);
    });

    test("ensures POST has the expected target array", () => {
      expect(mutate.Pages.POST).toEqual([
        mutate.Targets.LEFT_SIDEBAR,
        mutate.Targets.RIGHT_SIDEBAR,
      ]);
    });

    test("ensures SUBREDDIT has the expected target array", () => {
      expect(mutate.Pages.SUBREDDIT).toEqual([
        mutate.Targets.LEFT_SIDEBAR,
        mutate.Targets.RIGHT_SIDEBAR,
      ]);
    });

    test("ensures USER has the expected target array", () => {
      expect(mutate.Pages.USER).toEqual([mutate.Targets.LEFT_SIDEBAR]);
    });

    test("ensures SEARCH has the expected target array", () => {
      expect(mutate.Pages.SEARCH).toEqual([
        mutate.Targets.LEFT_SIDEBAR,
        mutate.Targets.RIGHT_SIDEBAR,
      ]);
    });

    test("ensures POPULAR has the expected target array", () => {
      expect(mutate.Pages.POPULAR).toEqual([mutate.Targets.MAIN_CONTENT]);
    });
  });
});

describe(".operate", () => {
  describe("targetArray#validation", () => {
    test("ensures TypeError raised as expected", () => {
      expect(() => mutate.operate(document, "")).toThrow(TypeError);
    });

    test("ensures TypeError message raised as expected", () => {
      expect(() => mutate.operate(document, "")).toThrow(
        "operate expected pageTargets to be Array, was 'string'",
      );
    });

    test("ensures empty targetArray does not raise error", () => {
      expect(() => mutate.operate(document, [])).not.toThrow(TypeError);
    });
  });

  describe("with an invalid Target.ENUM", () => {
    test("ensures a TypeError is thrown", () => {
      expect(() => mutate.operate(document, ["HelloWorld"])).toThrow(TypeError);
    });

    test("ensures the correct error message is returned", () => {
      expect(() => mutate.operate(document, ["HelloWorld"])).toThrow(
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
        mutate.operate(document, targets, removeProxySpy);
        expect(removeProxySpy).toHaveBeenCalledWith(
          "right-sidebar-contents",
          "right-rail-experience-root",
        );
      });

      test("ensures 'LEFT_SIDEBAR' calls as expected", () => {
        removeProxySpy = jest.fn();
        targets = [mutate.Targets.LEFT_SIDEBAR];
        mutate.operate(document, targets, removeProxySpy);
        expect(removeProxySpy).toHaveBeenCalledWith(
          "flex-left-nav-container",
          "flex-nav-buttons",
        );
      });

      test("ensures 'MAIN_CONTENT' calls as expected", () => {
        removeProxySpy = jest.fn();
        targets = [mutate.Targets.MAIN_CONTENT];
        mutate.operate(document, targets, removeProxySpy);
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
        mutate.operate(document, targets, removeProxySpy);
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

      mutate.operate(document, [mutate.Targets.MAIN_CONTENT]);
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

      mutate.operate(document, [
        mutate.Targets.LEFT_SIDEBAR,
        mutate.Targets.RIGHT_SIDEBAR,
      ]);
      expect(operateSpy).toHaveBeenCalledTimes(2);
    });
  });
});

describe(".nodeRemovalProxy", () => {
  describe("type checks", () => {
    let operateSpy;
    let nodeSpy;

    beforeEach(() => {
      // We'll do this to ensure we limit the testing scope.
      operateSpy = jest.fn();

      const mockInstance = {
        operate: operateSpy,
      };

      nodeSpy = jest
        .spyOn(removeNode, "RemoveNode")
        .mockImplementation(() => mockInstance);
    });

    afterEach(() => {
      operateSpy.mockRestore();
      nodeSpy.mockRestore();
    });

    describe("with valid arguments", () => {
      test("ensures both args as Strings is fine", () => {
        expect(() => mutate.nodeRemovalProxy("hello", "world")).not.toThrow(
          TypeError,
        );
      });

      test("ensures both args as Elements is fine", () => {
        expect(() =>
          mutate.nodeRemovalProxy(
            document.createElement("div"),
            document.createElement("div"),
          ),
        ).not.toThrow(TypeError);
      });

      test("ensures a mix between Strings and Elements is fine", () => {
        expect(() =>
          mutate.nodeRemovalProxy(document.createElement("div"), "helloWorld"),
        ).not.toThrow(TypeError);
      });
    });

    describe("with invalid arguments", () => {
      test("ensures numeric values are invalid", () => {
        expect(() => mutate.nodeRemovalProxy(1, 1)).toThrow(TypeError);
      });

      test("ensures undefined values are invalid", () => {
        expect(() => mutate.nodeRemovalProxy(null, null)).toThrow(TypeError);
      });

      test("ensures undefined values are invalid", () => {
        expect(() => mutate.nodeRemovalProxy(null, null)).toThrow(
          "Unexpected type, 'object', encountered in nodeRemovalProxy.",
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

        mutate.operate(document, [mutate.Targets.LEFT_SIDEBAR]);

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

        mutate.operate(document, [mutate.Targets.RIGHT_SIDEBAR]);

        receivedDOM = normalizeDOMStrings(document.body.innerHTML);
        expect(receivedDOM).toEqual(expectedDOM);
      });

      test("ensures that MAIN_CONTENT removes as expected", () => {
        expectedDOM = normalizeDOMStrings("<div>" + "</div>");

        mutate.operate(document, [mutate.Targets.MAIN_CONTENT]);

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

        mutate.operate(document, [
          mutate.Targets.LEFT_SIDEBAR,
          mutate.Targets.RIGHT_SIDEBAR,
        ]);

        receivedDOM = normalizeDOMStrings(document.body.innerHTML);
        expect(receivedDOM).toEqual(expectedDOM);
      });
    });
  });
});
