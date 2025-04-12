import { LanguageService } from "../services/language-service.js";
import { StorageService } from "../services/storage-service.js";

export class Element extends HTMLElement {
  context = this.getAttribute("context");
  static loaded = false;
  static #done;
  utils = {
    i18n: LanguageService.i18n,
    sanitize: (value) => (value || '').replace(/</g, '&lt;').replace(/>/g, '&gt;'),
  }

  constructor() {
    super();
    if (!Element.#done) {
      Element.#done = true;
      LanguageService.subscribe(() => {
        this.render();
        this.addEventListeners();
      })
    }
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
  addEventListeners() { }

  /**
   * Method to force the render template.
   * NOTE: Listeners will be destroyed and should be added again
   */
  render() {
    this.innerHTML = this.template(this.state, this.utils);
  }
}

if (!Element.loaded) {
  window.electronAPI.getLocale().then((result) => {
    const userLang = StorageService.loadApp("lang");
    if (!userLang)
      LanguageService.lang = result || "en";
  });
}

