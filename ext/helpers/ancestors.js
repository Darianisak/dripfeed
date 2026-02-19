export { Ancestors };

class Ancestors {
  depth = 3;
  ancestorsOne;
  ancestorsTwo;

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

      parentNodes.push(parentNode);
      currentNode = parentNode;
      currentDepth++;
    }
    return parentNodes;
  };

  constructor(nodeOne, nodeTwo) {
    this.nodeOne = this.#isElement(nodeOne) ? nodeOne : null;
    this.nodeTwo = this.#isElement(nodeTwo) ? nodeTwo : null;
  }

  get nodeOneAncestors() {
    this.ancestorsOne ??= this.#nodeAncestors(this.nodeOne);
    return this.ancestorsOne;
  }

  get nodeTwoAncestors() {
    this.ancestorsTwo ??= this.#nodeAncestors(this.nodeTwo);
    return this.ancestorsTwo;
  }

  sharedAncestorsPresent() {
    const ancestorsAreInvalid = (nodes) => {
      if (!(nodes instanceof Array) || nodes.length === 0) {
        return true;
      }
      return false;
    };

    if (
      ancestorsAreInvalid(this.nodeOneAncestors) ||
      ancestorsAreInvalid(this.nodeTwoAncestors)
    ) {
      return false;
    }

    let ancestorNodeCount =
      this.nodeOneAncestors.length + this.nodeTwoAncestors.length;

    if (
      new Set([...this.nodeOneAncestors, ...this.nodeTwoAncestors]).size !==
      ancestorNodeCount
    ) {
      // A difference in length here should indicate shared node ancestors.
      return true;
    }

    return false;
  }

  sharedAncestor() {
    if (!this.sharedAncestorsPresent()) {
      return null;
    }

    const elementIsShared = (elem, nodeList) => {
      return nodeList.includes(elem);
    };

    const sharedElement = this.nodeOneAncestors.find((elem) => {
      if (elementIsShared(elem, this.nodeTwoAncestors)) {
        return elem;
      }
    });

    if (!(sharedElement instanceof Element)) {
      throw new TypeError(
        `sharedAncestor unexpectedly failed to find an element.`,
      );
    }
    return sharedElement;
  }
}
