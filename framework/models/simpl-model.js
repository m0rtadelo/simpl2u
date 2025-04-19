export class SimplModel {
  static #model = {};
  static #subscribers = new Set(); // Store all subscriber functions

  static #initContext(context) {
    if (context && !SimplModel.#model[context])
      SimplModel.#model[context] = {};
  }

  static data() {
    return SimplModel.#model;
  }

  static get(id, context = 'global') {
    this.#initContext(context);
    if (id && !SimplModel.#model[context][id]) {
      SimplModel.#model[context][id] = '';
    }
    return id ? SimplModel.#model[context][id] : SimplModel.#model[context];
  }

  static set(value, id, context = 'global') {
    this.#initContext(context);
    if (id) {
      SimplModel.#model[context][id] = value;
    } else {
      SimplModel.#model[context] = value;
    }
    SimplModel.#notify(); // Notify all subscribers
  }

  static setContext(context, data) {
    this.#initContext(context);
    SimplModel.#model[context] = data;
  }

  static subscribe(callback) {
    SimplModel.#subscribers.add(callback);
    // Optional: Immediately send current value
    callback(SimplModel.#model);
    return () => SimplModel.#subscribers.delete(callback); // Return unsubscribe function
  }

  static #notify() {
    // if (SimplModel.#last === JSON.stringify(SimplModel.#model))
    //     return;
    for (const callback of SimplModel.#subscribers) {
      callback(SimplModel.#model);
    }
  }
}
