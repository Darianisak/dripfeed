module.exports = class Ancestors {
  #isElement = (element) => element instanceof Element;

  #nodeAncestors = (elem) => {
    if (!(elem instanceof Element)) {
      throw new TypeError(`${elem} was not of type Element`);
    }

    let currentDepth = 0;
    let currentNode = elem;
    let parentNodes = [];

    while (currentDepth < this.depth) {
      let parentNode = currentNode.parentNode;

      // We don't want to be deleting body tags.
      if (!parentNode || parentNode instanceof HTMLBodyElement) {
        break;
      }

      parentNodes.unshift(parentNode);
      currentNode = parentNode;
      currentDepth++;
    }
    return parentNodes;
  };

  constructor(nodeOne, nodeTwo) {
    this.nodeOne = this.#isElement(nodeOne) ? nodeOne : null;
    this.nodeTwo = this.#isElement(nodeTwo) ? nodeTwo : null;
    this.depth = 3;
  }

  get nodeOneAncestors() {
    // TODO - refactor opportunity to store as instance scope.
    return this.#nodeAncestors(this.nodeOne);
  }

  get nodeTwoAncestors() {
    return this.#nodeAncestors(this.nodeTwo);
  }

  sharedAncestorsPresent() {
    // TODO typeChecks
    const nodeOneParents = this.nodeOneAncestors;
    const nodeTwoParents = this.nodeTwoAncestors;
    let nodeParentSet = Set(...nodeOneParents, ...nodeTwoParents);
    if (nodeParentSet.size !== nodeOneParents.length + nodeTwoParents.length) {
      return true;
    }
    return false;
  }
};
