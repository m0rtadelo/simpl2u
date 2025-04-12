import { LanguageService } from "../services/language-service.js";
import { StorageService } from "../services/storage-service.js";

export class Element extends HTMLElement {

  context = this.getAttribute("context");
  static loaded = false;
  static #done;
  utils = {
    i18n: LanguageService.i18n,
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
  setEventListener(id, event, callback) {
    Promise.resolve().then(() => {
      const element = this.querySelector('#' + id);
      if (element) {
        element.removeEventListener(event, this.buttonBound);
        this.buttonBound = callback.bind(this);
        element.addEventListener(event, this.buttonBound);
      }
    });
  }

  // Must be implemented by subclasses
  template(state, utils) {
    return '';
  }

  // Must be implemented by subclasses
  addEventListeners() { }

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

