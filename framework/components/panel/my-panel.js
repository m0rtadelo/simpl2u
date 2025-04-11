
import { ReactiveElement } from "../reactive-element.js";

export class MyPanel extends ReactiveElement {
    text = this.getAttribute('text');

    template(state) {
        return `
            Value: ${state.name}
        `;
    }
}

customElements.define('my-panel', MyPanel);