"use strict";

import { describe, test, expect, jest, afterEach } from "@jest/globals";

import {
  initialMutations,
  responsiveMutations,
} from "../../../src/helpers/listeners.js";
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

describe("#responsiveMutations", () => {
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
      responsiveMutations();
      expect(documentSpy).toHaveBeenCalledWith(
        "DOMContentLoaded",
        expect.any(Function),
      );
    });

    test("ensures 'addEventListener' is called as often as expected", () => {
      documentSpy = jest
        .spyOn(document, "addEventListener")
        .mockImplementation(() => {});
      responsiveMutations();
      expect(documentSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe("event execution", () => {
    test("ensures .extensionRouting is called on dispatchEvent", async () => {
      domainSpy = jest
        .spyOn(domain, "extensionRouting")
        .mockImplementation(() => {});
      responsiveMutations();

      document.dispatchEvent(new Event("DOMContentLoaded"));
      document.body.innerHTML = "<div></div>";
      await Promise.resolve();

      // One fires on initial load; second after DOM mutation promise resolves.
      expect(domainSpy).toHaveBeenCalledTimes(2);
    });
  });
});
