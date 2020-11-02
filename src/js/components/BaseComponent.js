export default class BaseComponent {
  constructor(handlers) {
    if (handlers) {
      this._setHandlers(handlers);
    }

  }

  _setHandlers(handlers) {
    for (const {element, event, callback} of handlers) {
      if (NodeList.prototype.isPrototypeOf(element)) {
        element.forEach(e => e.addEventListener(event, callback))
      } else {
        element.addEventListener(event, callback);
      }

    }
  }
}
