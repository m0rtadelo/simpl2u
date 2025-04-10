// framework/core/reactive-element.js
export class ReactiveElement extends HTMLElement {
  constructor() {
    super();
    this.state = MyModel.get();//{};
    this._prevTemplate = null;

    // Make state reactive
    this._reactiveState = new Proxy(this.state, {
      set: (target, prop, value) => {
        target[prop] = value;
        this.update();
        return true;
      }
    });
  }

  connectedCallback() {
    this.update();
  }

  setState(newState) {
    Object.assign(this._reactiveState, newState);
  }

  getState() {
    return this._reactiveState;
  }

  // Must be implemented in subclasses
  template(state) {
    return '';
  }

  update() {
    const templateHtml = this.template(this._reactiveState);
    const newTemplate = document.createElement('template');
    newTemplate.innerHTML = templateHtml;
    //this.innerHTML = templateHtml;
    this._diffAndPatch(this, newTemplate.content);
    //this.innerHTML = newTemplate.innerHTML;
  }

  _diffAndPatch(current, next) {
    const currentNodes = Array.from(current.childNodes);
    const nextNodes = Array.from(next.childNodes);

    for (let i = 0; i < nextNodes.length; i++) {
      const c = currentNodes[i];
      const n = nextNodes[i];

      if (!c) {
        current.appendChild(n.cloneNode(true));
        continue;
      }

      if (c.nodeType === Node.TEXT_NODE && n.nodeType === Node.TEXT_NODE) {
        if (c.textContent !== n.textContent) c.textContent = n.textContent;
      } else if (c.nodeName === n.nodeName) {
        // Patch attributes
        Array.from(n.attributes || []).forEach(attr => {
          if (c.getAttribute(attr.name) !== attr.value)
            c.setAttribute(attr.name, attr.value);
        });

        // Remove extra attributes
        Array.from(c.attributes || []).forEach(attr => {
          if (!n.hasAttribute(attr.name)) c.removeAttribute(attr.name);
        });

        // Recurse
        this._diffAndPatch(c, n);
      } else {
        current.replaceChild(n.cloneNode(true), c);
      }
    }

    for (let i = nextNodes.length; i < currentNodes.length; i++) {
      current.removeChild(currentNodes[i]);
    }
  }
}
