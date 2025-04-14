import { ReactiveElement } from "../core/reactive-element.js";

export class SimplTable extends ReactiveElement {
    template() {
        return `
<table>
</table>        
        `;
    }
}
customElements.define('simpl-table', SimplTable);