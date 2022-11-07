export class BaseComponent {
  constructor(htmlString) {
    const template = document.createElement('template');
    template.innerHTML = htmlString;

    // _를 통해 protected를 명시하며, 읽기 전용 속성으로 만든다.
    this._element = template.content.firstElementChild;
  }

  attatchTo(parent, position = 'afterbegin') {
    parent.insertAdjacentElement(position, this._element);
  }
}
