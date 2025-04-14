import { StaticElement } from '../core/static-element.js';

export class SimplSelect extends StaticElement {
  name = this.getAttribute('name');
  label = this.getAttribute('label') || this.name;
  required = this.hasAttribute('required');
  items;

  constructor() {
    super();
    this.items = this.getAttribute('items') || [];
    if (typeof this.items === 'string') {
      this.items = JSON.parse(this.items);
    }
  }

  template(state, u) {
    return `
<div class="mb-3">
<label for="${this.name}" class="form-label col-12">${u.i18n(this.label)}${this.required ? ' <span style="color: var(--bs-form-invalid-color)">*</span>' : ''}</label>
<select class="form-select" ${this.required ? 'required' : ''} id="${this.name}" aria-label="${this.label}">
${ this.items.map(item => `
  <option value="${item.id}" ${state[this.name] === item.id ? 'selected' : ''}>${u.i18n(item.text)}</option>
`) }
</select>
</div>
    `;
  }

  addEventListeners() {
    this.setEventListener(this.name, 'change', this.change)
  }

  change(value) {
    this.setModel(this.name, value.target.value);
  }
}
customElements.define('simpl-select', SimplSelect);
