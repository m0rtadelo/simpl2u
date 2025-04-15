import { ReactiveElement } from '../core/reactive-element.js';

export class SimplTable extends ReactiveElement {

  constructor() {
    super();
    if (!this.model[this.name]) {
      this.setModel(this.name, []);
    }
  }

  template(state, u) {
    console.log(state[this.name]);
    return `
    <div class="card mt-4"><!--<div class="card-body">-->
<table class="table table-striped table-hover">
  <thead>
    <tr>
      ${this.#renderHeaders()}
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>John</td>
      <td>Doe</td>
      <td>@social</td>
    </tr>  
  </tbody>
</table>
</div><!--</div>-->
        `;
  }

  #getHeaders() {
    let headers = [];
    if (this.model[this.name].length) {
      const item = this.model[this.name][0];
      headers = Object.keys(item);
    }
    return headers;
  }

  #renderHeaders() {
    const headers = this.#getHeaders();
    return headers.map((header) => `<th>${header}</th>`).join('\n');
  }

  #renderTable() {

  }
}
customElements.define('simpl-table', SimplTable);
