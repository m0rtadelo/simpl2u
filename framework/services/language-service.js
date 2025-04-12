import { StorageService } from "./storage-service.js";

export class LanguageService {
    static #lang = StorageService.loadApp(("lang")) || "en";
    static #subscribers = new Set(); // Store all subscriber functions
    static #languages = {};

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
        StorageService.saveApp("lang", this.#lang);
    }

    static set(languages) {
        LanguageService.#languages = languages;
    }

    static i18n(key) {
        return LanguageService.#languages?.[LanguageService.#lang]?.[key] || key;
    }
}
