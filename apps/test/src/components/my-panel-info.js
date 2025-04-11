import { ReactiveElement } from "../../../../framework/components/reactive-element.js";

export class MyPanelInfo extends ReactiveElement {
  text = this.getAttribute('text');
    template(state) {
        return `
        <div>Name: ${state.name || ""}</div>
        <div>Surname: ${state.surname || ""}</div>
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