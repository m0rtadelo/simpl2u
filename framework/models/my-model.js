export class MyModel {
  static #model = {};
  static #subscribers = new Set(); // Store all subscriber functions

  static #setContext(context) {
    if (context && !MyModel.#model[context])
      MyModel.#model[context] = {};
  }

  static data() {
    return MyModel.#model;
  }

  static get(id, context = 'global') {
    this.#setContext(context);
    //if (context && !MyModel.#model[context])
    //  MyModel.#model[context] = {};
    if (id && !MyModel.#model[context][id]) {
      MyModel.#model[context][id] = '';
    }
    //MyModel.#notify();
    return id ? MyModel.#model[context][id] : MyModel.#model[context];
  }

  static set(value, id, context = 'global') {
    this.#setContext(context);
    if (id) {
      MyModel.#model[context][id] = value;
    } else {
      MyModel.#model[context] = value;
    }
    MyModel.#notify(); // Notify all subscribers
  }

  static subscribe(callback) {
    MyModel.#subscribers.add(callback);
    // Optional: Immediately send current value
    callback(MyModel.#model);
    return () => MyModel.#subscribers.delete(callback); // Return unsubscribe function
  }

  static #notify() {
    // if (MyModel.#last === JSON.stringify(MyModel.#model))
    //     return;
    for (const callback of MyModel.#subscribers) {
      callback(MyModel.#model);
    }
  }
}
