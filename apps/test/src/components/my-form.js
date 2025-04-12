import { StaticElement } from "../../../../framework/core/static-element.js";
import { MyModel } from "../../../../framework/models/my-model.js";
export class MyForm extends StaticElement {
    template(state) {
        return `
        <div class="row align-items-end">
        <my-input class="col-12 col-md-6 col-lg-3" name="name" label="${i18n("name")}" context="${this.context}"></my-input>
        <my-input class="col-12 col-md-6 col-lg-3" name="surname" label="${i18n("surname")}" context="${this.context}"></my-input>
        <my-input class="col-12 col-md-6 col-lg-3" name="birth" context="${this.context}"></my-input>
        <my-input class="col-12 col-md-6 col-lg-3" name="company" context="${this.context}"></my-input>
        <my-input class="col-12 col-md-6 col-lg-3" name="nickname" context="${this.context}"></my-input>
        <div class="col-12 col-md-6 col-lg-3">
        <button class="btn btn-primary col-12" id="button">Show model</button>
        </div>
        `;
    }
    addEventListeners() {
        this.setEventListener('button', 'click', this.sayHello);
    }
    sayHello() {
        console.log(MyModel.data());
        alert(JSON.stringify(MyModel.get(undefined, this.context)));
    }
}
customElements.define('my-form', MyForm);