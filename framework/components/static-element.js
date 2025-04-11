import { Element } from "./element.js";

export class StaticElement extends Element {
  constructor() {
    super();
    if (this.modelKey) {
      this.state = MyModel.get(this.modelKey);
    } else {
      this.state = MyModel.get();
    }
  }
  connectedCallback() {
    this.innerHTML = this.template(this.state);
    this.addEventListeners();
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
}