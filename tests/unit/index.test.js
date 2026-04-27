"use strict";

import { describe, test, expect, jest, afterEach } from "@jest/globals";

import * as listener from "../../src/helpers/listeners.js";

jest.mock("../../src/helpers/listeners.js", () => ({
  initialMutations: jest.fn(),
}));

describe("#global", () => {
  afterEach(() => {
    listener.initialMutations.mockRestore();
  });

  test("ensures that .initialMutations is called", () => {
    jest.isolateModules(() => {
      require("../../src/index.js");
    });

    expect(listener.initialMutations).toHaveBeenCalledTimes(1);
  });
});
