import { ReactiveElement } from '../core/reactive-element.js';
import { LanguageService } from '../services/language-service.js';
import { TextService } from '../services/text-service.js';

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

  template(state) {
    return `
    <div class="card mt-4">
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
</div>
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
    let result = this.actions ? '<th class="text-end" style="width: 100px">' : '';
    result += this.actions.includes('c') ? `<a href="#" id="create"><span  class="bi bi-plus-square me-2" title="${LanguageService.i18n('create')}"></span></a>` : '';
    result += this.actions ? '</th>' : '';
    return result;
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
      const searchable = TextService.unaccent(headers.map((header) => `${item[header]}`).join('\t'));
      if (TextService.unaccent(searchable).includes((TextService.unaccent(this.model['filter'] || '')))) {
        output += '<tr>';
        output += headers.map((header) => `<td>${TextService.sanitize(item[header])}</td>`).join('\n');
        output += this.actions ? '<td class="text-end" style="width: 100px">' : '';
        output += this.actions && this.actions.includes('r') ? `<a href="#" id="detail_${index}"><span  class="bi bi-eye me-2" title="${LanguageService.i18n('detail')}"></span></a>` : '';
        output += this.actions && this.actions.includes('u') ? `<a href="#" id="edit_${index}"><span  class="bi bi-pencil me-2" title="${LanguageService.i18n('edit')}"></span></a>` : '';
        output += this.actions && this.actions.includes('d') ? `<a href="#" id="delete_${index}"><span  class="bi bi-trash me-2" title="${LanguageService.i18n('delete')}"></span></a>` : '';
        output += this.actions ? '</td>' : '';
        output += '</tr>';
      }
    });
    return output || `<tr><td colspan="100%" class="text-center">${LanguageService.i18n('no-data')}</td></tr>`;
  }
}
customElements.define('simpl-table', SimplTable);
