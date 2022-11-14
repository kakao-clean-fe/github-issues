import { getElement } from './utils/element';
import ComponentRefactor from './core/component_refactor';
import { request } from './utils/api';
import { LabelMaker } from './components/LabelMaker';
import { LabelList } from './components/LabelList';

class Main extends ComponentRefactor {
  clearInputField () {
    this.setState({...this.state, 
      labelName: '',
      color: '',
      description: '',
    })
  }

  onClickNewLabelButton () {
    this.setState({...this.state, isOpenLabelMakerLayer: !this.state.isOpenLabelMakerLayer})
  }

  onClickCancelButton () {
    this.setState({...this.state, isOpenLabelMakerLayer: false})
  }

  onChangeLabelName (event) {
    // TODO wes: change 이벤트 실행 후 focus 로직 추가 필요
    this.setState({...this.state, labelName: event.target.value});
  }

  onChangeDescription (event) {
    this.setState({...this.state, description: event.target.value});
  }

  onChangeColor (event) {
    this.setState({...this.state, color: event.target.value});
  }

  onClickChangeColorButton () {
    const randomHexColor = Math.floor(Math.random() * 16777215).toString(16);

    this.setState({...this.state, color: `#${randomHexColor}`});
  }

  onClickCreateLabelButton () {
    const nextLabelList = [...this.state.labelList, {
      name: this.state.labelName,
      color: this.state.color,
      description: this.state.description,
    }]

    this.setState({...this.state, labelList: nextLabelList});
    this.clearInputField();
  }

  initState () {
    this.state = {
      labelList: [],
      labelName: '',
      description: '',
      color: '',
      isOpenLabelMakerLayer: false,
    }
  }

  created () {
    request('/data-sources/labels.json')
      .then(data => {
        this.setState({...this.state, labelList: data});
      })
  }

  mounted() {
    const $labelWrapper = getElement('#label-wrapper');

    // TODO wes: 스토어 추가 필요
    LabelMaker.getInstance($labelWrapper, {
      labelName: this.state.labelName,
      description: this.state.description,
      color: this.state.color,
      isOpenLabelMakerLayer: this.state.isOpenLabelMakerLayer,
      onClickNewLabelButton: () => this.onClickNewLabelButton(),
      onClickCancelButton: () => this.onClickCancelButton(),
      onChangeLabelName: (event) => this.onChangeLabelName(event),
      onChangeDescription: (event) => this.onChangeDescription(event),
      onChangeColor: (event) => this.onChangeColor(event),
      onClickChangeColorButton: () => this.onClickChangeColorButton(),
      onClickCreateLabelButton: () => this.onClickCreateLabelButton(),
    }).render();

    LabelList.getInstance($labelWrapper, {
      labelList: this.state.labelList,
    }).render();
  }

  get template () {
    return `<div id="label-wrapper" class="w-9/12 m-auto min-w-min"></div>`
  }
}

new Main(getElement('#app')).render();