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
