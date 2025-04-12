import { ReactiveElement } from "../../../../framework/core/reactive-element.js";

export class MyPanelInfo extends ReactiveElement {
  text = this.getAttribute('text');
    template(state) {
        return `
        <div>${i18n("name")}: ${state.name || ""}</div>
        <div>${i18n("surname")}: ${state.surname || ""}</div>
        <my-button id="myButton""></my-button>
        `
    }

    addEventListeners() {
      this.setEventListener('myButton', 'click', this.button);
    }
  
    button() {
        console.log('clicked!!');
        alert('clicked ' + this.text);
    }
}
customElements.define('my-panel-info', MyPanelInfo);