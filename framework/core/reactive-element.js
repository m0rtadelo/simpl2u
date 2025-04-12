import { Element } from "./element.js";
import { MyModel } from "../models/my-model.js";
export class ReactiveElement extends Element {
  constructor() { 
    super();
    this.state = MyModel.get(undefined, this.context);
    this._reactiveState = new Proxy(this.state, {
      set: (target, prop, value) => {
        target[prop] = value;
        this.update();
        return true;
      }
    });
    MyModel.subscribe(model => {
      this.setState(model[this.context]);
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

/*
  setEventListener(id, event, callback) {
    Promise.resolve().then(() => {
      const element = this.querySelector('#' + id);
      if (element) {
        element.removeEventListener(event, this.buttonBound);
        this.buttonBound = callback.bind(this);
        element.addEventListener(event, this.buttonBound);
      }
    });
  }
*/
  update() {
    const templateHtml = this.template(this._reactiveState);

    // Use a <div> wrapper to safely parse and render content
    const container = document.createElement('div');
    container.innerHTML = templateHtml;

    // Replace entire inner content
    this.replaceChildren(...container.childNodes);

    // Force upgrade custom elements manually
    this.#upgradeCustomElements(this);

    // Add listeners
    this.addEventListeners();
  }

  #upgradeCustomElements(root) {
    for (const el of root.querySelectorAll('*')) {
      const tag = el.tagName.toLowerCase();
      if (tag.includes('-') && customElements.get(tag)) {
        customElements.upgrade(el);
      }
    }
  }
}
