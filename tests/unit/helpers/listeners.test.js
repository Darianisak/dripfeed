"use strict";

import { describe, test, expect, jest, afterEach } from "@jest/globals";

import { initialMutations } from "../../../src/helpers/listeners.js";
import * as domain from "../../../src/helpers/domainRouting.js";

describe("#initialMutations", () => {
  let documentSpy;
  let domainSpy;

  afterEach(() => {
    [documentSpy, domainSpy].forEach((spy) => {
      if (spy) {
        spy.mockRestore();
      }
    });
  });

  describe("event registration", () => {
    test("ensures 'addEventListener' is passed the expected args", () => {
      documentSpy = jest
        .spyOn(document, "addEventListener")
        .mockImplementation(() => {});
      initialMutations();
      expect(documentSpy).toHaveBeenCalledWith(
        "DOMContentLoaded",
        expect.any(Function),
      );
    });

    test("ensures 'addEventListener' is called as often as expected", () => {
      documentSpy = jest
        .spyOn(document, "addEventListener")
        .mockImplementation(() => {});
      initialMutations();
      expect(documentSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe("event execution", () => {
    test("ensures .extensionRouting is called on dispatchEvent", () => {
      domainSpy = jest
        .spyOn(domain, "extensionRouting")
        .mockImplementation(() => {});
      initialMutations();
      document.dispatchEvent(new Event("DOMContentLoaded"));
      expect(domainSpy).toHaveBeenCalledTimes(1);
    });
  });
});
