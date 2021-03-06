/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(1);
const Listeners = __webpack_require__(2);
const APIUtils = __webpack_require__(3);

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


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor(array = []) {
    this.htmlEls = array;
  }

  html(string) {
    if (string === undefined) {
      return this.htmlEls[0].innerHTML;
    } else {
      for (let i = 0; i < this.htmlEls.length; i++) {
        this.htmlEls[i].innerHTML = string;
      }
    }
  }

  empty() {
    this.html("");
  }

  append(obj) {
    if (typeof obj === typeof this) {
      for (let i = 0; i < this.htmlEls.length; i++) {
        const curr = this.htmlEls[i];
        for (let j = 0; j < obj.htmlEls.length; j++) {
          curr.innerHTML += obj.htmlEls[i].outerHTML;
        }
      }
    }

    else if (typeof obj === 'string') {
      for (let i = 0; i < this.htmlEls.length; i++) {
        this.htmlEls[i].innerHTML += obj;
      }
    }

    else if (typeof obj === HTMLElement) {
      for (let i = 0; i < this.htmlEls.length; i++) {
        this.htmlEls[i].innerHTML += obj.outerHTML;
      }
    }
  }

  attr(key, value) {
    if (value === undefined) {
      return this.htmlEls[0].getAttribute(key);
    }
    else {
      for (var i = 0; i < this.htmlEls.length; i++) {
        this.htmlEls[i].setAttribute(key, value);
      }
    }
  }

  addClass(className) {
    for (var i = 0; i < this.htmlEls.length; i++) {
      const currClass = this.htmlEls[i].getAttribute("class");
      if (currClass === undefined) {
        this.htmlEls[i].setAttribute("class", className);
      } else {
        this.htmlEls[i].setAttribute("class", `${currClass} ${className}`);
      }
    }
  }

  removeClass(className) {
    for (var i = 0; i < this.htmlEls.length; i++) {
      const currClass = this.htmlEls[i].getAttribute("class");
      if (currClass !== undefined) {
        let classes = currClass.split(" ");
        const index = classes.indexOf(className);
        classes.splice(index, 1);
        if (classes.length === 0) {
          this.htmlEls[i].removeAttribute("class");
        }
        else {
          this.htmlEls[i].setAttribute("class", classes.join(" "));
        }
      }
    }
  }

  children() {
    const children = new DOMNodeCollection();
    for (let i = 0; i < this.htmlEls.length; i++) {
      const arr = Array.from(this.htmlEls[i].children);
      children.htmlEls = children.htmlEls.concat(arr);
    }

    return children;
  }

  parent() {
    const parents = new DOMNodeCollection();
    for (let i = 0; i < this.htmlEls.length; i++) {
      const parent = this.htmlEls[i].parentElement;
      if (!parents.htmlEls.includes(parent)) {
        parents.htmlEls.push(parent);
      }
    }

    return parents;
  }

  find(string) {
    const DOMNodes = new DOMNodeCollection();
    for (let i = 0; i < this.htmlEls.length; i++) {
      const arr = Array.from(this.htmlEls[i].querySelectorAll(string));
      DOMNodes.htmlEls = DOMNodes.htmlEls.concat(arr);
    }

    return DOMNodes;
  }

  remove() {
    for (let i = 0; i < this.htmlEls.length; i++) {
      this.htmlEls[i].remove();
    }

    this.htmlEls = [];
  }

  on(type, ...args) {
    if (args.length > 1) {
      // TODO
    }
    else {
      for (let i = 0; i < this.htmlEls.length; i++) {
        const callback = args[0];
        this.htmlEls[i].addEventListener(type, callback);
      }
    }
  }

}

module.exports = DOMNodeCollection;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

const Listeners = {
  clickAlert: function() {
    alert(this.innerHTML);
  }
};

module.exports = Listeners;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

const APIUtils = {
  test: function(callback) {
    return window.$l.ajax({
      url: "http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=bcb83c4b54aee8418983c2aff3073b3b",
      method: 'GET',
      success(res) {
        console.log(res);
        callback(res);
      },
      error() {
        console.log("error");
      }
    });
  }
};

module.exports = APIUtils;


/***/ })
/******/ ]);