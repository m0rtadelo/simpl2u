//import { MyModel } from "../../models/my-model";

//import { MyModel } from "../../models/my-model.js";

export class MyInput extends HTMLElement {
    constructor() {
        super();
        //this.model = {};
    }
    connectedCallback() {
      const name = this.getAttribute("name");
      //const value = this.getAttribute("value");
      //console.log(value);   
      const label = this.getAttribute("label") || name;
      this.innerHTML = `
      <label for="${name}" class="form-label col-12">${label}</form>
      <input id="${name}" class="form-control col-12" type="text" value="${MyModel.get()[name] || ""}"></input>
      `;
      this.querySelector('input').addEventListener('input', (value) => {
        //this.model[name] = value.target.value;
        //MyModel.get()[name] = value.target.value;
        MyModel.set(value.target.value, name);
        //MyModel
      });      
    }
}
customElements.define('my-input', MyInput);

/* document.addEventListener("DOMContentLoaded", () => {
    const input = document.querySelector('my-input');
    if (input)
    input.model = MyRenderer.model;
});
 */