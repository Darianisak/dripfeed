"use strict";

import { describe, test, expect, afterEach, beforeEach } from "@jest/globals";
import { Ancestors } from "../../../src/helpers/ancestors.js";
import { buildTreeDOM } from "../factory.html.ts";

describe("Ancestors", () => {
  const baseLayerID = 1;
  const maxLayerID = 9;
  const layerSelector = (id) => `layer-${id}_index-0`;

  let ancestorTree;

  beforeEach(() => {
    buildTreeDOM(maxLayerID + 10);
  });

  afterEach(() => {
    document.getElementsByTagName("html")[0].innerHTML = "";
  });

  describe("#constructor", () => {
    const invalidSelector = "an-invalid-id";

    describe("with Elements", () => {
      describe("when valid", () => {
        test("ensures nodeOne returns the expected element", () => {
          const node = document.getElementById(layerSelector(baseLayerID));
          expect(new Ancestors(node, "").nodeOne).toEqual(
            document.getElementById(layerSelector(baseLayerID)),
          );
        });

        test("ensures nodeTwo returns the expected element", () => {
          const node = document.getElementById(layerSelector(baseLayerID + 1));
          expect(new Ancestors("", node).nodeTwo).toEqual(
            document.getElementById(layerSelector(baseLayerID + 1)),
          );
        });
      });

      describe("when invalid", () => {
        test("ensures nodeOne will be nulled", () => {
          expect(
            new Ancestors("", document.createElement("div")).nodeOne,
          ).toBeNull();
        });

        test("ensures nodeTwo will be nulled", () => {
          expect(
            new Ancestors(document.createElement("div"), "").nodeTwo,
          ).toBeNull();
        });
      });
    });

    describe("with IDs", () => {
      describe("when valid", () => {
        test("ensures nodeOne returns the expected Element", () => {
          expect(new Ancestors(layerSelector(baseLayerID), "").nodeOne).toEqual(
            document.getElementById(layerSelector(baseLayerID)),
          );
        });

        test("ensures nodeTwo returns the expeected Element", () => {
          expect(
            new Ancestors("", layerSelector(baseLayerID + 1)).nodeTwo,
          ).toEqual(document.getElementById(layerSelector(baseLayerID + 1)));
        });
      });

      describe("when invalid", () => {
        test("ensures nodeOne is null", () => {
          expect(
            new Ancestors(invalidSelector, layerSelector(baseLayerID + 1))
              .nodeOne,
          ).toBeNull();
        });

        test("ensures nodeTwo is null", () => {
          expect(
            new Ancestors(layerSelector(baseLayerID), invalidSelector).nodeTwo,
          ).toBeNull();
        });
      });
    });
  });

  describe("#ancestorNodes", () => {
    describe("when mutation is attempted after creation", () => {
      let currentAncestors;

      beforeEach(() => {
        ancestorTree = new Ancestors(
          document.getElementById(layerSelector(baseLayerID)),
          document.getElementById(layerSelector(maxLayerID - 1)),
        );
      });

      test("ensures nodeOne's ancestors are immutable", () => {
        currentAncestors = ancestorTree.nodeOneAncestors;
        ancestorTree.nodeOne = document.createElement("div");
        expect(ancestorTree.nodeOne).toEqual(document.createElement("div"));
        expect(ancestorTree.nodeOneAncestors).toEqual(currentAncestors);
      });

      test("ensures nodeTwo's ancestors are immutable", () => {
        currentAncestors = ancestorTree.nodeTwoAncestors;
        ancestorTree.nodeTwo = document.createElement("div");
        expect(ancestorTree.nodeTwo).toEqual(document.createElement("div"));
        expect(ancestorTree.nodeTwoAncestors).toEqual(currentAncestors);
      });
    });

    describe("when the class is improperly called", () => {
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
      beforeEach(() => {
        ancestorTree = new Ancestors(
          document.getElementById(layerSelector(baseLayerID + 3)),
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
          document.getElementById(layerSelector(baseLayerID + 2)),
          document.getElementById(layerSelector(baseLayerID + 1)),
          document.getElementById(layerSelector(baseLayerID)),
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
        ancestorTree = new Ancestors(
          document.getElementById(layerSelector(baseLayerID)),
          document.getElementById(layerSelector(maxLayerID - 2)),
        );
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
      test("returns false", () => {
        ancestorTree = new Ancestors(
          document.createElement("div"),
          document.createElement("div"),
        );
        expect(ancestorTree.sharedAncestorsPresent()).toBeFalsy();
      });
    });

    describe("with ancestors", () => {
      describe("when in range", () => {
        test("returns true when 1 layer apart", () => {
          ancestorTree = new Ancestors(
            document.getElementById(layerSelector(baseLayerID)),
            document.getElementById(layerSelector(baseLayerID + 1)),
          );
          expect(ancestorTree.sharedAncestorsPresent()).toBeTruthy();
        });

        test("returns true when 3 layers apart", () => {
          ancestorTree = new Ancestors(
            document.getElementById(layerSelector(baseLayerID)),
            document.getElementById(layerSelector(baseLayerID + 2)),
          );
          expect(ancestorTree.sharedAncestorsPresent()).toBeTruthy();
        });
      });

      describe("when out of range", () => {
        test("returns false when 4 layers apart", () => {
          ancestorTree = new Ancestors(
            document.getElementById(layerSelector(baseLayerID)),
            document.getElementById(layerSelector(baseLayerID + 3)),
          );
          expect(ancestorTree.sharedAncestorsPresent()).toBeFalsy();
        });

        test("returns false when many layers apart", () => {
          ancestorTree = new Ancestors(
            document.getElementById(layerSelector(baseLayerID)),
            document.getElementById(layerSelector(maxLayerID)),
          );
          expect(ancestorTree.sharedAncestorsPresent()).toBeFalsy();
        });
      });
    });
  });

  describe("#sharedAncestor", () => {
    describe("without ancestors", () => {
      test("returns null", () => {
        ancestorTree = new Ancestors(
          document.createElement("div"),
          document.createElement("div"),
        );
        expect(ancestorTree.sharedAncestor()).toBeNull();
      });
    });

    describe("with ancestors", () => {
      test("ensures an element on the same layer returns an ancestor", () => {
        ancestorTree = new Ancestors(
          document.getElementById(layerSelector(baseLayerID)),
          document.getElementById(layerSelector(baseLayerID)),
        );
        expect(ancestorTree.sharedAncestor()).toEqual(
          ancestorTree.nodeOneAncestors[0],
        );
      });

      test("ensures an element within 1 layer is returned", () => {
        ancestorTree = new Ancestors(
          document.getElementById(layerSelector(baseLayerID + 1)),
          document.getElementById(layerSelector(baseLayerID)),
        );
        expect(ancestorTree.sharedAncestor()).toEqual(
          ancestorTree.nodeOneAncestors[1],
        );
      });

      test("ensures an element within 2 layers is returned", () => {
        ancestorTree = new Ancestors(
          document.getElementById(layerSelector(baseLayerID + 2)),
          document.getElementById(layerSelector(baseLayerID)),
        );
        expect(ancestorTree.sharedAncestor()).toEqual(
          ancestorTree.nodeOneAncestors[2],
        );
      });

      test("ensures an element within 3 layers is returned", () => {
        ancestorTree = new Ancestors(
          document.getElementById(layerSelector(baseLayerID + 3)),
          document.getElementById(layerSelector(baseLayerID)),
        );
        expect(ancestorTree.sharedAncestor()).toBeNull();
      });
    });
  });
});
