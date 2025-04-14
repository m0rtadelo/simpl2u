import { StaticElement } from '../../../../framework/core/static-element.js';

export class MyContacts extends StaticElement {
  template() {
    return `
    <div class="input-group mt-4">
      <input type="text" id="search" autofocus="true" class="form-control" placeholder="Type to filter items" aria-label="Type to filter items" aria-describedby="button-addon2">
      <button class="btn btn-outline-secondary" type="button" id="button-addon2">Clear</button>
    </div>
    <simpl-table id="contacts" name="contacts" context="contacts"></simpl-table>
        `;
  }

  onReady() {
    setTimeout(() => {this.get('search').focus();}, 300);
  }
}
customElements.define('my-contacts', MyContacts);
