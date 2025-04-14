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
        ${ v === 'form1' ? `
          <div class="col-12">
            <my-form context="form1"></my-form>
          </div>
          ` : '' }
        ${ v === 'form2' ? `
        <div class="col-12">
          <my-form context="form2"></my-form>
        </div>
        ` : '' }
        ${ v === 'services' ? `
        <div class="col-12">
          <my-button id="testModal" class="d-grid">Test modal service</my-button>
        </div>` : '' }
      </div>
    </div>       
        `;
  }

  addEventListeners() {
    this.setEventListener('testModal', 'click', this.testModalService);
    // this.setEventListener('lang_ca', 'click', () => LanguageService.lang = 'ca');
    // this.setEventListener('lang_en', 'click', () => LanguageService.lang = 'en');
    // this.setEventListener('dark', 'click', () => ThemeService.theme = 'dark');
    // this.setEventListener('light', 'click', () => ThemeService.theme = 'light');
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
