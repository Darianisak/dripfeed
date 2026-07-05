import { Ancestors } from "./ancestors.js";

class RemoveNode {
  nodeTree;

  /**
   * removeNode#constructor
   * @param args
   *
   * Single arg: must be of type Ancestors
   * Two args: must of of type string
   */
  constructor(...args) {
    const stringCheck = (args) =>
      args.slice(0, 2).every((arg) => typeof arg === "string");

    if (args.length === 0 || args.length > 2) {
      throw new SyntaxError(
        "removeNode#constructor - Unexpected number of arguments",
      );
    }

    if (args.length === 1 && args[0] instanceof Ancestors) {
      this.nodeTree = args[0];
    } else if (args.length === 2 && stringCheck(args)) {
      this.nodeTree = new Ancestors(args[0], args[1]);
    } else {
      throw new SyntaxError(
        `removeNode#constructor - Unexpected argument form: ${args}`,
      );
    }
  }

  /**
   * removeNode#operate
   * @returns none
   *
   * An abstraction over Ancestors, allowing callers to remove nodes without
   * managing Ancestors directly.
   */
  operate() {
    if (!this.nodeTree.valid()) {
      console.warn(`removeNode#operate called with invalid .Ancestors`);
      return 1;
    }

    if (!this.nodeTree.sharedAncestorsPresent()) {
      console.warn(`removeNode#operate no ancestors found`);
      return 2;
    }

    this.nodeTree.sharedAncestor().remove();
    return 0;
  }
}

export { RemoveNode };
