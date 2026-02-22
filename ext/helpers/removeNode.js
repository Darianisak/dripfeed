import { Ancestors } from "./ancestors";
export { RemoveNode };

class RemoveNode {
  nodeTree;

  #isAncestorTree = (tree) => tree instanceof Ancestors;

  constructor(tree) {
    this.nodeTree = this.#isAncestorTree(tree) ? tree : null;
  }

  operate() {
    if (!(this.nodeTree instanceof Ancestors)) {
      throw new TypeError(
        "removeNode defined created without an Ancestors object",
      );
    }

    try {
      var ancestor = this.nodeTree.sharedAncestor();
    } catch (TypeError) {
      throw new Error(`removeNode raised TypeError: ${TypeError}`);
    }

    if (ancestor === null) {
      return false;
    }

    ancestor.remove();
  }
}
