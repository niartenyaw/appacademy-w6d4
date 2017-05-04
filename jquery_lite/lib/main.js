const DOMNodeCollection = require('./dom_node_collection');
const Listeners = require('./listeners');

Window.prototype.$l = function (selector) {
  let array = [];

  if (typeof(selector) === "string") {
    const nodeList = this.document.querySelectorAll(selector);
    array = Array.from(nodeList);
  }

  if (selector instanceof HTMLElement) {
    array.push(selector);
  }

  if (selector instanceof Function) {
    document.addEventListener('DOMContentLoaded', selector);
    return;
  }

  const dom = new DOMNodeCollection(array);
  return dom;

};

window.$l(() => {
  const children = window.$l(".restaurants").children();
  for (var i = 0; i < children.htmlEls.length; i++) {
    const el = children.htmlEls[i];
    const cb = Listeners.clickAlert.bind(el);
    window.$l(el).on("click", cb);
  }
});
