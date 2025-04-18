import { StaticElement } from '../core/static-element.js';
import { MyModel } from '../models/my-model.js';
import { LanguageService } from '../services/language-service.js';
import { ModalService } from '../services/modal-service.js';
import { StorageService } from '../services/storage-service.js';

/**
 * @typedef {object} formDefinition
 * @property {string} name - The name of the field
 * @property {boolean} required - If the field is required
 * @property {boolean} disabled - If the field is disabled (readonly)
 * @property {string} class - The class of the field
 * @property {boolean} unique - If the field is unique and his value cannot be repeated
 * @property {boolean} index - If the field is index/key (new items will be created with last index + 1)  
 */
export class SimplCrud extends StaticElement {
  headers = [];
  form = [];

  constructor() {
    super();
    this.model = StorageService.loadApp(this.context) || {
      data: []
    };
    if (!this.model.data) {
      this.model.data = [];
    }
  }

  template() {
    return `
    <simpl-table id="simpl-table" actions="crud" name="${this.name}" context="${this.context}"></simpl-table>
    `;
  }

  onReady() {
    this.get('simpl-table')?.setHeaders(this.headers);
    this.get('simpl-table')?.subscribe(this.onAction.bind(this));
  }

  /**
   * 
   * @param {string} action 
   * @param {object} data 
   */
  onAction(action, data) {
    const map = {
      'create': async () => await this.doCreate(),
      'update': async (item) => await this.doEdit(item),
      'delete':  async (item) => await this.doDelete(item),
      'detail': (data) => {
        console.log('Read action');
        // Handle read action
      },
    };
    map?.[action]?.(data);
  }

  /**
   * Set the headers of the table
   * @param {string[]} headers 
   */
  setHeaders(headers) {
    this.headers = headers;
    this.refesh();
  }

  /**
   * Set the form definition
   * @param {FormDefinition[]} formDefinition 
   */
  setForm(formDefinition) {
    this.form = formDefinition;
  }

  async doCreate(keepData = false) {
    if (!keepData)
      MyModel.setContext('__simpl-modal', {});
    if (await ModalService.open(this.#generateForm())) {
      const modalData = MyModel.data()['__simpl-modal'];
      if (await this.#hasUnique(modalData, this.state.data)) {
        this.doCreate(true);
        return;
      }
      this.state.data = this.state.data || [];
      this.state.data.push(this.#addIndex(modalData));
      this.model = this.state;
      StorageService.saveApp(this.context, this.model);
    }
  }

  async doEdit(item) {
    const modified = JSON.parse(JSON.stringify(item));
    MyModel.setContext('__simpl-modal', modified);
    if (await ModalService.open(this.#generateForm())) {
      MyModel.setContext('__simpl-modal', item);
      Object.keys(item).forEach((key) => {
        MyModel.set(modified[key], key, '__simpl-modal');
      });
      StorageService.saveApp(this.context, this.model);
    }
  }

  async doDelete(item) {
    if (await ModalService.confirm('Do you want to delete this item?')) {
      const result = [];
      this.state.data.forEach((reg) => {
        if (reg !== item) {
          result.push(reg);
        } else {
          //item = undefined;
        }
      });
      this.state.data = result;
      this.model = this.state;
      console.log(result);
      StorageService.saveApp(this.context, this.model);
    }
  }

  async #hasUnique(data, items) {
    const uniqueFields = this.form.filter((field) => field.unique);
    for (const field of uniqueFields) {
      const existingItem = items?.find((item) => item[field.name] === data[field.name]);
      if (existingItem) {
        await ModalService.message(`The field ${LanguageService.i18n(field.name)} must be unique`, 'Error');
        return true;
      }
    }
    return false;
  }

  /**
   * Add index to the data
   * @param {object} data 
   * @returns {object}
   */
  #addIndex(data) {
    this.form.forEach((field) => {
      if (field.index) {
        const index = this.state.data.length ? Math.max(...this.state.data.map((item) => item[field.name])) + 1 : 0;
        data[field.name] = index;
      }
    });
    return data;
  }

  #generateForm() {
    const items = 
    JSON.parse(
      JSON.stringify(
        this.form.length ? this.form : this.get('simpl-table').getHeaders().map((header) => ({ name: header }))
      )
    );
    const fields = items.map((field) => {
      return `<my-input class="${field.class}" context="__simpl-modal" name="${field.name}" ${field.required ? 'required' : ''} ${field.hidden ? 'hidden' : ''} ${field.disabled ? 'disabled' : ''}></my-input>`;
    }).join('\n');
    return `<div class="row">${fields}</div>`;
  }
}
customElements.define('simpl-crud', SimplCrud);
