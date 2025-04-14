import { MyModel } from '../models/my-model.js';
import { LanguageService } from '../services/language-service.js';
import { RouterService } from '../services/router-service.js';
import { StorageService } from '../services/storage-service.js';

export class Element extends HTMLElement {
  context = this.getAttribute('context') || 'global';
  name = this.getAttribute('name');
  label = this.getAttribute('label') || this.name;
  required = this.hasAttribute('required');
  _items;

  static #done; 
  utils = {
    i18n: LanguageService.i18n,
    sanitize: (value) => (value || '').replace(/</g, '&lt;').replace(/>/g, '&gt;'),
  };

  constructor() {
    super();
    if (!Element.#done) {
      Element.#done = true;
      LanguageService.subscribe(() => {
        this.render();
        this.onReady();
      });
      window.electronAPI.getLocale().then((result) => {
        const userLang = StorageService.loadApp('lang');
        if (!userLang)
          LanguageService.lang = result || 'en';
      });
      RouterService.subscribe(() => {
        this.render();
        this.onReady();
      });
    }
  }

  get items() {
    return this._items;
  }

  set items(value) {
    this._items = value;
    this.render();
    this.onReady();
  }

  /**
   * Helper to add listeners to html elements
   * @param {*} id of the html element
   * @param {*} event type ('click', 'input'...)
   * @param {*} callback function to execute in event (avoid arrow functions)
   */
  setEventListener(id, event, callback) {
    const element = this.querySelector('#' + id);
    if (element) {
      element.removeEventListener(event, this.buttonBound);
      this.buttonBound = callback.bind(this);
      element.addEventListener(event, this.buttonBound);
    }
  }

  /**
   * Callback to update the template when state or languages changes
   * @param {*} state of the model in context
   * @param {*} utils with helpers (i18n, sanitize)
   * @returns the updated template
   */
  template(state, utils) {
    return '';
  }

  /**
   * Callback to add listeners when the template is ready.
   * Use setEventListener to add listeners
   */
  onReady() { }

  /**
   * Method to force the render template.
   * NOTE: Listeners will be destroyed and should be added again
   */
  render() {
    this.innerHTML = this.template(this.state, this.utils);

    // Example starter JavaScript for disabling form submissions if there are invalid fields
    (() => {
      'use strict';

      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      const forms = document.querySelectorAll('.needs-validation');

      // Loop over them and prevent submission
      Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }

          form.classList.add('was-validated');
        }, false);
      });
    })();    
  }

  get(id) {
    return document.getElementById(id);
  }

  /**
   * Getter to return the current model (enclosed in the current context)
   */
  get model() {
    return MyModel.get(undefined, this.context);
  }

  /**
   * Setter to set the new model (enclosed in the current context)
   */
  set model(value) {
    MyModel.set(value, undefined, this.context);
  }

  /**
   * Setter to set an item value in the model 
   * @param {*} id of the item (enclosed in the current context)
   * @param {*} value to set in the selected item
   */
  setModel(id, value) {
    MyModel.set(value, id, this.context);
  }
}
