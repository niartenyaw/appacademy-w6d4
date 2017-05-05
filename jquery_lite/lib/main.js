const DOMNodeCollection = require('./dom_node_collection');
const Listeners = require('./listeners');
const APIUtils = require('./api_utils');

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

Window.prototype.$l.extend = function (...args) {
  const merged = {};
  for (let i = 0; i < args.length; i++) {
    for (let k in args[i]) {
      merged[k] = args[i][k];
    }
  }

  return merged;
};

Window.prototype.$l.ajax = function( options = {}) {
  let defaults = {
    url: "/",
    method: "GET",
    data: {},
    contentType: "HTMl",
    success: () => {},
    error: () => {}
  };

  options = this.extend(defaults, options);

  const xhr = new XMLHttpRequest();

  xhr.open(options['method'], options['url']);

  xhr.onload = function () {
    console.log(xhr.status); // for status info
    console.log(xhr.responseType); //the type of data that was returned
    console.log(xhr.response); //the actual response. For json api calls, this will be a json string
    // console.log(xhr.response);
    // return xhr.response;
  };
  return xhr.send();
};

function addLi(data) {
  for (let k in data) {
    const $newLi = document.createElement("li");
    if (data[k] instanceof Object) {
      const $newUl = document.createElement("ul");
      addLi($newUl, data[k]).bind($newUl);
      $newLi.innerHTML = $newUl.outerHTML;
    } else {
      $newLi.innerHTML = data[k];
    }
    this.append($newLi);
  }
}

window.$l(() => {
  const children = window.$l(".restaurants").children();
  for (var i = 0; i < children.htmlEls.length; i++) {
    const el = children.htmlEls[i];
    const cb = Listeners.clickAlert.bind(el);
    window.$l(el).on("click", cb);
  }

  const $weather = window.$l(".weather");
  $weather.on("click", () => {
    $weather.empty();
    const data = APIUtils.test(addLi.bind($weather));
  });
});
