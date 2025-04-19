import { StaticElement } from '../core/static-element.js';
import { LanguageService } from '../services/language-service.js';

export class SimplButton extends StaticElement  {
  text = this.innerText;
  type = this.getAttribute('type') || 'primary';
  template(state) {
    return `<button class="btn btn-${this.type}">${LanguageService.i18n(this.text || this.getAttribute('title')) || 'Click'}</button>`;
  }
}
customElements.define('simpl-button', SimplButton);
