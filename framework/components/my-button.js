import { StaticElement } from "../core/static-element.js";

export class MyButton extends StaticElement  {
    text = this.innerText;
    type = this.getAttribute("type") || 'primary';
    template(state, u) {
      return `<button class="btn btn-${this.type}">${u.i18n(this.text || this.getAttribute('title')) || 'Click'}</button>`;
    }
}
customElements.define('my-button', MyButton);