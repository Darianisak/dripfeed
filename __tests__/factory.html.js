'use strict';

module.exports = build_two_layer_dom;

function build_two_layer_dom() {
    var parentNode = document.createElement("div");
    parentNode.id = "parent-node";

    [0, 1].forEach(elem => {
        var childNode = document.createElement("div");
        childNode.id = `child-node-${elem}`;
        parentNode.append(childNode);
    });

    return parentNode;
};
