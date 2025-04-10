
MyModel.set("name", "name");
export class MyApp extends HTMLElement {
    connectedCallback() {
      //setInterval(() => {
        this.innerHTML = `
    <div class="container-fluid">
        <h1 class="mb-4">Simpl2U</h1>
        <div class="row align-items-end">
        <my-input class="col-12 col-md-6 col-lg-3" name="name"></my-input>
        <my-input class="col-12 col-md-6 col-lg-3" name="surname"></my-input>
        <my-input class="col-12 col-md-6 col-lg-3" name="birth"></my-input>
        <my-input class="col-12 col-md-6 col-lg-3" name="company"></my-input>
        <my-input class="col-12 col-md-6 col-lg-3" name="nickname"></my-input>
        <div class="col-12 col-md-6 col-lg-3">
        <button class="btn btn-primary col-12" onclick="MyApp.sayHello()">Show model</button>
        </div>
        </div>
        <div>${Date.now()}</div>
        <my-panel-info></my-panel-info>
    </div>       
        `;

      //}, 1000);
    }

    static sayHello() {
      alert(JSON.stringify(MyModel.get()));
    }

}
customElements.define('my-app', MyApp);

/*
// apps/my-app/my-app.js
import { ReactiveElement } from '../../../../framework/index.js';
//import { MyModel } from '../../../../framework/models/my-model.js';

export class MyApp extends ReactiveElement {
  constructor() {
    super();
    MyModel.get() = { count: 0, name: 'Alice' }; 
    this.setState(MyModel.get());

    setInterval(() => {
      this.setState({ count: this.getState().count + 1 });
    }, 1000);
  }

  template(state) {
    return `

    <div class="container text-center">
        <h1 class="mb-4">Simpl2U</h1>
        <my-input name="name"></my-input>
        <my-input name="surname"></my-input>
        <my-input name="birth"></my-input>
        <my-input name="company"></my-input>
        <my-input name="nickname"></my-input>${Date.now()}
      <button class="btn btn-primary" onclick="MyApp.sayHello()">Click Me</button>
    </div>      

      <div class="container">
        <h1>Hello, ${state.name}!</h1>
        <p>Count: ${state.count}</p>
        <input type="text" value="${state.name}" 
               oninput="MyApp.setState({ name: this.value })" />
      </div>
    `;
  }
}

customElements.define('my-app', MyApp);
*/