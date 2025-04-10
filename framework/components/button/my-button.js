export class MyButton extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `<button class="btn btn-primary">${this.getAttribute('title') || 'Click'}</button>`;
    }
}
customElements.define('my-button', MyButton);