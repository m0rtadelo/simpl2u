import { StaticElement } from '../../../../framework/core/static-element.js';
import { LanguageService } from '../../../../framework/services/language-service.js';
import { RouterService } from '../../../../framework/services/router-service.js';
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
    <div class="container-fluid">
      <div class="row">
        ${ v === 'form1' ? '<my-form context="form1"></my-form>' : '' }
        ${ v === 'form2' ? '<my-form context="form2"></my-form>' : '' }
        ${ v === 'services' ? '<my-services></my-services>' : '' }
        ${ v === 'crud' ? '<my-contacts></my-contacts>' : '' }
      </div>
    </div>       
        `;
  }
}
customElements.define('my-app', MyApp);
