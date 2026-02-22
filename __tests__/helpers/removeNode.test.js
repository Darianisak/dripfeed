"use strict";

import {
  describe,
  test,
  expect,
  jest,
  afterEach,
  beforeEach,
} from "@jest/globals";
import { RemoveNode } from "../../ext/helpers/removeNode";
import { Ancestors } from "../../ext/helpers/ancestors";
import { build_tree_dom } from "../factory.html";

describe("#constructor", () => {
  describe("type validations", () => {
    test("ensures nodeTree is nulled, given an invalid tree", () => {
      expect(new RemoveNode("helloWorld").nodeTree).toBeNull();
    });

    test("ensures nodeTree is an Ancestors tree, given a valid tree", () => {
      expect(new RemoveNode(new Ancestors()).nodeTree).toBeInstanceOf(
        Ancestors,
      );
    });
  });
});

describe("#operate", () => {
  describe("type validations", () => {
    let removeNode;
    let ancestors;

    test("ensures TypeError raised given a nulled Ancestor Tree", () => {
      removeNode = new RemoveNode("");
      expect(() => removeNode.operate()).toThrow(TypeError);
    });

    test("ensures TypeError given a malformed Ancestor tree", () => {
      ancestors = new Ancestors();
      var sharedAncestorSpy = jest
        .spyOn(ancestors, "sharedAncestor")
        .mockImplementation(() => {
          throw new TypeError();
        });
      expect(() => new RemoveNode(ancestors).operate()).toThrow(Error);
      sharedAncestorSpy.mockRestore();
    });
  });

  describe("node removal returns", () => {
    let removeNode;
    let ancestors;

    test("ensures false is returned if tree has no shared ancestor", () => {
      ancestors = new Ancestors();
      var sharedAncestorSpy = jest
        .spyOn(ancestors, "sharedAncestor")
        .mockImplementation(() => {
          return null;
        });
      expect(new RemoveNode(ancestors).operate()).toBeFalsy();
      sharedAncestorSpy.mockRestore();
    });

    test("ensures undefined is returned for trees with shared ancestors", () => {
      ancestors = new Ancestors(
        document.createElement("div"),
        document.createElement("div"),
      );
      removeNode = new RemoveNode(ancestors);
      var sharedAncestorSpy = jest
        .spyOn(ancestors, "sharedAncestor")
        .mockImplementation(() => {
          return document.createElement("div");
        });
      // `element.remove()` returns undefined in all cases.
      expect(removeNode.operate()).toBeUndefined();
      sharedAncestorSpy.mockRestore();
    });
  });

  describe("internal method calls", () => {
    var ancestors;
    var removeNode;

    test("ensures ancestor.remove() is called", () => {
      var elementRemoveSpy = jest
        .spyOn(Element.prototype, "remove")
        .mockImplementation(() => {
          return undefined;
        });

      ancestors = new Ancestors(
        document.createElement("div"),
        document.createElement("div"),
      );

      var sharedAncestorSpy = jest
        .spyOn(ancestors, "sharedAncestor")
        .mockImplementation(() => {
          return document.createElement("div");
        });
      removeNode = new RemoveNode(ancestors);
      removeNode.operate();
      expect(elementRemoveSpy).toHaveBeenCalled();

      sharedAncestorSpy.mockRestore();
      elementRemoveSpy.mockRestore();
    });
  });

  describe("node removal dom mutations, given a valid ancestor", () => {
    var removeNode;
    var nodeOne;
    var nodeTwo;

    beforeEach(() => {
      build_tree_dom();
      nodeOne = document.getElementById("layer-2_index-1");
      nodeTwo = document.getElementById("layer-2_index-2");
      removeNode = new RemoveNode(new Ancestors(nodeOne, nodeTwo));
    });

    afterEach(() => {
      document.getElementsByTagName("html")[0].innerHTML = "";
    });

    test("ensures nodeOne is removed", () => {
      removeNode.operate();
      expect(document.getElementById("layer-2_index-1")).toBeNull();
    });

    test("ensures nodeTwo is removed", () => {
      removeNode.operate();
      expect(document.getElementById("layer-2_index-2")).toBeNull();
    });

    test("ensure ancestor id is as expected", () => {
      // More a test of the `build_tree_dom()` factory method.
      expect(removeNode.nodeTree.sharedAncestor().id).toBe("layer-1_index-0");
    });

    test("ensures parent of ancestor is not removed", () => {
      removeNode.operate();
      expect(document.getElementById("layer-0_index-0")).not.toBeNull();
    });

    test("ensures ancestor is removed", () => {
      removeNode.operate();
      expect(document.getElementById("layer-1_index-0")).toBeNull();
    });

    test("ensures child of nodeOne is removed", () => {
      removeNode.operate();
      expect(document.getElementById("layer-3_index-1")).toBeNull();
    });

    test("ensures child of nodeTwo is removed", () => {
      removeNode.operate();
      expect(document.getElementById("layer-3_index-4")).toBeNull();
    });

    test("ensures next left node is not removed", () => {
      removeNode.operate();
      expect(document.getElementById("layer-2_index-0")).toBeNull();
    });

    test("ensures next right node is not removed", () => {
      removeNode.operate();
      expect(document.getElementById("layer-2_index-3")).toBeNull();
    });
  });
});
