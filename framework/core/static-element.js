import { Element } from './element.js';
import { MyModel } from '../models/my-model.js';
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
    this.render();
    this.onReady();
  }
}
