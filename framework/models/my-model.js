/*
export class MyModel {
    static #model = {};
    static get(id) {
        if (id && !MyModel.#model[id])
            MyModel.#model[id] = {};
        return id ? MyModel.#model[id] : MyModel.#model;
    }

    static set(value, id) {
        if (id) {
            MyModel.#model[id] = value;
        }
    }
}
*/

export class MyModel {
    static #model = {};
    static #last = '';
    static #subscribers = new Set(); // Store all subscriber functions
  
    static get(id) {
        MyModel.#last = JSON.stringify(MyModel.#model);
      if (id && !MyModel.#model[id]) {
        MyModel.#model[id] = {};
      }
      //MyModel.#notify();
      return id ? MyModel.#model[id] : MyModel.#model;
    }
  
    static set(value, id) {
        MyModel.#last = JSON.stringify(MyModel.#model);
      if (id) {
        MyModel.#model[id] = value;
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

    static parse(text) {
        Object.keys(MyModel.#model).forEach((key) => {
            text = text.split('$'+key).join(MyModel.#model[key] || "");
        });
        return text;
    }
  }
  