import { StorageService } from './storage-service.js';
import { words as ca } from '../assets/i18n/ca.js';
import { words as en } from '../assets/i18n/en.js';
export class LanguageService {
  static #lang = StorageService.loadApp(('lang')) || 'en';
  static #subscribers = new Set(); // Store all subscriber functions
  static #languages = {};

  static {
    LanguageService.#languages = { ca, en };
    document.documentElement.setAttribute('lang', this.#lang);
  }

  static subscribe(callback) {
    LanguageService.#subscribers.add(callback);
    // Optional: Immediately send current value
    callback(LanguageService.lang);
    return () => LanguageService.#subscribers.delete(callback); // Return unsubscribe function
  }

  static #notify() {
    for (const callback of LanguageService.#subscribers) {
      callback(LanguageService.lang);
    }
  }

  static get lang() {
    return this.#lang;
  }

  static set lang(value) {
    const shortLang = value.substring(0, 2);
    if (shortLang !== this.#lang) {
      this.#lang = value.substring(0, 2);
      LanguageService.#notify();
    }
    StorageService.saveApp('lang', this.#lang);
    document.documentElement.setAttribute('lang', shortLang);
  }

  static set(languages) {
    Object.keys(languages).forEach((key) => {
      LanguageService.#languages[key] = { ...LanguageService.#languages[key], ...languages[key] };
    });
  }

  static i18n(key) {
    return LanguageService.#languages?.[LanguageService.#lang]?.[key] || key;
  }
}
