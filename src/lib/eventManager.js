const eventMap = new Map();

export function setupEventListeners(root) {
  const EVENT = ["click", "mouseover", "focus", "keydown", "keyup", "keypress"];

  EVENT.forEach((eventName) => {
    root.addEventListener(eventName, (e) => {
      const target = e.target;
      if (eventMap.has(target)) {
        const handlers = eventMap.get(target);
        handlers.forEach((handler, eventType) => {
          if (eventType === eventName) {
            handler(e);
          }
        });
      }
    });
  });
}

export function addEvent(element, eventType, handler) {
  if (!eventMap.has(element)) {
    eventMap.set(element, new Map());
  }
  const handlers = eventMap.get(element);
  handlers.set(eventType, handler);
}

export function removeEvent(element, eventType, handler) {
  if (!eventMap.has(element)) {
    return;
  }
  const handlers = eventMap.get(element);
  handlers.delete(eventType);
}
