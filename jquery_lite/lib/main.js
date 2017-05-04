const DOMNodeCollection = require('./dom_node_collection');

Window.prototype.$l = function (selector) {
  let array = [];

  if (typeof(selector) === "string") {
    const nodeList = this.document.querySelectorAll(selector);
    array = Array.from(nodeList);
  }

  if (selector instanceof HTMLElement) {
    array.push(selector);
  }
  const dom = new DOMNodeCollection(array);
  return dom;
};
