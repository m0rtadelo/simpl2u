
import { ReactiveElement } from "../reactive-element.js";

export class MyPanel extends ReactiveElement {
    text = this.getAttribute('text');
    constructor() {
        super();
        this.setState(MyModel.get());
        MyModel.subscribe(model => {
            this.setState(model);
        });
    }

    template(state) {
        return `
            Value: ${state.name}
        `;
    }
}

customElements.define('my-panel', MyPanel);