import {
  describe,
  test,
  jest,
  expect,
  afterEach,
  beforeEach,
} from "@jest/globals";
import * as mutate from "../../../src/reddit/mutate.js";
import * as helpers from "../../../src/helpers/removeNodeCaller.js";

let consoleSpy;

beforeEach(() => {
  consoleSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
});

afterEach(() => {
  consoleSpy.mockRestore();
});

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

    test("ensures 'SIGN_UP_BANNER' has the expected value", () => {
      expect(mutate.Targets.SIGN_UP_BANNER).toBe(3);
    });

    test("ensures 'MOBILE_APP_NON_BLOCKING_CTA' has the expected value", () => {
      expect(mutate.Targets.MOBILE_APP_NON_BLOCKING_CTA).toBe(4);
    });

    test("ensures 'MOBILE_APP_FULL_PAGE_CTA' has the expected value", () => {
      expect(mutate.Targets.MOBILE_APP_FULL_PAGE_CTA).toBe(5);
    });

    test("ensures 'MOBILE_APP_HALF_PAGE_CTA' has the expected value", () => {
      expect(mutate.Targets.MOBILE_APP_HALF_PAGE_CTA).toBe(6);
    });

    test("ensures 'MOBILE_SCROLL_BLOCKING' has the expected value", () => {
      expect(mutate.Targets.MOBILE_SCROLL_BLOCKING).toBe(7);
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
        mutate.Targets.SIGN_UP_BANNER,
        mutate.Targets.RIGHT_SIDEBAR,
      ]);
    });

    test("ensures 'SUBREDDIT' has the expected array", () => {
      expect(mutate.Pages.SUBREDDIT).toEqual([
        mutate.Targets.LEFT_SIDEBAR,
        mutate.Targets.SIGN_UP_BANNER,
        mutate.Targets.RIGHT_SIDEBAR,
      ]);
    });

    test("ensures 'USER' has the expected array", () => {
      expect(mutate.Pages.USER).toEqual([
        mutate.Targets.LEFT_SIDEBAR,
        mutate.Targets.SIGN_UP_BANNER,
      ]);
    });

    test("ensures 'SEARCH' has the expected array", () => {
      expect(mutate.Pages.SEARCH).toEqual([
        mutate.Targets.LEFT_SIDEBAR,
        mutate.Targets.SIGN_UP_BANNER,
        mutate.Targets.RIGHT_SIDEBAR,
      ]);
    });

    test("ensures 'POPULAR' has the expected array", () => {
      expect(mutate.Pages.POPULAR).toEqual([mutate.Targets.MAIN_CONTENT]);
    });

    test("ensures 'ALL' has the expected array", () => {
      expect(mutate.Pages.ALL).toEqual([
        mutate.Targets.MOBILE_APP_NON_BLOCKING_CTA,
        mutate.Targets.MOBILE_APP_FULL_PAGE_CTA,
        mutate.Targets.MOBILE_APP_HALF_PAGE_CTA,
        mutate.Targets.MOBILE_SCROLL_BLOCKING,
      ]);
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
      test("LEFT_SIDEBAR", () => {
        mutate.operate([mutate.Targets.LEFT_SIDEBAR]);
        expect(nodeCallerSpy).toHaveBeenCalledTimes(1);
      });

      test("RIGHT_SIDEBAR", () => {
        mutate.operate([mutate.Targets.RIGHT_SIDEBAR]);
        expect(nodeCallerSpy).toHaveBeenCalledTimes(1);
      });

      test("MAIN_CONTENT", () => {
        mutate.operate([mutate.Targets.MAIN_CONTENT]);
        expect(nodeCallerSpy).toHaveBeenCalledTimes(1);
      });

      test("SIGN_UP_BANNER", () => {
        mutate.operate([mutate.Targets.SIGN_UP_BANNER]);
        expect(nodeCallerSpy).toHaveBeenCalledTimes(1);
      });

      test("MOBILE_APP_NON_BLOCKING_CTA", () => {
        mutate.operate([mutate.Targets.MOBILE_APP_NON_BLOCKING_CTA]);
        expect(nodeCallerSpy).toHaveBeenCalledTimes(1);
      });

      test("MOBILE_APP_FULL_PAGE_CTA", () => {
        mutate.operate([mutate.Targets.MOBILE_APP_FULL_PAGE_CTA]);
        expect(nodeCallerSpy).toHaveBeenCalledTimes(1);
      });

      test("MOBILE_APP_HALF_PAGE_CTA", () => {
        mutate.operate([mutate.Targets.MOBILE_APP_HALF_PAGE_CTA]);
        expect(nodeCallerSpy).toHaveBeenCalledTimes(1);
      });

      describe("'MOBILE_SCROLL_BLOCKING'", () => {
        test("ensures classList is amended as expected", () => {
          const classRemovalSpy = jest.spyOn(document.body.classList, "remove");
          mutate.operate([mutate.Targets.MOBILE_SCROLL_BLOCKING]);
          expect(classRemovalSpy).toHaveBeenCalledWith("rpl-scroll-lock");
          classRemovalSpy.mockRestore();
        });

        test("ensures style is updated as expected", () => {
          document.body.style.overflow = "hidden";
          expect(document.body.style.overflow).toBe("hidden");
          mutate.operate([mutate.Targets.MOBILE_SCROLL_BLOCKING]);
          expect(document.body.style.overflow).toBe("");
        });
      });

      test("Multiple Targets", () => {
        mutate.operate([
          mutate.Targets.LEFT_SIDEBAR,
          mutate.Targets.RIGHT_SIDEBAR,
        ]);
        expect(nodeCallerSpy).toHaveBeenCalledTimes(2);
      });
    });
  });
});
