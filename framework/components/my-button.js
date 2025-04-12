export class MyButton extends HTMLElement {
    text = this.innerText;
    connectedCallback() {
      this.innerHTML = `<button class="btn btn-primary">${this.text || this.getAttribute('title') || 'Click'}</button>`;
    }
}
customElements.define('my-button', MyButton);