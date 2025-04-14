import { ReactiveElement } from '../core/reactive-element.js';

export class SimplTable extends ReactiveElement {
  template(state, u) {
    return `
    <div class="card mt-4"><!--<div class="card-body">-->
<table class="table table-striped table-hover">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>    
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
}
customElements.define('simpl-table', SimplTable);
