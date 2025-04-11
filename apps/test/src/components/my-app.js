import { StaticElement } from "../../../../framework/components/static-element.js";
import { MyModel } from "../../../../framework/models/my-model.js";

MyModel.set("name", "name");
export class MyApp extends StaticElement {
    modelKey = 'my-app';
    template(state) {
        return `
    <div class="container-fluid">
        <h1 class="mb-4">Simpl2U</h1>
        <div class="row align-items-end">
        <my-input class="col-12 col-md-6 col-lg-3" name="name"></my-input>
        <my-input class="col-12 col-md-6 col-lg-3" name="surname"></my-input>
        <my-input class="col-12 col-md-6 col-lg-3" name="birth"></my-input>
        <my-input class="col-12 col-md-6 col-lg-3" name="company"></my-input>
        <my-input class="col-12 col-md-6 col-lg-3" name="nickname"></my-input>
        <div class="col-12 col-md-6 col-lg-3">
        <button class="btn btn-primary col-12" id="button">Show model</button>
        </div>
        </div>
        <div>${Date.now()}</div>
        <my-panel-info text="panel1"></my-panel-info>
        <my-panel-info text="panel2"></my-panel-info>
    </div>       
        `;
    }

    addEventListeners() {
        this.setEventListener('button', 'click', this.sayHello);
    }
    sayHello() {
        console.log(MyModel.get());
        alert(JSON.stringify(MyModel.get()));
    }

}
customElements.define('my-app', MyApp);
