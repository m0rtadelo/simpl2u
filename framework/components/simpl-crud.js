import { StaticElement } from '../core/static-element.js';

export class SimplCrud extends StaticElement {

  template() {
    return `
    <simpl-table name="${this.name}" context="${this.context}"></simpl-table>
    `;
  }
}
customElements.define('simpl-crud', SimplCrud);
