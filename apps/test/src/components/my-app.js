import { StaticElement } from '../../../../framework/core/static-element.js';
import { MyModel } from '../../../../framework/models/my-model.js';
import { LanguageService } from '../../../../framework/services/language-service.js';
import { ModalService } from '../../../../framework/services/modal-service.js';
import { words as ca } from '../assets/i18n/ca.js';
import { words as en } from '../assets/i18n/en.js';

MyModel.set('name', 'name', 'panel1');
export class MyApp extends StaticElement {

  constructor() {
    super();
    LanguageService.set({ ca, en });
  }

  template() {
    return `
    <div class="container-fluid">
      <div class="row">
        <div class="col-12 text-end">
          <my-button type="${LanguageService.lang === 'ca' ? 'primary' : 'secondary'}" id="lang_ca">ca</my-button>
          <my-button type="${LanguageService.lang === 'en' ? 'primary' : 'secondary'}" id="lang_en">en</my-button>
        </div>
        <div class="col-12 text-center">
          <h1 class="mb-4">Simpl2U</h1>
        </div>
        <div class="col-12">
          <my-form context="panel1"></my-form>
        </div>
        <div class="col-12">
          <my-panel-info text="panel1" context="panel1"></my-panel-info>
        </div>
        <div class="col-12">
          <my-button id="testModal">Test modal service</my-button>
        </div>
      </div>
    </div>       
        `;
  }

  addEventListeners() {
    this.setEventListener('testModal', 'click', this.testModalService);
    this.setEventListener('lang_ca', 'click', () => LanguageService.lang = 'ca');
    this.setEventListener('lang_en', 'click', () => LanguageService.lang = 'en');
  }

  async testModalService() {
    const response = await ModalService.confirm('modal.confirm');
    if (response) {
      const prompt = await ModalService.prompt('modal.prompt');
      if (prompt !== undefined)
        await ModalService.message(prompt);
    }
  }

}
customElements.define('my-app', MyApp);
