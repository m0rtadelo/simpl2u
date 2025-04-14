import { StaticElement } from '../../../../framework/core/static-element.js';
import { MyModel } from '../../../../framework/models/my-model.js';
import { ModalService } from '../../../../framework/services/modal-service.js';
import { StorageService } from '../../../../framework/services/storage-service.js';
export class MyForm extends StaticElement {

  constructor() {
    super();
    this.model = StorageService.loadApp(this.context) || {};
  }

  template() {
    return `
      <form id="form" class="needs-validation" novalidate>
        <div class="row align-items-end">
        <my-input class="col-12 col-md-6 col-lg-3" name="name" context="${this.context}"></my-input>
        <my-input class="col-12 col-md-6 col-lg-3" name="surname" context="${this.context}"></my-input>
        <my-input class="col-12 col-md-6 col-lg-3" name="birthday" context="${this.context}"></my-input>
        <my-input class="col-12 col-md-6 col-lg-3" name="company" context="${this.context}"></my-input>
        <my-input class="col-12 col-md-6 col-lg-3" name="nickname" context="${this.context}"></my-input>
        <div class="col-12 col-md-6 col-lg-3">
        <button class="btn btn-primary col-12" id="button" type="submit">Save model</button>
        </div></form>
        `;
  }
  addEventListeners() {
    this.setEventListener('form', 'submit', this.sayHello);
  }
  sayHello(event) {
    event.preventDefault();
    const form = document.getElementById('form');
    if(!form.checkValidity())
      return;
    StorageService.saveApp(this.context, this.model);
    console.log('Full data (all contexts)', MyModel.data());
    ModalService.message('<pre>' + JSON.stringify(this.model, null, 2) + '</pre>', 'saved-data');
    this.render();
  }
}
customElements.define('my-form', MyForm);
