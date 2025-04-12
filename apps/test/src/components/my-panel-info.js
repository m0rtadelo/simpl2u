import { ReactiveElement } from '../../../../framework/core/reactive-element.js';

export class MyPanelInfo extends ReactiveElement {
  text = this.getAttribute('text');
  template(state, u) {
    return `
        <div>${u.i18n('name')}: ${u.sanitize(state.name || '')}</div>
        <div>${u.i18n('surname')}: ${u.sanitize(state.surname || '')}</div>
        <my-button id="myButton""></my-button>
        `;
  }

  addEventListeners() {
    this.setEventListener('myButton', 'click', this.button);
  }

  button() {
    alert('clicked ' + this.text);
  }
}
customElements.define('my-panel-info', MyPanelInfo);
