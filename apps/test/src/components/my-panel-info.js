import { MyPanel } from "../../../../framework/components/panel/my-panel.js";

export class MyPanelInfo extends MyPanel {
    template(state) {
        return `
        <div>Name: ${state.name || ""}</div>
        <div>Surname: ${state.surname || ""}</div>
        <my-button id="myButton""></my-button>
        `
    }

    button() {
        console.log('clicked!!');
        alert('clicked');
    }

    connectedCallback() {
        super.connectedCallback();
        Promise.resolve().then(() => {
          const btn = this.querySelector('#myButton');
          if (btn) {
            btn.removeEventListener('click', this.buttonBound);
            this.buttonBound = this.button.bind(this);
            btn.addEventListener('click', this.buttonBound);
          }
        });
      }    
}
customElements.define('my-panel-info', MyPanelInfo);