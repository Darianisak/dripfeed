'use strict';

const { builtinRules } = require("eslint/use-at-your-own-risk");
const find_common_ancestor = require("../ext/instagram");
const build_two_layer_dom = require('./factory.html.js');

describe(".find_common_ancestor", () => {  
  beforeEach(() =>{
    build_two_layer_dom();
  });

  describe("#are_re.quired_arguments_found", () => {
    const parentNode = document.getElementById("parent")
    const firstChildNode = document.getElementById("child-1")
    const secondChildNode = document.getElementById("child-2")

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

    });

    test("returns null if a string and string are passed", () => {

    });

    test("returns true if an Element and an Element are passed", () => {

    });
  });
});
