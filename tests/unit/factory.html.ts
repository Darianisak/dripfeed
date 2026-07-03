"use strict";

export { build_n_layer_dom, build_tree_dom };

function build_n_layer_dom(depth = 5): void {
  const rootNode = document.createElement("div");
  rootNode.id = "root";
  let currentNode = rootNode;

  for (let layer = 0; layer < depth; layer++) {
    const childNode = document.createElement("div");
    childNode.id = `child-${layer}`;
    currentNode.append(childNode);
    currentNode = childNode;
  }

  document.body.append(rootNode);
}

function build_tree_dom(depth = 5): void {
  const buildChildNode = (layer: number, childIndex: number) => {
    const node = document.createElement("div");
    node.id = `layer-${layer}_index-${childIndex}`;
    return node;
  };

  const topLevelElement = document.createElement("div");
  topLevelElement.id = `layer-0_index-0`;
  document.body.append(topLevelElement);

  for (let layer = 0; layer < depth; layer++) {
    // This kind of relates to the nth+1 iteration of the for loop
    // below, in that we use it to define layerIndex ids ahead of time.
    let currentLayerChildIndex = 0;

    //  Given each node on a layer, we want to iterate through them
    // and append 2 further DOM elements.
    for (let layerIndex = 0; layerIndex < layer + 1; layerIndex++) {
      const currentNode = document.getElementById(
        `layer-${layer}_index-${layerIndex}`,
      );

      if (currentNode === null) {
        throw new ReferenceError(
          `layer-${layer}_index-${layerIndex} unexpectedly failed to find an element`,
        );
      }

      // Left child node of currentNode
      currentNode.append(buildChildNode(layer + 1, currentLayerChildIndex));
      currentLayerChildIndex++;

      // Right child node of currentNode
      currentNode.append(buildChildNode(layer, currentLayerChildIndex));
      currentLayerChildIndex++;
    }
  }
}
