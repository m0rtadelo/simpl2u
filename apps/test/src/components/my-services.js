import { StaticElement } from '../../../../framework/core/static-element.js';
import { ModalService } from '../../../../framework/services/modal-service.js';

export class MyServices extends StaticElement {
  template() {
    return `
        <div class="col-12 p-4">
          <my-button id="testModal" class="d-grid">Test modal service</my-button>
        </div>    

<button type="button" class="btn btn-primary" id="liveToastBtn">Show live toast</button>

<div class="toast-container position-fixed bottom-0 end-0 p-3">
  <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="toast-header">
      <img src="..." class="rounded me-2" alt="...">
      <strong class="me-auto">Bootstrap</strong>
      <small>11 mins ago</small>
      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div class="toast-body">
      Hello, world! This is a toast message.
    </div>
  </div>
</div>        
    `;
  }

  async testModalService() {
    const response = await ModalService.confirm('modal.confirm');
    if (response) {
      const prompt = await ModalService.prompt('modal.prompt');
      if (prompt !== undefined)
        await ModalService.message(prompt);
    }
  }

  onReady() {
    this.setEventListener('testModal', 'click', this.testModalService);
  }
}
customElements.define('my-services', MyServices);
