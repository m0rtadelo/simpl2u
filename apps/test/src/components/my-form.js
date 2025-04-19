import { StaticElement } from '../../../../framework/core/static-element.js';
import { SimplModel } from '../../../../framework/models/simpl-model.js';
import { ModalService } from '../../../../framework/services/modal-service.js';
import { StorageService } from '../../../../framework/services/storage-service.js';
export class MyForm extends StaticElement {

  constructor() {
    super();
    this.model = StorageService.loadApp(this.context) || {};
  }

  template() {
    return `
    <div class="container">
      <div class="col-12 text-center">
        <h1 class="mb-4 text-capitalize">${this.context}</h1>
      </div>
      <form id="form" class="needs-validation" novalidate>
        <div class="row">
          <div class="col-8">
            <div class="row">
              <simpl-input class="col-12 col-md-6 col-lg-3" required id="name" name="name" context="${this.context}"></simpl-input>
              <simpl-input class="col-12 col-md-6 col-lg-6" required name="surname" context="${this.context}"></simpl-input>
              <simpl-input class="col-12 col-md-6 col-lg-3" name="birthday" context="${this.context}"></simpl-input>
              <simpl-input class="col-12 col-md-6 col-lg-3" name="nickname" context="${this.context}"></simpl-input>
              <simpl-input class="col-12 col-md-12 col-lg-9" name="company" context="${this.context}"></simpl-input>
              <simpl-select id="sex" context="${this.context}" required name="sex" items='[{"id":"", "text":""},{"id": "male", "text": "Male"},{"id": "female", "text": "Female"}]'></simpl-select>
            </div>
          </div>
          <div class="col-4">
            <my-panel-info context="${this.context}"></my-panel-info>
          </div>
        </div>
        <div class="row align-items-center mt-md-4">
          <div class="col-12 col-md-6 col-lg-9 text-md-end form-text">
          <span style="color: var(--bs-form-invalid-color)">* </span><span>Camps obligatoris</span>
          </div>
          <div class="col-12 col-md-6 col-lg-3">
            <button class="btn btn-primary col-12" id="button" type="submit">Save model</button>
          </div>
        </form>
      </div>
        `;
  }

  onReady() {
    this.setEventListener('form', 'submit', this.save);
    //this.get('sex').items = [{id:'', text:''},{id: 'male', text: 'Male'},{id: 'female', 'text': 'Female'}];
    setTimeout(() => { this.get('name').focus(); },300);
  }

  save(event) {
    event.preventDefault();
    const form = this.get('form');
    if(!form.checkValidity())
      return;
    StorageService.saveApp(this.context, this.model);
    console.log('Full data (all contexts)', SimplModel.data());
    ModalService.message('<pre>' + JSON.stringify(this.model, null, 2) + '</pre>', 'saved-data');
  }
}
customElements.define('my-form', MyForm);
