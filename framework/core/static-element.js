import { Element } from "./element.js";
import { MyModel } from "../models/my-model.js";
export class StaticElement extends Element {
  constructor() {
    super();
    if (this.context) {
      this.state = MyModel.get(undefined, this.context);
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