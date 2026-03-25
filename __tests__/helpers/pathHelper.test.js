"use strict";

import { describe, test, expect } from "@jest/globals";
import { getDomain, getPathname } from "../../ext/helpers/pathHelper";

describe(".getPathname", () => {
  describe("argument validation", () => {
    test("ensures that invalid args raise TypeError", () => {
      expect(() => getPathname("helloWorld")).toThrow(TypeError);
    });

    test("ensures that invalid args raise TypeError message", () => {
      expect(() => getPathname("helloWorld")).toThrow(
        "getPathname expected argument of type HTMLDocument. Found string",
      );
    });
  });

  describe("return data", () => {
    test("ensures that hostname is pathname is returned", () => {
      expect(getPathname(document)).toEqual("/");
    });
  });
});

describe(".getDomain", () => {
  describe("argument validation", () => {
    test("ensures that invalid args raise TypeError", () => {
      expect(() => getDomain("helloWorld")).toThrow(TypeError);
    });

    test("ensures that invalid args raise TypeError message", () => {
      expect(() => getDomain("helloWorld")).toThrow(
        "getDomain expected argument of type HTMLDocument. Found string",
      );
    });
  });

  describe("return data", () => {
    test("ensures that domain is returned", () => {
      expect(getDomain(document)).toEqual("localhost");
    });
  });
});
