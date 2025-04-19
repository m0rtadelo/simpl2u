import { StaticElement } from '../core/static-element.js';

export class SimplButton extends StaticElement  {
  text = this.innerText;
  type = this.getAttribute('type') || 'primary';
  template(state, u) {
    return `<button class="btn btn-${this.type}">${u.i18n(this.text || this.getAttribute('title')) || 'Click'}</button>`;
  }
}
customElements.define('simpl-button', SimplButton);
