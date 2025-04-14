import { ReactiveElement } from '../../../../framework/core/reactive-element.js';
import { RouterService } from '../../../../framework/services/router-service.js';
import { LanguageService } from '../../../../framework/services/language-service.js';
import { ThemeService } from '../../../../framework/services/theme-service.js';
export class MyNavBar extends ReactiveElement {
  
  template(state, u) {
    const v = RouterService.view;
    return `
    <nav class="navbar navbar-expand-md bg-body-tertiary">
      <div class="container-fluid">
        <span class="navbar-brand mb-0 h1">Simpl2u</span>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link ${ v === 'form1' ? 'active" aria-current="page"' : '"'}" href="#form1">Form 1</a>
            </li>
            <li class="nav-item">
              <a class="nav-link ${ v === 'form2' ? 'active" aria-current="page"' : '"'}" href="#form2">Form 2</a>
            </li>
            <li class="nav-item">
              <a class="nav-link ${ v === 'services' ? 'active" aria-current="page"' : '"'}"" href="#services">Services</a>
            </li>
            <li class="nav-item">
              <a class="nav-link ${ v === 'crud' ? 'active" aria-current="page"' : '"'}"" href="#crud">Contacts</a>
            </li>
          </ul>
          <ul class="navbar-nav ms-auto">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Lang
              </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item ${LanguageService.lang === 'en' ? 'active' : ''}" id="lang_en" href="#">English</a></li>
                <li><a class="dropdown-item ${LanguageService.lang === 'ca' ? 'active' : ''}" id="lang_ca" href="#">Català</a></li>
              </ul>
            </li>

          <li class="nav-item">
            <a class="nav-link" id="switchTheme" href="#"><span class="bi-highlights"></span></a>
          </li>
          </ul>
        </div>
      </div>
    </nav>    
    `;
  }

  addEventListeners() {
    this.setEventListener('lang_ca', 'click', () => LanguageService.lang = 'ca');
    this.setEventListener('lang_en', 'click', () => LanguageService.lang = 'en');
    this.setEventListener('switchTheme', 'click', ThemeService.switchTheme);
  }
}
customElements.define('my-navbar', MyNavBar);
