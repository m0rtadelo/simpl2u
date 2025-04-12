import { LanguageService } from "../services/language-service.js";
import { StorageService } from "../services/storage-service.js";

export class Element extends HTMLElement {

  context = this.getAttribute("context");
  static loaded = false;
  static #done;
  constructor() {
    super();
    this.context = this.getAttribute("context");
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
        element.addEventListener(event, this.buttonBound);      }
    });
  }

    // Must be implemented by subclasses
    template(state) {
      return '';
    }
  
    // Must be implemented by subclasses
    addEventListeners() {}
  
    render() {
      this.innerHTML = this.template(this.state);
    }
}

if(!Element.loaded) {
  window.electronAPI.getLocale().then((result) => {
    const userLang = StorageService.loadApp("lang");
    if (!userLang)
      LanguageService.lang = result || "en";
  });
}

