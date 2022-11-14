export default class Header{
  constructor(){
    this.template = `
      <div id="header" class="flex justify-between">
        <div class="filter-menu w-2/3 px-3 py-1 flex base-outer items-center">
          <form action="/" class="p-1 w-full">
            <input type="text" class="w-full bg-slate-100 focus:outline-none" name="filter-text" id="filter-input"
              placeholder="search all filter...">
          </form>
        </div>

        <div class="new-label-button cursor-pointer p-1 py-1 base-outer flex items-center justify-center w-2/12 ml-4 bg-green-700 text-white">
          <a href="#">New label</a>
        </div>
      </div>
    `;
  }
  getTemplate(){
    return this.template;
  }
}