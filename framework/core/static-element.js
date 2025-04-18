import { Element } from './element.js';
import { MyModel } from '../models/my-model.js';
export class StaticElement extends Element {

  constructor() {
    super();
    this.state = MyModel.get(undefined, this.context);
  }

  connectedCallback() {
    this.refesh();
  }
}
