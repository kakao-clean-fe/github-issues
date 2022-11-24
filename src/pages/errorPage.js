// Components
import { BaseComponent } from '../components/component';

// Templates
import { getErrorTpl } from '../template/error';

export default class ErrorPage extends BaseComponent {
  constructor($container) {
    super(getErrorTpl());

    this.$container = $container;
  }

  initPage = () => {
    // 페이지 렌더링
    this.attatchTo(this.$container);
  };
}
