import { StaticElement } from '../../../../framework/core/static-element.js';

export class MyContacts extends StaticElement {

  constructor() {
    super();
    this.context = 'contacts';
  }

  template() {
    return `
    <div class="input-group mt-4">
      <input type="text" id="search" name="filter" autofocus="true" class="form-control" value="${this.model['filter'] || ''}" placeholder="Type to filter items" aria-label="Type to filter items" aria-describedby="button-clear">
      <button class="btn btn-outline-secondary" type="button" id="button-clear">Clear</button>
    </div>
    <simpl-crud id="contacts" name="data" context="${this.context}"></simpl-crud>
    `;
  }

  onReady() {
    setTimeout(() => {this.get('search').focus();}, 300);
    this.setEventListener('search', 'input', this.setFilter);
    this.setEventListener('button-clear', 'click', this.clearFilter);
    this.get('contacts').setHeaders(['name', 'phone', 'email', 'twitter']);
    this.get('contacts').setForm([
      { name: 'id', disabled: true, hidden: true, unique: true, index: true },
      { name: 'name', required: true, class: 'col-12', unique: true },
      { name: 'address' },
      { name: 'phone', class: 'col-6' },
      { name: 'email', class: 'col-6' },
      { name: 'twitter', class: 'col-6'},
      { name: 'instagram', class: 'col-6'}
    ]);
  }

  setFilter() {
    this.setModel('filter', this.get('search').value);
  }

  clearFilter() {
    this.setModel('filter', '');
    this.get('search').value = '';
    setTimeout(() => {this.get('search').focus();}, 300);
  }
}
customElements.define('my-contacts', MyContacts);
