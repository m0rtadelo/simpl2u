import { Element } from './element.js';
import { SimplModel } from '../models/simpl-model.js';
export class StaticElement extends Element {

  constructor() {
    super();
    this.state = SimplModel.get(undefined, this.context);
  }

  connectedCallback() {
    this.refesh();
  }
}
