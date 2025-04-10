import { MyPanel } from "../../../../framework/components/panel/my-panel.js";

export class MyPanelInfo extends MyPanel {
    template(state) {
        return `
        <div>Name: ${state.name || ""}</div>
        <div>Surname: ${state.surname || ""}</div>
        `
    }
}
customElements.define('my-panel-info', MyPanelInfo);