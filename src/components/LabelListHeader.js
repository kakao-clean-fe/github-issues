export default class LabelListHeader{
  constructor(labelDataList){
    this.labelDataList = labelDataList;
    this.template = `
    <div class="label-header h-16 flex justify-between items-center border-b">
      <div class="mr-3 d-none pl-4">
        <div class="whitespace-nowrap open-count font-bold cursor-pointer">${this.labelDataList.length} Labels</div>
      </div>
      <div class="details-list flex ml-auto">
        <details>
          <summary>Sort</summary>
        </details>
      </div>
    </div>
    `
  }
  getTemplate(){
    return this.template;
  }
}