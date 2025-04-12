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
        <my-button id="lang_ca">ca</my-button>
        <my-button id="lang_en">en</my-button>
        <h1 class="mb-4">Simpl2U</h1>
        <my-form context="panel1"></my-form>

        <my-panel-info text="panel1" context="panel1"></my-panel-info>

        <div class="row"><my-button id="testModal">Test modal service</my-button></div>
    </div>       
        `;
  }

  addEventListeners() {
    console.log('ADdListenes');
    this.setEventListener('testModal', 'click', this.testModalService);
    this.setEventListener('lang_ca', 'click', () => LanguageService.lang = 'ca');
    this.setEventListener('lang_en', 'click', () => LanguageService.lang = 'en');
  }

  async testModalService() {
    console.log('Enter');
    const response = await ModalService.confirm('<b>Listen</b> Do you want to open a message? 🤗');
    if (response) {
      await ModalService.message('As you wish! 🤘');
    }
  }

}
customElements.define('my-app', MyApp);
