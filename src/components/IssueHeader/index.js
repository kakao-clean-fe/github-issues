import ComponentRefactor from '../../core/component_refactor';

export default class IssueHeader extends ComponentRefactor {
  static getInstance (...args) {
    return new IssueHeader(...args);
  }

  get template() {
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
  }
}