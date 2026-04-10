"use strict";

import {
  describe,
  test,
  expect,
  jest,
  afterEach,
  beforeEach,
} from "@jest/globals";

import { extensionRouting } from "../../src/index.js";
import * as reddit from "../../src/reddit/index.js";
import * as helpers from "../../src/helpers/pathHelper.js";

describe("dripfeed initialisation lifecycle", () => {
  let consoleSpy;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  describe("Listener registrations", () => {
    let documentSpy;

    afterEach(() => {
      documentSpy.mockRestore();
    });

    test("ensures registration on 'DOMContentLoaded'", () => {
      documentSpy = jest.spyOn(document, "addEventListener");

      jest.isolateModules(() => {
        require("../../src/index.js");
      });

      expect(documentSpy).toHaveBeenCalledWith(
        "DOMContentLoaded",
        expect.any(Function),
      );
    });

    test("ensures routing function executed post registration", () => {
      documentSpy = jest.spyOn(document, "addEventListener");

      // Because our eventListener callback is an anonymous function, it's
      // tricky to determine if the 'real' callback - `extensionRouting`
      // is actually called.
      //
      // However, we know that `extensionRouting` calls the
      // pathHelper.getDomain() function immediately on execution, so we
      // can exploit this to see if `extensionRouting` gets fired post
      // "DOMContentLoaded" events firing (via dispatch).

      const domainSpy = jest.spyOn(helpers, "getDomain");

      jest.isolateModules(() => {
        require("../../src/index.js");
      });

      document.dispatchEvent(new Event("DOMContentLoaded"));

      // This is our proxy `expect` for checking that `extensionRouting`
      // was executed.
      expect(domainSpy).toHaveBeenCalledTimes(1);

      domainSpy.mockRestore();
    });
  });

  describe("Domain routing", () => {
    let domainSpy;

    afterEach(() => {
      domainSpy.mockRestore();
    });

    test("ensures that 'www.reddit.com' is correctly routed", () => {
      domainSpy = jest
        .spyOn(helpers, "getDomain")
        .mockImplementation(() => "www.reddit.com");

      const redditSpy = jest
        .spyOn(reddit, "routing")
        .mockImplementation(() => {});
      extensionRouting(document);

      expect(redditSpy).toHaveBeenCalledTimes(1);
    });

    test("ensures non supported domains are correctly routed", () => {
      domainSpy = jest.spyOn(helpers, "getDomain").mockImplementation(() => {
        "localhost";
      });

      expect(extensionRouting(document)).toEqual(127);
    });
  });
});
