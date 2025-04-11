
MyModel.set("name", "name");
export class MyApp extends HTMLElement {
    connectedCallback() {
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
        <my-panel-info text="panel1"></my-panel-info>
        <my-panel-info text="panel2"></my-panel-info>
    </div>       
        `;
    }

    static sayHello() {
      alert(JSON.stringify(MyModel.get()));
    }

}
customElements.define('my-app', MyApp);
