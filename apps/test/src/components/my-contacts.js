import { StaticElement } from '../../../../framework/core/static-element.js';

export class MyContacts extends StaticElement {
  template() {
    return `
    <simpl-table></simpl-table>
        `;
  }
}
customElements.define('my-contacts', MyContacts);
