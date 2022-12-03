import { Component } from './Component';
import { createToastMessageTemplate } from '../components/Templates';
import { selector as sel } from '../constant';
import { go } from '../fp';
import { addClass, removeClass, setInnerText, setStyle } from '../curry/dom';

export class ToastMessage extends Component {
  constructor({ store, $root }) {
    super({ store, $root });
    this.timeoutID = null;
  }
  beforeMounted() {
    this.handleToastChange = this.handleToastChange.bind(this);
  }
  afterRender() {
    this.$toast = this.$root.querySelector(sel.toastBox);
    this.$toastMessage = this.$toast.querySelector(sel.toastMessage);
    this.showToastMessage = () => go(this.$toast, removeClass('hidden'));
    this.hideToastMessage = () => go(this.$toast, addClass('hidden'));
    this.setToastDuration = (duration) => go(this.$toast, setStyle({ animationDuration: `${duration / 1000}s`}))
    this.setToastMessage = (message) => go(this.$toastMessage, setInnerText(message))
  }
  hydrate() {
    this.store.addActionListener(this.handleToastChange, acts => [acts.showToastMessage, acts.hideToastMessage])
  }
  getTemplate() {
    const toast = this.store.getState(state => state.toast);
    return createToastMessageTemplate({ message: toast.message });
  }

  handleToastChange (state) {
    const { isOpen } = state.toast;
    if (isOpen) {
      this.showToastForDuration(state.toast);
    } else {
      this.render(createToastMessageTemplate(event.detail))
    }
  }
  showToastForDuration (toast) {
    const { message, duration } = toast;
    if (this.timeoutID) {
      this.hideToastMessage();
    }
    this.setToastDuration(duration);
    this.showToastMessage();
    this.setToastMessage(message);
    this.timeoutID = setTimeout(() => {
      this.hideToastMessage();
      this.timeoutID = null;
    }, duration);
  }
}
