"use strict";

import * as mutate from "../../../src/instagram/mutate.js";

import { describe, test, expect } from "@jest/globals";

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

describe("_Pages", () => {
  describe("enumArrays", () => {
    test("ensures 'DEFAULT' has the expected array", () => {
      expect(mutate.Pages.DEFAULT).toEqual([
        mutate.Targets.DRAWER_EXPLORE,
        mutate.Targets.DRAWER_REELS,
      ]);
    });

    test("ensures 'HOME' has the expected array", () => {
      expect(mutate.Pages.HOME).toEqual([
        mutate.Targets.DRAWER_EXPLORE,
        mutate.Targets.DRAWER_REELS,
        mutate.Targets.PAGE_SUGGESTIONS,
      ]);
    });
  });
});
