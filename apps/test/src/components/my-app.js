import { StaticElement } from "../../../../framework/core/static-element.js";
import { MyModel } from "../../../../framework/models/my-model.js";

MyModel.set("name", "name", "panel1");
export class MyApp extends StaticElement {

    template() {
        return `
    <div class="container-fluid">
        <h1 class="mb-4">Simpl2U</h1>
        <my-form context="panel1"></my-form>
        <my-form context="panel2"></my-form>
        <div>${Date.now()}</div>
        <my-panel-info text="panel1" context="panel1"></my-panel-info>
        <my-panel-info text="panel2" context="panel2"></my-panel-info>
    </div>       
        `;
    }
}
customElements.define('my-app', MyApp);
