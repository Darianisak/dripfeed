import { RemoveNode } from "./removeNode.js";

export function removeNodeCaller(...args) {
  [...args].forEach((element) => {
    if (typeof element === "string" || element instanceof Element) {
      return;
    }
    throw new TypeError(
      `removeNodeCaller received unexpected argument, '${typeof element}', expected 'string' or 'Element'`,
    );
  });

  new RemoveNode(...args).operate();
}
