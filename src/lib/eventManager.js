const eventMap = new Map();
let rootElement = null;

export function setupEventListeners(root) {
  // 이벤트 맵에 등록된 이벤트를 root에 등록
  rootElement = root;

  // 모든 이벤트 리스너 제거
  eventMap.forEach((handlers, eventType) => {
    handlers.forEach((handler) => {
      rootElement.removeEventListener(eventType, handler);
    });
  });

  // 이벤트 맵에 등록된 이벤트를 root에 다시 등록
  eventMap.forEach((handlers, eventType) => {
    handlers.forEach((handler) => {
      rootElement.addEventListener(eventType, handler);
    });
  });
}

export function addEvent(element, eventType, handler) {
  // 이벤트 타입이 없으면 생성. ex) click:{}
  if (!eventMap.has(eventType)) {
    eventMap.set(eventType, new Map());
  }

  // 이벤트 타입에 이벤트 핸들러를 등록. ex) click:{div:handler, button:handler}
  const handlers = eventMap.get(eventType);
  handlers.set(element, handler);
}

export function removeEvent(element, eventType, handler) {
  if (!eventMap.has(eventType)) {
    return;
  }

  const handlers = eventMap.get(eventType);
  if (handlers.has(element)) {
    handlers.delete(element);
  }
}
