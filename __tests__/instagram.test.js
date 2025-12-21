'use strict';
const find_common_ancestor = require("../ext/instagram");

describe(".find_common_ancestor", () => {
  // var 
  
  describe("#are_required_arguments_found", () => {
    test("returns null if one argument is passed", () => {
      expect(find_common_ancestor('argumentOne')).toBeNull();
    });

    test("returns null if zero arguments are passed", () => {
      expect(find_common_ancestor()).toBeNull();
    });

    test("does not return null if two arguments are passed", () => {
      debugger
      expect(find_common_ancestor('arg', 'xargs')).not.toBeNull();
    });

    // TODO - add checks for type
  });
});
