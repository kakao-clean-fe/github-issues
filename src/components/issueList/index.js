import Component from '../../core/component';

export default class IssueList extends Component {
  static getInstance(...args) {
    return new IssueList(...args);
  }

  get template () {
    return `
    <div id="issue-list" class="issue-list flex ml-auto">
      <ul>
        ${this.props.issueList.map(item => {
          return `
          <li id="issue-item"> 
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
        </li>`
        }).join('')}
      </ul>
    </div>`
  }
}
