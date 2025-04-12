import { StaticElement } from "../core/static-element.js";
import { MyModel } from "../models/my-model.js";

export class MyInput extends StaticElement {
  name = this.getAttribute("name");
  label = this.getAttribute("label") || this.name;

  template(state, u) {
    return `
      <label for="${this.name}" class="form-label col-12">${u.i18n(this.label)}</form>
      <input autofocus="true" id="${this.name}" class="form-control col-12" type="text" value="${MyModel.get(this.name, this.context) || ""}"></input>
    `;
  }

  addEventListeners() {
    this.setEventListener(this.name, 'input', this.change);
  }

  change(value) {
    MyModel.set(value.target.value, this.name, this.context);
  }
}
customElements.define('my-input', MyInput);
