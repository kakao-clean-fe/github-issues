import { STATUS } from "../type/issue"

export const issueTemplate = {
  wrapper: () => {
    return `
      <div id="issue-wrapper" class="w-9/12 m-auto min-w-min">
    `
  },
  header: () => {
    return `
    <div id="header" class="flex justify-between">

    <div class="filter-menu w-2/3 px-3 py-1 flex base-outer items-center">
      <div class="filter p-3">Filters</div>
      <form action="/" class="p-3 w-full">
        <input type="text" class="w-full bg-slate-100 focus:outline-none" name="filter-text" id="filter-input"
          placeholder="keyword...">
      </form>
    </div>

    <nav class="flex items-center base-outer ml-4">
      <div id="label-count" class="p-3 border-r h-full flex items-center whitespace-nowrap">Labels</div>
      <div class="p-3">Milestones</div>
    </nav>

    <div class="new-issue p-3 py-1 base-outer flex items-center justify-center w-2/12 ml-4 bg-green-700 text-white">
      <a href="#">New
        issue</a></div>
    </div>
    `
  },
  innerWrapper: ({selectedIssueStatus, openedIssueCount, closedIssueCount}) => {
    return `
    <div id="issues-wrapper" class="m-auto  base-outer mt-6 bg-slate-100">
    <div class="issue-header h-16 flex justify-between items-center border-b">

      <div class="mr-3 d-none pl-4">
        <input type="checkbox">
      </div>

      <div class="statusTab flex">
        <div class="whitespace-nowrap open-count ${selectedIssueStatus === STATUS.OPEN && 'font-bold'} cursor-pointer">${openedIssueCount} Opens</div>
        <div class="whitespace-nowrap close-count ${selectedIssueStatus === STATUS.CLOSE && 'font-bold'} ml-3 cursor-pointer">${closedIssueCount} Closed</div>
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
  },
  issueList: () => {
    return `
    <div class="issue-list flex ml-auto"></div>
    `
  },
  issueItem: (item) => {
    return `
    <li> 
      <div class="py-4">
          <input type="checkbox">
      </div>
      <div class="items-center ml-4">
          <div class="issue-title font-bold flex">
              <div>${item.title}</div>
              <div class='tags ml-4'>
                ${item.tags.reduce((html, { tagName, color }) => {
                  return `
                    ${html} <span class="rounded-lg border text-white p-1" style="background-color:${color}">${tagName}</span>
                  `;
                }, ``)}
              </div>
          </div>
          <div class="issue-description text-xs mt-2">
            ${item._id} ${item.status}ed ${item['open-date']} ${item.milestones}
          </div>
      </div>
    </li>`;
  }
}
