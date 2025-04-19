import { StaticElement } from '../core/static-element.js';
import { SimplModel } from '../models/simpl-model.js';
import { LanguageService } from '../services/language-service.js';
import { ModalService } from '../services/modal-service.js';
import { StorageService } from '../services/storage-service.js';

/**
 * @typedef {object} FormDefinition
 * @property {string} name - The name of the field.
 * @property {boolean} required - Indicates if the field is required.
 * @property {boolean} disabled - Indicates if the field is disabled (readonly).
 * @property {string} class - The CSS class of the field.
 * @property {boolean} unique - Indicates if the field must have a unique value.
 * @property {boolean} index - Indicates if the field is an index/key (new items will be created with the last index + 1).
 * @property {string} type - The type of the field (e.g., 'input', 'date').
 */

/**
 * SimplCrud is a custom web component that provides CRUD (Create, Read, Update, Delete) functionality.
 */
export class SimplCrud extends StaticElement {
  actions = this.getAttribute('actions') || 'crud';
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

  /**
   * Generates the HTML template for the component.
   * 
   * @returns {string} The HTML template string.
   */
  template() {
    return `
    <simpl-table id="simpl-table" actions="${this.actions}" name="${this.name || 'data'}" context="${this.context}"></simpl-table>
    `;
  }

  /**
   * Called when the component is ready. Sets up the table headers and subscribes to actions.
   */
  onReady() {
    this.get('simpl-table')?.setHeaders(this.headers);
    this.get('simpl-table')?.subscribe(this.onAction.bind(this));
  }

  /**
   * Handles actions triggered by the table.
   * 
   * @param {string} action - The action to perform (e.g., 'create', 'update', 'delete', 'detail').
   * @param {object} data - The data associated with the action.
   */
  onAction(action, data) {
    const map = {
      'create': async () => await this.doCreate(),
      'update': async (item) => await this.doEdit(item),
      'delete': async (item) => await this.doDelete(item),
      'detail': async (item) => await this.doDetail(item),
    };
    map?.[action]?.(data);
  }

  /**
   * Sets the headers of the table.
   * 
   * @param {string[]} headers - An array of header names.
   */
  setHeaders(headers) {
    this.headers = headers;
    this.refesh();
  }

  /**
   * Sets the form definition for the component.
   * 
   * @param {FormDefinition[]} formDefinition - An array of form field definitions.
   */
  setForm(formDefinition) {
    this.form = formDefinition;
  }

  /**
   * Handles the creation of a new item.
   * 
   * @param {boolean} [keepData=false] - Whether to keep the existing modal data.
   */
  async doCreate(keepData = false) {
    if (!keepData)
      SimplModel.setContext('__simpl-modal', {});
    if (await ModalService.open(this.#generateForm(), 'new-record' )) {
      const modalData = SimplModel.data()['__simpl-modal'];
      if (await this.#hasUnique(modalData, this.state.data)) {
        this.doCreate(true);
        return;
      }
      this.state.data = this.state.data || [];
      this.state.data.push(this.#addIndex(modalData));
      this.model = this.state;
      this.#saveData();
    }
  }

  /**
   * Handles the editing of an existing item.
   * 
   * @param {object} item - The item to edit.
   */
  async doEdit(item) {
    const modified = JSON.parse(JSON.stringify(item));
    SimplModel.setContext('__simpl-modal', modified);
    if (await ModalService.open(this.#generateForm(), 'edit-record')) {
      SimplModel.setContext('__simpl-modal', item);
      Object.keys(modified).forEach((key) => {
        SimplModel.set(modified[key], key, '__simpl-modal');
      });
      this.#saveData();
    }
  }

  /**
   * Displays the details of an item in a readonly modal.
   * 
   * @param {object} item - The item to display.
   */
  async doDetail(item) {
    SimplModel.setContext('__simpl-modal', item);
    await ModalService.open(this.#generateForm(true), 'detail-record', true)
  }

  /**
   * Handles the deletion of an item.
   * 
   * @param {object} item - The item to delete.
   */
  async doDelete(item) {
    if (await ModalService.confirm('delete-record-confirm', 'delete-record')) {
      const result = [];
      this.state.data.forEach((reg) => {
        if (reg !== item) {
          result.push(reg);
        }
      });
      this.state.data = result;
      this.model = this.state;
      this.#saveData();
    }
  }

  /**
   * Saves the current state of the data to storage.
   * 
   * @private
   */
  #saveData() {
    const copy = {...this.model};
    delete copy.filter;
    StorageService.saveApp(this.context, copy);
  }

  /**
   * Checks if the data contains unique fields that violate uniqueness constraints.
   * 
   * @private
   * @param {object} data - The data to check.
   * @param {object[]} items - The existing items to compare against.
   * @returns {Promise<boolean>} True if a uniqueness violation is found, otherwise false.
   */
  async #hasUnique(data, items) {
    const uniqueFields = this.form.filter((field) => field.unique);
    for (const field of uniqueFields) {
      const existingItem = items?.find((item) => !!item[field.name] && item[field.name] === data[field.name]);
      if (existingItem) {
        await ModalService.message(LanguageService.i18n('error-unique', { field: LanguageService.i18n(field.name) }), 'Error');
        return true;
      }
    }
    return false;
  }

  /**
   * Adds an index to the data based on the form definition.
   * 
   * @private
   * @param {object} data - The data to modify.
   * @returns {object} The modified data with an index added.
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

  /**
   * Generates the form HTML based on the form definition.
   * 
   * @private
   * @param {boolean} [readonly=false] - Whether the form should be readonly.
   * @returns {string} The generated form HTML.
   */
  #generateForm(readonly = false) {
    const items = 
    JSON.parse(
      JSON.stringify(
        this.form.length ? this.form : this.get('simpl-table').getHeaders().map((header) => ({ name: header }))
      )
    );
    const fields = items.map((field) => {
      const type = field.type || 'input';
      return `<simpl-${type} class="${field.class}" context="__simpl-modal" ${field.required  && !(field.disabled || readonly) ? 'required' : ''} name="${field.name}" ${field.hidden ? 'hidden' : ''} ${field.disabled || readonly ? 'disabled' : ''}></simpl-${type}>`;
    }).join('\n');
    return `<div class="row">${fields}</div>`;
  }
}
customElements.define('simpl-crud', SimplCrud);
