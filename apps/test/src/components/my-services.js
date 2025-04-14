import { StaticElement } from '../../../../framework/core/static-element.js';
import { ModalService } from '../../../../framework/services/modal-service.js';

export class MyServices extends StaticElement {
  template() {
    return `
        <div class="col-12 p-4">
          <my-button id="testModal" class="d-grid">Test modal service</my-button>
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
