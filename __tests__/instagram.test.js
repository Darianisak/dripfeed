'use strict';

const find_common_ancestor = require("../ext/instagram");
const build_two_layer_dom = require('./factory.html.js');

describe(".find_common_ancestor", () => {  
  describe("#are_required_arguments_found", () => {
    test("returns null if one argument is passed", () => {
      
      debugger
      build_two_layer_dom()
      expect(find_common_ancestor('argumentOne')).toBeNull();
    });

    test("returns null if zero arguments are passed", () => {
      expect(find_common_ancestor()).toBeNull();
    });

    test("does not return null if two arguments are passed", () => {
      expect(find_common_ancestor('arg', 'xargs')).not.toBeNull();
    });

    // TODO - add checks for type
  });
});
