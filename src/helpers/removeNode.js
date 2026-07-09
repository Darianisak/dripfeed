import { Ancestors } from "./ancestors.js";

class RemoveNode {
  nodeTree;
  nodeSelector = null;

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
    } else if (args.length === 1 && typeof args[0] === "string") {
      this.nodeSelector = args[0];
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
   * @returns number [0: success; else: failure]
   *
   * Proxy layer for switching between tree traversal based removal and
   * targetted removals by ID.
   */
  operate(tree = this.operateTree, node = this.operateNode) {
    if (this.nodeSelector !== null) {
      return node();
    }

    return tree();
  }

  /**
   * removeNode#operateNode
   * @returns number [0: success; else failure]
   *
   * Removes elements given an ID selector string.
   */
  operateNode = () => {
    if (!this.nodeSelector) {
      console.warn(`removeNode#operateNode called with invalid .nodeSelector`);
      return 1;
    }

    const element = document.getElementById(this.nodeSelector);

    if (!element) {
      console.warn(`removeNode#operateNode called but Element was not found`);
      return 2;
    }

    element.remove();
    return 0;
  };

  /**
   * removeNode#operateTree
   * @returns number [0: success; else: failure]
   *
   * An abstraction over Ancestors, allowing callers to remove nodes without
   * managing Ancestors directly.
   */
  operateTree = () => {
    if (!this.nodeTree.valid()) {
      console.warn(`removeNode#operateTree called with invalid .Ancestors`);
      return 1;
    }

    if (!this.nodeTree.sharedAncestorsPresent()) {
      console.warn(`removeNode#operateTree no ancestors found`);
      return 2;
    }

    this.nodeTree.sharedAncestor().remove();
    return 0;
  };
}

export { RemoveNode };
