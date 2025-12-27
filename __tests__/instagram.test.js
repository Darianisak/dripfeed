"use strict";

const { builtinRules } = require("eslint/use-at-your-own-risk");
const find_common_ancestor = require("../ext/instagram");
const build_two_layer_dom = require("./factory.html.js");

describe(".find_common_ancestor", () => {
  var parentNode;
  var firstChildNode;
  var secondChildNode;

  beforeEach(() => {
    build_two_layer_dom();
    parentNode = document.getElementById("parent");
    firstChildNode = document.getElementById("child-0");
    secondChildNode = document.getElementById("child-1");
  });

  describe("#are_required_arguments_found", () => {
    test("returns null if only one argument is passed", () => {
      expect(find_common_ancestor(parentNode)).toBeNull();
    });

    test("returns null if zero arguments are passed", () => {
      expect(find_common_ancestor()).toBeNull();
    });

    test("does not return null if two arguments are passed", () => {
      expect(find_common_ancestor(parentNode, secondChildNode)).not.toBeNull();
    });

    test("returns null if a string and Element are passed", () => {
      expect(find_common_ancestor(parentNode, "invalid")).toBeNull();
    });

    test("returns null if a string and string are passed", () => {
      expect(find_common_ancestor("invalid", "invalid")).toBeNull();
    });

    test("does not return null if two Elements are passed", () => {
      expect(
        find_common_ancestor(firstChildNode, secondChildNode),
      ).not.toBeNull();
    });

    
  });

  describe("#are_elements_related", () => {
    it("returns null if elements share no ancestor", () => {
    });

    it("returns null if elements are equal", () => {
    });

    it("returns null if one element parents another", () => {
    });

    it("returns null if elements are not related within 3 layers", () => {
    });

    it("does not return null if elements are related within 1 layer", () => {
    });

    it("does not return null if elements are related within 3 layers", () => {
    });
  });
});
