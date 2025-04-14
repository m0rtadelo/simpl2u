import { ReactiveElement } from '../../../../framework/core/reactive-element.js';

export class MyPanelInfo extends ReactiveElement {
  text = this.getAttribute('text');
  template(state, u) {
    return `
    <div class="card mt-4">
      <div class="card-body">
        <div><small>${u.i18n('name')}: ${u.sanitize(state.name || '')}</small></div>
        <div><small>${u.i18n('surname')}: ${u.sanitize(state.surname || '')}</small></div>
        <div><small>${u.i18n('birthday')}: ${u.sanitize(state.birthday || '')}</small></div>
        <div><small>${u.i18n('nickname')}: ${u.sanitize(state.nickname || '')}</small></div>
        <div><small>${u.i18n('company')}: ${u.sanitize(state.company || '')}</small></div>
      </div>
    </div>
        `;
  }
}
customElements.define('my-panel-info', MyPanelInfo);
