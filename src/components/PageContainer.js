import { Component } from './Component';

export class PageContainer extends Component {
  constructor({ store, $root }) {
    super({ store, $root });
  }
  getTemplate() {
    return `
      <div class="page-cont"></div>
    `;
  }
}