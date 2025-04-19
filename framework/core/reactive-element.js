import { Element } from './element.js';
import { SimplModel } from '../models/simpl-model.js';
export class ReactiveElement extends Element {

  constructor() { 
    super();
    this.state = SimplModel.get(undefined, this.context);
    this._reactiveState = new Proxy(this.state, {
      set: (target, prop, value) => {
        target[prop] = value;
        this.update();
        return true;
      }
    });
    SimplModel.subscribe(model => {
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

  update() {
    const templateHtml = this.template(this._reactiveState, this.utils);
    const container = document.createElement('div');
    container.innerHTML = templateHtml;
    this.replaceChildren(...container.childNodes);
    this.#upgradeCustomElements(this);
    this.onReady();
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
