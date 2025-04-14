import { ReactiveElement } from '../../../../framework/core/reactive-element.js';
import { RouterService } from '../../../../framework/services/router-service.js';

export class MyNavBar extends ReactiveElement {
  
  template(state, u) {
    const v = RouterService.view;
    return `
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Simpl2u</a>
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
              <a class="nav-link" href="#pricing">Pricing</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Language
              </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li><a class="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>    
    `;
  }
}
customElements.define('my-navbar', MyNavBar);
