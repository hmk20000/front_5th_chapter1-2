const eventMap = new Map();
let rootElement = null;

export function setupEventListeners(root) {
  // 이벤트 맵에 등록된 이벤트를 root에 등록
  rootElement = root;
  eventMap.forEach((handlers, eventType) => {
    handlers.forEach((handler, _) => {
      rootElement.addEventListener(eventType, handler);
    });
  });
}

export function addEvent(element, eventType, handler) {
  // 이벤트맵에 이벤트를 등록
  // { eventType: { element: handler } }
  // handler는 배열로 안하고 하나의 함수만 등록.

  /**
   * click 이벤트 예시
   * {
   *  click: {
   *    div: handler,
   *    button: handler,
   *  }
   * }
   */

  // 이벤트 타입이 없으면 생성. ex) click:{}
  if (!eventMap.has(eventType)) {
    eventMap.set(eventType, new Map());
  }

  // 이벤트 타입에 이벤트 핸들러를 등록. ex) click:{div:handler, button:handler}
  const handlers = eventMap.get(eventType);
  handlers.set(element, handler);

  // 이벤트를 추가
  // 셋업이 여러번 될경우 여기서 비교를 해야할까?
  // 아니면 초기에 싹 지우고 해야할까?
  // updateElement에서 구분해서 해야할까?
  // 돔 하나에 click 이벤트는 하나만 등록해야하는데 이렇게 하면 여러개가 등록될 수 있음
}

export function removeEvent(element, eventType, handler) {
  if (!eventMap.has(eventType)) {
    return;
  }

  const handlers = eventMap.get(eventType);
  if (handlers.has(element)) {
    handlers.delete(element);
    rootElement.removeEventListener(eventType, handler);
  }
}
