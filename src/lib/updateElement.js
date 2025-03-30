import { addEvent, removeEvent } from "./eventManager";
import { createElement } from "./createElement.js";

function updateAttributes(target, originNewProps, originOldProps) {
  const newProps = originNewProps || {};
  const oldProps = originOldProps || {};

  Object.keys(newProps).forEach((key) => {
    const newProp = newProps[key];
    const oldProp = oldProps[key];
    if (newProp !== oldProp) {
      if (key.startsWith("on")) {
        removeEvent(target, key.slice(2).toLowerCase(), oldProp);
        addEvent(target, key.slice(2).toLowerCase(), newProp);
      }
    }
  });
}

export function updateElement(parentElement, newNode, oldNode, index = 0) {
  // 1. 새로운 노드가 없다면 기존 노드 제거.
  if (!newNode) {
    parentElement.removeChild(parentElement.children[index]);
    return;
  }

  if (!oldNode) {
    parentElement.appendChild(createElement(newNode));
    return;
  }

  if (newNode.type !== oldNode.type) {
    parentElement.replaceChild(
      createElement(newNode),
      parentElement.children[index],
    );
    return;
  }

  if (newNode.type === oldNode.type) {
    updateAttributes(
      parentElement.children[index],
      newNode.props,
      oldNode.props,
    );
  }

  const childLength = Math.max(
    newNode.children.length,
    oldNode.children.length,
  );

  for (let i = 0; i < childLength; i++) {
    updateElement(
      parentElement.children[index],
      newNode.children[i],
      oldNode.children[i],
      i,
    );
  }
}
