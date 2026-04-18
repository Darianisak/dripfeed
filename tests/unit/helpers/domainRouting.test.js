"use strict";

import {
  describe,
  test,
  expect,
  jest,
  afterEach,
  beforeEach,
} from "@jest/globals";

import { extensionRouting } from "../../../src/helpers/domainRouting.js";
import * as reddit from "../../../src/reddit/index.js";
import * as helpers from "../../../src/helpers/pathHelper.js";

describe(".extensionRouting", () => {
  let domainSpy;
  let siteSpy;
  let consoleSpy;

  afterEach(() => {
    [domainSpy, consoleSpy, siteSpy].forEach((spy) => {
      if (spy) {
        spy.mockRestore();
      }
    });
  });

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
  });

  describe("with supported domains", () => {
    describe("'www.reddit.com'", () => {
      beforeEach(() => {
        domainSpy = jest
          .spyOn(helpers, "getDomain")
          .mockImplementation(() => "www.reddit.com");

        siteSpy = jest.spyOn(reddit, "routing").mockImplementation(() => {});

        extensionRouting();
      });

      test("Calls the correct route", () => {
        expect(siteSpy).toHaveBeenCalledTimes(1);
      });

      test("Provides the expected args to the route", () => {
        expect(siteSpy).toHaveBeenCalledWith();
      });
    });
  });

  describe("with unsupported domains", () => {
    test("default case returns as expected", () => {
      domainSpy = jest.spyOn(helpers, "getDomain").mockImplementation(() => {
        "localhost";
      });

      expect(extensionRouting()).toEqual(127);
    });

    test("default case logs as expected", () => {
      domainSpy = jest
        .spyOn(helpers, "getDomain")
        .mockImplementation(() => "localhost");
      extensionRouting();

      expect(consoleSpy).toHaveBeenCalledWith(
        "'localhost' is not yet supported.",
      );
    });
  });
});
