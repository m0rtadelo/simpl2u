import { ReactiveElement } from '../core/reactive-element.js';
import { LanguageService } from '../services/language-service.js';

export class SimplTable extends ReactiveElement {
  headers = [];
  actions = this.getAttribute('actions') || '';
  #subscribers = new Set();

  constructor() {
    super();
    if (!this.model[this.name]) {
      this.setModel(this.name, []);
    }
  }

  template(state, u) {
    return `
    <div class="card mt-4"><!--<div class="card-body">-->
<table class="table table-striped table-hover">
  <thead>
    <tr>
      ${this.renderHeaders()}
      ${this.actions ? this.addHeaderButtons() : ''}
    </tr>
  </thead>
  <tbody>
    ${this.renderTable()}
  </tbody>
</table>
</div><!--</div>-->
        `;
  }

  subscribe(callback) {
    this.#subscribers.add(callback);
    return () => this.#subscribers.delete(callback);
  }

  #notify(action, data) {
    for (const callback of this.#subscribers) {
      callback(action, data);
    }
  }

  onReady() {
    this.setEventListener('create', 'click', () => this.create());
    this.model[this.name].forEach((item, index) => {
      this.setEventListener('edit_' + index, 'click', () => this.edit(item));
      this.setEventListener('detail_' + index, 'click', () => this.detail(item));
      this.setEventListener('delete_' + index, 'click', () => this.delete(item));
    });
  }

  create() {
    this.#notify('create');
  }

  edit(item) {
    this.#notify('update', item);
  }

  detail(item) {
    this.#notify('detail', item);
  }

  delete(item) {
    this.#notify('delete', item);
  }

  addHeaderButtons() {
    return this.actions.includes('c') ? '<th class="text-end" style="width: 100px"><a href="#" id="create"><span  class="bi bi-plus-square me-2" title="Create"></span></a></th>' : '';
  }

  /**
   * Set the headers of the table
   * @param {string[]} headers 
   */
  setHeaders(headers) {
    console.log('setHeaders', headers);
    this.headers = headers;
    this.refesh();
  }

  getHeaders() {
    let headers = [];
    if (this.model[this.name].length) {
      const item = this.model[this.name][0];
      headers = Object.keys(item);
    }
    return this.headers?.length ? this.headers : headers;
  }

  renderHeaders() {
    const headers = this.getHeaders();
    return headers.map((header) => `<th>${LanguageService.i18n(header)}</th>`).join('\n');
  }

  renderTable() {
    const headers = this.getHeaders();
    let output = '';
    this.model[this.name].forEach((item, index) => {
      const searchable = headers.map((header) => `${item[header]}`).join('\t');
      if (searchable.toLowerCase().includes((this.model['filter'] || '')?.toLowerCase())) {
        output += '<tr>';
        output += headers.map((header) => `<td>${item[header]}</td>`).join('\n');
        output += this.actions ? '<td class="text-end" style="width: 100px">' : '';
        output += this.actions && this.actions.includes('r') ? `<a href="#" id="detail_${index}"><span  class="bi bi-eye me-2" title="Detail"></span></a>` : '';
        output += this.actions && this.actions.includes('u') ? `<a href="#" id="edit_${index}"><span  class="bi bi-pencil me-2" title="Edit"></span></a>` : '';
        output += this.actions && this.actions.includes('d') ? `<a href="#" id="delete_${index}"><span  class="bi bi-trash me-2" title="Delete"></span></a>` : '';
        output += this.actions ? '</td>' : '';
        output += '</tr>';
      }
    });
    return output || '<tr><td colspan="100%" class="text-center">No data</td></tr>';
  }
}
customElements.define('simpl-table', SimplTable);
