import { Ancestors } from "./ancestors.js";

// The RemoveNode constructor can either take a pre-created Ancestors object,
// or you can provide selectors/DOM Elements which will be in turn passed
// down to create an Ancestors object.
//
// If providing an Ancestors object, it MUST be the first argument.
//
class RemoveNode {
  nodeTree;

  #isAncestorTree = (tree) => tree instanceof Ancestors;

  constructor() {
    if (arguments.length === 0) {
      throw new SyntaxError("RemoveNode instantiated with no arguments.");
    }

    this.nodeTree = this.#isAncestorTree(arguments[0]) ? arguments[0] : null;

    if (!this.nodeTree) {
      if (arguments.length === 2) {
        // All typechecking concerns are handled by Ancestors - args[0] and
        // args[1] can be either DOM Elements or Element IDs.
        //
        this.nodeTree = new Ancestors(arguments[0], arguments[1]);
      }
    }
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

export { RemoveNode };
window.RemoveNode = RemoveNode;
