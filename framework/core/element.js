export class Element extends HTMLElement {
  context = this.getAttribute("context");
  setEventListener(id, event, callback) {
    Promise.resolve().then(() => {
      const element = this.querySelector('#' + id);
      if (element) {
        element.removeEventListener(event, this.buttonBound);
        this.buttonBound = callback.bind(this);
        element.addEventListener(event, this.buttonBound);
      }
    });
  }

    // Must be implemented by subclasses
    template(state) {
      return '';
    }
  
    // Must be implemented by subclasses
    addEventListeners() {}
  
}