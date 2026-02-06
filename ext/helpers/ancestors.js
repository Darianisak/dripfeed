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

      if (!parentNode) {
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
    return this.#nodeAncestors(this.nodeOne);
  }

  get nodeTwoAncestors() {
    return this.#nodeAncestors(this.nodeTwo);
  }

  // TODO - func for returning all parents of nodeOne/Two
  sharedAncestorsPresent() {
    // TODO
  }
};
