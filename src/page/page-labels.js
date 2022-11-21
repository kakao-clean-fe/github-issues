import { getElement } from '../utils/element';
import Component from '../core/component';
import { LabelMaker } from '../components/LabelMaker';
import { LabelList } from '../components/LabelList';
import { labelStoreMixin } from '../core/mixin/labelStore';

export default class LabelPage extends Component {
  static getInstance(...args) {
    Object.assign(LabelPage.prototype, labelStoreMixin);

    return new LabelPage(...args);
  }

  onClickNewLabelButton () {
    this.setState({...this.state, isOpenLabelMakerLayer: !this.state.isOpenLabelMakerLayer})
  }

  onClickCancelButton () {
    this.setState({...this.state, isOpenLabelMakerLayer: false})
  }

  onClickCreateLabelButton () {
    const label = {
      name: this.labelState.labelName,
      color: this.labelState.color,
      description: this.labelState.description,
    };

    this.fetchAddLabel(label)
      .catch(({error: errorMessage}) => {
        alert(errorMessage);
      })
  }

  initState () {
    this.state = {
      isOpenLabelMakerLayer: false,
    }
  }

  created () {
    this.fetchLabels();
  }

  mounted() {
    const $labelWrapper = getElement('#label-wrapper');

    LabelMaker.getInstance($labelWrapper, {
      isOpenLabelMakerLayer: this.state.isOpenLabelMakerLayer,
      onClickNewLabelButton: () => this.onClickNewLabelButton(),
      onClickCancelButton: () => this.onClickCancelButton(),
      onClickCreateLabelButton: () => this.onClickCreateLabelButton(),
    }).render();

    LabelList.getInstance($labelWrapper).render();
  }

  get template () {
    return `<div id="label-wrapper" class="w-9/12 m-auto min-w-min"></div>`
  }
}

LabelPage.getInstance(getElement('#app')).render();