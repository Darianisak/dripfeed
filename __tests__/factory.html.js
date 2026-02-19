"use strict";

export { build_n_layer_dom };

function build_n_layer_dom(depth = 5) {
  const rootNode = document.createElement("div");
  rootNode.id = "root";
  let currentNode = rootNode;

  for (let layer = 0; layer < depth; layer++) {
    let childNode = document.createElement("div");
    childNode.id = `child-${layer}`;
    // FIXME - bug here which means the DOM tree is split in half.
    currentNode.append(childNode);
    currentNode = childNode;
  }

  document.body.append(rootNode);
}

// TODO build
