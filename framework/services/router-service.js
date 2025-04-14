export class RouterService {
  static #subscribers = new Set();
  static view = '';

  static {
    window.addEventListener('hashchange', () => {
      RouterService.view = (location.hash || '').slice(1);
      RouterService.#notify();
    });
  }

  static subscribe(callback) {
    RouterService.#subscribers.add(callback);
    callback(RouterService.view);
    return () => RouterService.#subscribers.delete(callback);
  }  

  static #notify() {
    for (const callback of RouterService.#subscribers) {
      callback(RouterService.view);
    }
  }
}