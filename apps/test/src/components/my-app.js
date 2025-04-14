import { StaticElement } from '../../../../framework/core/static-element.js';
import { LanguageService } from '../../../../framework/services/language-service.js';
import { ModalService } from '../../../../framework/services/modal-service.js';
import { RouterService } from '../../../../framework/services/router-service.js';
import { ThemeService } from '../../../../framework/services/theme-service.js';
import { words as ca } from '../assets/i18n/ca.js';
import { words as en } from '../assets/i18n/en.js';

export class MyApp extends StaticElement {

  constructor() {
    super();
    LanguageService.set({ ca, en });
    RouterService.view = 'form1';
  }

  template() {
    const v = RouterService.view;
    return `
    <my-navbar></my-navbar>
    <div class="container">
      <div class="row">
        <div class="col-12 text-end">
          <my-button type="${LanguageService.lang === 'ca' ? 'primary' : 'secondary'}" id="lang_ca">ca</my-button>
          <my-button type="${LanguageService.lang === 'en' ? 'primary' : 'secondary'}" id="lang_en">en</my-button>
        </div>
        <div class="col-12 text-center">
          <h1 class="mb-4">Simpl2U</h1>
        </div>

        ${ v === 'form1' ? `
          <div class="col-12">
            <my-form context="panel1"></my-form>
          </div>
          ` : '' }

        ${ v === 'form2' ? `
        <div class="col-12">
          <my-form context="panel2"></my-form>
        </div>
        ` : '' }

        <div class="col-12">
          <my-panel-info text="panel1" context="panel1"></my-panel-info>
        </div>
        <div class="col-12">
          <my-button id="testModal">Test modal service</my-button>
        </div>
      </div>
      <my-button id="dark">Dark</my-button>
      <my-button id="light">Light</my-button>
    </div>       
        `;
  }

  addEventListeners() {
    this.setEventListener('testModal', 'click', this.testModalService);
    this.setEventListener('lang_ca', 'click', () => LanguageService.lang = 'ca');
    this.setEventListener('lang_en', 'click', () => LanguageService.lang = 'en');
    this.setEventListener('dark', 'click', () => ThemeService.theme = 'dark');
    this.setEventListener('light', 'click', () => ThemeService.theme = 'light');
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
