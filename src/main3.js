import { worker } from './mocks/browser';
import { getElement } from './utils/element';
import Component from './core/component';
import { LabelMaker } from './components/LabelMaker';
import { LabelList } from './components/LabelList';
import { labelStoreMixin } from './core/mixin/labelStore';

worker.start();

class Main extends Component {
  static getInstance(...args) {
    Object.assign(Main.prototype, labelStoreMixin);

    return new Main(...args);
  }

  onClickNewLabelButton () {
    this.setState({...this.state, isOpenLabelMakerLayer: !this.state.isOpenLabelMakerLayer})
  }

  onClickCancelButton () {
    this.setState({...this.state, isOpenLabelMakerLayer: false})
  }

  onClickCreateLabelButton () {
    const nextLabelList = [...this.labelState.labelList, {
      name: this.labelState.labelName,
      color: this.labelState.color,
      description: this.labelState.description,
    }]

    this.setLabelList(nextLabelList);
    this.clearInputField();
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

Main.getInstance(getElement('#app')).render();