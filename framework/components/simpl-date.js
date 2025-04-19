import { StaticElement } from "../core/static-element.js";
import { LanguageService } from "../services/language-service.js";

export class SimplDate extends StaticElement {
  template(state) {
    return `
<div ${this.hidden ? 'style="display:none"' : ''}>
<label for="${this.name}" class="form-label col-12">${LanguageService.i18n(this.label)}${this.required ? ' <span style="color: var(--bs-form-invalid-color)">*</span>' : ''}</label>
<input type="date" id="${this.name}" ${this.#required} name="${this.name}" ${this.disabled ? 'disabled' : ''} class="form-control" value="${state[this.name] || ''}" aria-label="${this.label || ''}">
</div>        
`;
  }

  onReady() {
    this.setEventListener(this.name, 'change', this.change);
  }

  change(value) {
    this.setModel(this.name, value.target.value);
  }

  #required() {
    return this.required && !(this.disabled || this.hidden) ? 'required' : '';
  }

}
customElements.define('simpl-date', SimplDate);