export class RouterService {
  static #subscribers = new Set();
  static view = '';

  static {
    window.addEventListener('hashchange', () => {
      const newHash = (location.hash || '').slice(1);
      if (newHash) {
        RouterService.view = newHash;
        RouterService.#notify();
      }
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
