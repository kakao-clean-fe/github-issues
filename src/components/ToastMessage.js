import { Component } from './Component';
import { createToastMessageTemplate } from '../tpl';
import { storeKey, selector as sel } from '../constant';
import { go } from '../fp';
import { addClass, removeClass, setInnerText, setStyle } from '../curry/dom';

export class ToastMessage extends Component {
  constructor({ store, $root }) {
    super({ store, $root });
    this.timeoutID = null;
  }
  beforeMounted() {
    this.useToastState = () => this.store.useState(storeKey.toast);
    this.useToastEffect = onChange => this.store.useEffect(storeKey.toast, onChange)
    this.handleToastChange = this.handleToastChange.bind(this);
  }
  afterRender() {
    this.$toast = this.$root.querySelector(sel.toastContainer);
    this.$toastMessage = this.$toast.querySelector(sel.toastMessage);
    this.showToastMessage = () => go(this.$toast, removeClass('hidden'));
    this.hideToastMessage = () => go(this.$toast, addClass('hidden'));
    this.setToastDuration = (duration) => go(this.$toast, setStyle({ animationDuration: `${duration / 1000}s`}))
    this.setToastMessage = (message) => go(this.$toastMessage, setInnerText(message))
  }
  hydrate() {
    this.store.useEffect(storeKey.toast, this.handleToastChange);
  }
  getTemplate() {
    const [toast] = this.useToastState();
    const { type, message } = toast;
    return createToastMessageTemplate({ type, message });
  }

  handleToastChange (event) {
    const { isOpen } = event.detail;
    if (isOpen) {
      this.showToastForDuration(event);
    } else {
      this.render(createToastMessageTemplate(event.detail))
    }
  }
  showToastForDuration (event) {
    const { message, duration } = event.detail;
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
