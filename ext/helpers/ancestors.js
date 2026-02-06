module.exports = class Ancestors {
    #isElement = (element) => element instanceof Element;
    
    constructor(nodeOne, nodeTwo) {
        this.nodeOne = this.#isElement(nodeOne) ? nodeOne : null;
        this.nodeTwo = this.#isElement(nodeTwo) ? nodeTwo : null;
    };
}
