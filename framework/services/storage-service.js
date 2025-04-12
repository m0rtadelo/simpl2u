export class StorageService {
    static #key = 'simpl2u';

    static loadApp(key) {
        const map = this.#getAppMap();
        return map[key];
    }

    static loadUser(key) {
        const map = this.#getUserMap();
        return map[key];
    }

    static saveApp(key, value) {
        const map = this.#getAppMap();
        map[key] = value;
        localStorage.setItem(this.#key, JSON.stringify(map));
    }

    static saveUser(key, value) {
        const map = this.#getUserMap();
        map[key] = value;
        sessionStorage.setItem(this.#key, JSON.stringify(map));
    }

    static #getAppMap() {
        return JSON.parse(localStorage.getItem(this.#key) || "{}");
    }

    static #getUserMap() {
        return JSON.parse(sessionStorage.getItem(this.#key) || "{}");
    }

}