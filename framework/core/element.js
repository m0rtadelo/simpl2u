import { LanguageService } from "../services/language-service.js";
import { StorageService } from "../services/storage-service.js";

export class Element extends HTMLElement {

  static loaded = false;
  static #done;
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
  context = this.getAttribute("context");
  setEventListener(id, event, callback) {
    Promise.resolve().then(() => {
      const element = this.querySelector('#' + id);
      if (element) {
        //const bound = callback.bind(this);
        element.removeEventListener(event, callback);
        element.addEventListener(event, callback);
      }
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

