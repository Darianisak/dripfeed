const find_common_ancestor = require("../ext/instagram");

describe(".find_common_ancestor", () => {
  describe("function arguments", () => {
    test("ensures left_node is a valid element", () => {});
    test("ensures function requires two arguments", () => {});
    test("ensures mix-type arguments return null", () => {});
  });
  test("ensures no match returns null", () => {
    find_common_ancestor(1);
  });
});
