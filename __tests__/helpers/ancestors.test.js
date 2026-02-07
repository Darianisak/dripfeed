"use strict";

const Ancestors = require("../../ext/helpers/ancestors.js");
const build_n_layer_dom = require("../factory.html.js");

describe("#constructor", () => {
  describe("type validations", () => {
    test("ensures nodeOne will be nulled if not passed an Element", () => {
      expect(
        new Ancestors("", document.createElement("div")).nodeOne,
      ).toBeNull();
    });

    test("ensures nodeTwo will be nulled if not passed an Element", () => {
      expect(
        new Ancestors(document.createElement("div"), "").nodeTwo,
      ).toBeNull();
    });

    test("ensures nodeOne contains the original element", () => {
      build_n_layer_dom(2);
      const node = document.getElementById("child-0");
      expect(new Ancestors(node, "").nodeOne).toEqual(node);
    });

    test("ensures nodeTwo contains the original element", () => {
      build_n_layer_dom(2);
      const node = document.getElementById("child-1");
      expect(new Ancestors("", node).nodeTwo).toEqual(node);
    });
  });
});

describe("#ancestorNodes", () => {
  afterEach(() => {
    document.getElementsByTagName("html")[0].innerHTML = "";
  });

  describe("when the class is improperly called", () => {
    let ancestorTree;

    beforeEach(() => {
      ancestorTree = new Ancestors("", "");
    });

    test("throws a TypeError when nodeOne is null", () => {
      expect(() => ancestorTree.nodeOneAncestors).toThrow(TypeError);
    });

    test("throws a TypeError when nodeTwo is null", () => {
      expect(() => ancestorTree.nodeTwoAncestors).toThrow(TypeError);
    });
  });

  describe("when neither node has ancestors", () => {
    let ancestorTree;

    beforeEach(() => {
      ancestorTree = new Ancestors(
        document.createElement("div"),
        document.createElement("div"),
      );
    });

    test("ensures nodeOne does not return nodes", () => {
      expect(ancestorTree.nodeOneAncestors).toEqual([]);
    });

    test("ensures nodeOne does not return nodes", () => {
      expect(ancestorTree.nodeTwoAncestors).toEqual([]);
    });
  });

  describe("when only nodeOne has ancestors", () => {
    let ancestorTree;

    beforeEach(() => {
      build_n_layer_dom(5);
      ancestorTree = new Ancestors(
        document.getElementById("child-4"),
        document.createElement("div"),
      );
    });

    test("ensures array is returned", () => {
      expect(ancestorTree.nodeOneAncestors).toBeInstanceOf(Array);
    });

    test("ensures array items are elements", () => {
      expect(ancestorTree.nodeOneAncestors[0]).toBeInstanceOf(Element);
    });

    test("ensures return is limited to Ancestors.depth", () => {
      expect(ancestorTree.nodeOneAncestors.length).toBe(3);
    });

    test("ensures expected elements are returned", () => {
      const expectedElements = [
        document.getElementById("child-1"),
        document.getElementById("child-2"),
        document.getElementById("child-3"),
      ];
      expect(ancestorTree.nodeOneAncestors).toEqual(expectedElements);
    });

    test("ensures nodeTwo does not return ancestors", () => {
      expect(ancestorTree.nodeTwoAncestors).toEqual([]);
    });
  });

  describe("when both nodes have ancestors", () => {
    var ancestorTree;

    beforeEach(() => {
      // Gives us a big enough DOM that we won't collide.
      build_n_layer_dom(20);
      ancestorTree = new Ancestors(
        document.getElementById("child-19"),
        document.getElementById("child-1"),
      );
    });

    test("ensures nodeTwo returns a limited result", () => {
      // FIXME
      expect(ancestorTree.nodeTwoAncestors.length).toEqual(2);
    });

    test("ensures nodeOne and nodeTwo don't return the same elements", () => {
      expect(ancestorTree.nodeOneAncestors).not.toEqual(
        ancestorTree.nodeTwoAncestors,
      );
    });
  });
});

describe("#sharedAncestorsPresent", () => {
  describe("with no ancestors", () => {
    test("");
  });

  describe("with ancestors");
});
