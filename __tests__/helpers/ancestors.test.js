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

  describe("when mutation is attempted after creation", () => {
    // Context block to ensure that ancestors ARE NOT re-derived on changes
    // to the underlying target nodes, i.e., updating the instances nodeOne from
    // id='root' to id='child-4' won't update the ancestors to be those of 'child-4'.
    //
    let ancestorTree;

    beforeEach(() => {
      build_n_layer_dom(10);
      ancestorTree = new Ancestors(document.getElementById("child-1"), document.getElementById("child-8"));
    });

    test("ensures nodeOne's ancestors are immutable", () => {
      let currentAncestors = ancestorTree.nodeOneAncestors;
      ancestorTree.nodeOne = document.createElement("div");
      expect(ancestorTree.nodeOne).toEqual(document.createElement("div"));
      expect(ancestorTree.nodeOneAncestors).toEqual(currentAncestors);

    });

    test("ensures nodeTwo's ancestors are immutable", () => {
      let currentAncestors = ancestorTree.nodeTwoAncestors;
      ancestorTree.nodeTwo = document.createElement("div");
      expect(ancestorTree.nodeTwo).toEqual(document.createElement("div"));
      expect(ancestorTree.nodeTwoAncestors).toEqual(currentAncestors);
    });
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
  let ancestorTree;

  afterEach(() => {
    document.getElementsByTagName("html")[0].innerHTML = "";
  });

  describe("with no ancestors", () => {
    test("ensures false returned for nodes with no ancestors", () => {
      ancestorTree = new Ancestors(document.createElement("div"), document.createElement("div"));
      expect(ancestorTree.sharedAncestorsPresent()).toBeFalsy();
    });
  });

  describe("with no shared ancestors within depth", () => {
    test("ensures false is returned", () => {
      build_n_layer_dom(20);
      ancestorTree = new Ancestors(document.getElementById('child-1'), document.getElementById('child-15'));
      expect(ancestorTree.sharedAncestorsPresent()).toBeFalsy();
    });
  });

  describe("with shared ancestors", () => {
    test("ensures false is returned if ancestors out of range", () => {

    });

    test("ensures true is returned when common ancestor found", () => {

    });
  });
});
