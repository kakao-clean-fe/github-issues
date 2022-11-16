import { STATUS } from '../../type/issue';
import ComponentRefactor from '../../core/component_refactor';

export default class IssueInnerHeader extends ComponentRefactor {
  static getInstance(...args) {
    return new IssueInnerHeader(...args);
  }

  created () {
    this.state = {
      isSelectedOpenedIssue: () => this.props.selectedIssueStatus === STATUS.OPEN,
      isSelectedClosedIssue: () => this.props.selectedIssueStatus === STATUS.CLOSE,
    }
  }

  get events () {
    return [{
      selector: '.open-count',
      event: 'click',
      callback: () => this.props.onChangeSelectedIssueStatus(STATUS.OPEN),
    },
    {
      selector: '.close-count',
      event: 'click',
      callback: () => this.props.onChangeSelectedIssueStatus(STATUS.CLOSE),
    }]
  }

  get template() {
    return  `<div id="issues-wrapper" class="m-auto  base-outer mt-6 bg-slate-100">
    <div class="issue-header h-16 flex justify-between items-center border-b">

      <div class="mr-3 d-none pl-4">
        <input type="checkbox">
      </div>

      <div class="statusTab flex">
        <div class="whitespace-nowrap open-count ${this.state.isSelectedOpenedIssue() && 'font-bold'} cursor-pointer">${this.props.openedIssueCount} Opens</div>
        <div class="whitespace-nowrap close-count ${this.state.isSelectedClosedIssue() && 'font-bold'} ml-3 cursor-pointer">${this.props.closedIssueCount} Closed</div>
      </div>

      <div class="details-list flex ml-auto">
        <details>
          <summary>Author</summary>
          <details-menu>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis, nemo similique. Aperiam
            exercitationem assumenda, sit deserunt nisi expedita rem harum officiis cumque? Voluptas perferendis in
            perspiciatis repellendus. Saepe, sapiente nisi?</details-menu>
        </details>
        <details>
          <summary>Label</summary>
        </details>
        <details>
          <summary>Projects</summary>
        </details>
        <details>
          <summary>Milestones</summary>
        </details>
        <details>
          <summary>Assignee</summary>
        </details>
        <details>
          <summary>Sort</summary>
        </details>
      </div>

    </div>
    `
  }
}
