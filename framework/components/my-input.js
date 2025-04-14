import { StaticElement } from '../core/static-element.js';
import { MyModel } from '../models/my-model.js';

export class MyInput extends StaticElement {
  name = this.getAttribute('name');
  label = this.getAttribute('label') || this.name;
  required = this.hasAttribute('required');
  template(state, u) {
    return `
    <div class="mb-3">
      <label for="${this.name}" class="form-label col-12">${u.i18n(this.label)}${this.required ? ' <span style="color: var(--bs-form-invalid-color)">*</span>' : ''}</label>
      <input autofocus="true" id="${this.name}" ${this.required ? 'required' : ''} class="form-control col-12" type="text" value="${state[this.name] || ''}"></input>
      <!--<div class="invalid-feedback">
        ${u.i18n('field-required')}
      </div>
      <div class="valid-feedback">
      ${u.i18n('field-good')}
      </div>-->
    </div>
    `;
  }

  onReady() {
    this.setEventListener(this.name, 'input', this.change);
  }

  change(value) {
    MyModel.set(value.target.value, this.name, this.context);
  }
}
customElements.define('my-input', MyInput);
