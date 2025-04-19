import { StaticElement } from '../core/static-element.js';
import { SimplModel } from '../models/simpl-model.js';

export class SimplInput extends StaticElement {
  template(state, u) {
    return `
    <div class="mb-3" ${this.hidden ? 'style="display:none"' : ''}>
      <label for="${this.name}" class="form-label col-12">${u.i18n(this.label)}${this.required ? ' <span style="color: var(--bs-form-invalid-color)">*</span>' : ''}</label>
      <input autofocus="true" id="${this.name}" ${this.#required()} ${this.disabled ? 'disabled' : ''} class="form-control col-12" type="text" value="${state[this.name] || ''}"></input>
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
    SimplModel.set(value.target.value, this.name, this.context);
  }

  focus() {
    document.querySelector('input#' + this.name).focus();
  }

  #required() {
    this.required && !(this.disabled || this.hidden) ? 'required' : '';
  }
}
customElements.define('simpl-input', SimplInput);
