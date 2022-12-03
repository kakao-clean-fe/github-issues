import {ERROR_TYPE, STATUS} from "./constants.js";

export function getIssueTpl({numOpened = 0, numClosed = 0, activeStatus, show}) {
  const isStatusOpen = activeStatus === STATUS.OPEN;
  const $parent = document.createElement('div')
  $parent.id = 'issue-wrapper'
  $parent.className = `w-9/12 m-auto min-w-min ${show ? '' : 'hidden'}`
  $parent.innerHTML = `
    <div id="header" class="flex justify-between">

      <div class="filter-menu w-2/3 px-3 py-1 flex base-outer items-center">
        <div class="filter p-3">Filters</div>
        <div class="p-1 w-full">
          <input type="text" class="w-full bg-slate-100 focus:outline-none" name="filter-text" id="filter-input"
              placeholder="keyword...">
        </div>
      </div>

      <nav class="flex items-center base-outer ml-4">
        <div id="label-count" class="p-3 border-r h-full flex items-center whitespace-nowrap">Labels</div>
        <div class="p-3">Milestones</div>
      </nav>

      <div class="new-issue p-3 py-1 base-outer flex items-center justify-center w-2/12 ml-4 bg-green-700 text-white">
        <a href="#">New
          issue</a></div>

    </div>
    <div id="issues-wrapper" class="m-auto  base-outer mt-6 bg-slate-100">
      <div class="issue-header h-16 flex justify-between items-center border-b">

        <div class="mr-3 d-none pl-4">
          <input type="checkbox">
        </div>

        <div class="statusTab flex">
          <div class="whitespace-nowrap open-count ${
    isStatusOpen ? "active font-bold" : ""
  } cursor-pointer">${numOpened} Opens</div>
          <div class="whitespace-nowrap close-count ${
    !isStatusOpen ? "active font-bold" : ""
  } ml-3 cursor-pointer">${numClosed} Closed</div>
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
      <div class="issue-list flex ml-auto">
        <ul></ul>
      </div>
    </div>
  `
  return $parent
}

export function getIssueItemTpl(item) {
  const $parent = document.createElement('li')
  $parent.innerHTML = `
          <div class="py-4">
              <input type="checkbox">
          </div>
          <div class="items-center ml-4">
              <div class="issue-title font-bold flex">
                  <div>${item.title}</div>
                  <div class='tags ml-4'>
                    ${item.tags.reduce(
    (html, {tagName, color}) => {
      return (
        `${html} <span class="rounded-lg border text-white p-1" style="background-color:${color}">${tagName}</span>`
      );
    }, ``)}
                  </div>
              </div>
              <div class="issue-description text-xs mt-2">
                ${item._id} ${item.status}ed ${item["open-date"]} ${item.milestones}
              </div>
          </div>
`
  return $parent;
}

export function getLabelTpl({numLabels = 0, show = false, isSearchResult, lastSearch=""}) {
  const $parent = document.createElement('div')
  $parent.id = 'label-wrapper'
  $parent.className = `w-9/12 m-auto min-w-min ${show ? '' : 'hidden'}`

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
  svg.setAttributeNS(null, "viewBox", "0 0 16 16")
  svg.setAttributeNS(null, "viewBox", "0 0 16 16")

  $parent.innerHTML = `
  <div id="header" class="flex justify-between">

    <div class="filter-menu w-2/3 px-3 py-1 flex base-outer items-center">
      <div class="p-1 w-full">
        <input type="text" class="w-full bg-slate-100 focus:outline-none" name="filter-text" id="filter-input" value="${lastSearch}"
          placeholder="search all filter...">
      </div>
    </div>

    <div class="new-label-button cursor-pointer p-1 py-1 base-outer flex items-center justify-center w-2/12 ml-4 bg-green-700 text-white">
      <a href="#">New label</a>
    </div>
  </div>
  
  ${isSearchResult ? `
  <div class="issues-reset-query-wrapper">
    <button class="issues-reset-query">
      <svg aria-hidden="true" viewBox="0 0 16 16" version="1.1" data-view-component="true" height="16" width="16" class="octicon octicon-x issues-reset-query-icon">
        <path fill-rule="evenodd" d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"></path>
      </svg>
      Clear current search
    </button>
  </div>
  ` : ""}
  
  <div id="labels-wrapper" class="m-auto  base-outer mt-6 bg-slate-100">
    <div class="label-header h-16 flex justify-between items-center border-b">

      <div class="mr-3 d-none pl-4">
        <div class="whitespace-nowrap open-count font-bold cursor-pointer">${numLabels} Labels</div>
      </div>

      <div class="details-list flex ml-auto">
        <details>
          <summary>Sort</summary>
        </details>
      </div>

    </div>
    <ul class="label-list ml-auto text-sm bg-white">

    </ul>
  </div>
  <button class="refresh-labels base-outer p-2 mt-2 float-right">update labels</button>
  `
  return $parent
}

export function getLabelItemTpl({id, name, color, description, count}, isEditing) {
  const $parent = document.createElement('li')
  $parent.className = "label-item ml-4 py-3 border-b"
  if (isEditing) {
    $parent.innerHTML = `
              <div class="label-item-contents flex items-center justify-between">
                <div class="issue-title flex"> 
                    <span class="rounded-lg border p-1 px-2" style="background-color:#${color}">${name}</span> 
                </div>
                <div class="label-editor pr-4 ">
                    <button class="delete-button">delete</button>
                </div>
              </div>
              
              <form id="label-item-form-${id}" class="p-3 mb-3 mt-6 border rounded-sm font-bold">
                <div id="label-input-wrapper-${id}" class="flex justify-between items-start mb-2">
            
                  <!--new label name-->
                  <dl
                    class="form-group my-2">
                    <dt class=" flex justify-between items-center">
                      <label for="label-name-input-${id}" class="f5">Label name</label>
                      <span class="text-sm " data-suffix="remaining" role="none" hidden="">
                        50 remaining
                      </span>
                    </dt>
                    <dd class="relative mt-2">
                      <text-expander keys=":" data-emoji-url="/autocomplete/emoji?use_colon_emoji=true">
                        <input type="text" data-maxlength="50" autocomplete="off" required="" pattern="^(?!(\.|\.\.)$).*$"
                          id="label-name-input-${id}" name="label[name]" 
                          ${name ? `value="${name}"` : ""}
                          class="w-full p-2 base-outer focus:outline-none" placeholder="Label name" value="" >
                      </text-expander>
                    </dd>
                    <dd class="" hidden="" id="label--name-error-${id}"></dd>
                  </dl>
                  <!--END new label name-->
            
                  <!--new label description-->
                  <dl
                    class="form-group my-2">
                    <dt class="flex justify-between items-center ">
                      <label for="label-description-input-${id}" class="f5">Description</label>
                      <span class="text-sm" data-suffix="remaining"
                        role="none" hidden="">
                        100 remaining
                      </span>
                    </dt>
                    <dd class="mt-2">
                      <input type="text" id="label-description-input-${id}" name="label[description]"
                        ${description ? `value="${description}"` : ""}
                        class="w-full p-2 base-outer focus:outline-none"
                        placeholder="Description" value="" 
                        maxlength="100">
                    </dd>
                    <dd class="" hidden="" id="label--description-error-${id}"></dd>
                  </dl>
                  <!--END new label description-->
            
                  <!--new label color-->
                  <dl class="form-group my-2">
                    <dt>
                      <label class="f5">Color</label>
                    </dt>
                    <dd class="mt-2 flex">
            
                      <button id="new-label-color-${id}" type="button"
                        data-view-component="true"
                        class="rounded-md border px-1 font-bold text-4xl"
                        aria-labelledby="tooltip-${id}"
                        style="background-color: #${color};">
                        ⟳
                      </button>
                      <tool-tip for="new-label-color-${id}" data-direction="s" data-type="label" data-view-component="true"
                        class="sr-only position-absolute" id="tooltip-${id}" aria-hidden="true" role="tooltip">Get
                        a new color</tool-tip>
                      <div class="ml-2">
                        <input type="text" id="label-color-value-${id}" name="label-color[description]"
                        class="w-full p-2 base-outer focus:outline-none"
                        value="#${color}"
                        placeholder="#color" value="" maxlength="100">
                      </div>
            
                    </dd>
                  </dl>
                  <!--END new label color-->
            
                  <!--new label actions-->
                  <div
                    class="form-group my-2 flex mt-10">
                    <button id="label-cancel-button-${id}" type="button" class="base-outer p-2 mr-4"> 
                      Cancel
                    </button>
                    <button id="label-save-button-${id}" type="submit" class="base-outer p-2 mr-4 bg-green-700 text-white" > 
                      Save Change
                    </button>
                  </div>
                  <!--END new label actions-->
            
                </div>              
              </form>
  `
  } else {
    $parent.innerHTML = `
              <div class="label-item-contents flex items-center justify-between">
                <div class="issue-title flex"> 
                    <span class="rounded-lg border p-1 px-2" style="background-color:#${color}">${name}</span> 
                </div>
                <div class="issue-description ">${description}</div>
                <div class="issue-description ">${count} issues </div>
                <div class="label-editor pr-4 ">
                    <button class="edit-button mx-2 ">edit</button>
                    <button class="delete-button">delete</button>
                </div>
              </div>              
  `
  }
  return $parent
}


export function getLabelFormTpl(
  {
    showNewLabel,
    randomColor,
    lastInputs = {}
  }
) {
  const {name, description, color} = lastInputs
  const initColor = color || randomColor
  const $parent = document.createElement('form')
  $parent.id = 'new-label-form'
  $parent.className = `${showNewLabel ? '' : 'hidden'} p-3 mb-3 mt-6 border rounded-sm font-bold`
  $parent.innerHTML = `
    <div class="form-group mt-0 mb-2"
      data-url-template="/labels/preview/" data-default-name="Label preview">

      <span 
      id="label-preview" 
      class="rounded-lg border p-2 px-3 mt-2 inline-block" 
      style="background-color: #${initColor};">
        Label preview
      </span>
    </div>

    <div id="label-input-wrapper" class="flex justify-between items-start mb-2">

      <!--new label name-->
      <dl
        class="form-group my-2">
        <dt class=" flex justify-between items-center">
          <label for="label-name-input" class="f5">Label name</label>
          <span class="text-sm " data-suffix="remaining" role="none" hidden="">
            50 remaining
          </span>
        </dt>
        <dd class="relative mt-2">
          <text-expander keys=":" data-emoji-url="/autocomplete/emoji?use_colon_emoji=true">
            <input type="text" data-maxlength="50" autocomplete="off" required="" pattern="^(?!(\.|\.\.)$).*$"
              id="label-name-input" name="label[name]" 
              ${name ? `value="${name}"` : ""}
              class="w-full p-2 base-outer focus:outline-none" placeholder="Label name" value="" >
          </text-expander>
        </dd>
        <dd class="" hidden="" id="label--name-error"></dd>
      </dl>
      <!--END new label name-->

      <!--new label description-->
      <dl
        class="form-group my-2">
        <dt class="flex justify-between items-center ">
          <label for="label-description-input" class="f5">Description</label>
          <span class="text-sm" data-suffix="remaining"
            role="none" hidden="">
            100 remaining
          </span>
        </dt>
        <dd class="mt-2">
          <input type="text" id="label-description-input" name="label[description]"
            ${description ? `value="${description}"` : ""}
            class="w-full p-2 base-outer focus:outline-none"
            placeholder="Description" value="" 
            maxlength="100">
        </dd>
        <dd class="" hidden="" id="label--description-error"></dd>
      </dl>
      <!--END new label description-->

      <!--new label color-->
      <dl class="form-group my-2">
        <dt>
          <label class="f5">Color</label>
        </dt>
        <dd class="mt-2 flex">

          <button id="new-label-color" type="button"
            data-view-component="true"
            class="rounded-md border px-1 font-bold text-4xl"
            aria-labelledby="tooltip"
            style="background-color: #${initColor};">
            ⟳
          </button>
          <tool-tip for="new-label-color" data-direction="s" data-type="label" data-view-component="true"
            class="sr-only position-absolute" id="tooltip" aria-hidden="true" role="tooltip">Get
            a new color</tool-tip>
          <div class="ml-2">
            <input type="text" id="label-color-value" name="label-color[description]"
            class="w-full p-2 base-outer focus:outline-none"
            value="#${initColor}"
            placeholder="#color" value="" maxlength="100">
          </div>

        </dd>
      </dl>
      <!--END new label color-->

      <!--new label actions-->
      <div
        class="form-group my-2 flex mt-10">
        <button id="label-cancel-button" type="button" class="base-outer p-2 mr-4"> 
          Cancel
        </button>
        <button 
          id="label-create-button" 
          type="submit" 
          class="base-outer p-2 mr-4 bg-green-700 ${name && description ? "" : "opacity-50"} text-white" 
          ${name && description ? "" : "disabled"}> 
          Create label
        </button>
      </div>
      <!--END new label actions-->

    </div>
  `

  return $parent
}


export const alertTpl = ({type , message = ""}) => {
  let color, title
  switch (type) {
    case ERROR_TYPE.ERROR:
      title = "Error!"
      color = "red"
      break
    case ERROR_TYPE.SUCCESS:
      title = "Success"
      color = "indigo"
      break
    case ERROR_TYPE.INFO:
      title = "Info"
      color = "orange"
      break
    case ERROR_TYPE.WARNING:
      title = "Warning!"
      color = "yellow"
      break
  }
  const $parent = document.createElement('div')
  $parent.className = `alert-message bg-${color}-100 border border-${color}-400 text-${color}-700 px-4 py-3 rounded relative opacity-90`
  $parent.role = "alert"
  $parent.innerHTML = `
    <strong class="font-bold">${title}</strong>
    <span class="block sm:inline">${message}</span>
  `
  return $parent
}


