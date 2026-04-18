"use strict";

import {
  describe,
  test,
  expect,
  jest,
  afterEach,
  beforeEach,
} from "@jest/globals";

import * as domain from "../../src/helpers/domainRouting.js";

jest.mock("../../src/helpers/domainRouting.js", () => ({
  extensionRouting: jest.fn(),
}));

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
      domain.extensionRouting.mockClear();
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
      // Without this, index.js runs twice, causing two listeners to be
      // registered to the document.
      jest.resetModules();

      jest.isolateModules(() => {
        require("../../src/index.js");
      });

      document.dispatchEvent(new Event("DOMContentLoaded"));

      expect(domain.extensionRouting).toHaveBeenCalledTimes(1);
    });
  });
});
