export class BaseComponent {
  _element = null;

  constructor(htmlString) {
    this.setElement(htmlString);

    this.mounted();
  }

  mounted = () => {};

  setElement = (htmlString) => {
    const template = document.createElement('template');
    template.innerHTML = htmlString;

    this._element = template.content.firstElementChild;
  };

  attatchTo = (parent, position = 'afterbegin') => {
    parent.insertAdjacentElement(position, this._element);
    this.mounted(); // render 후에 mounted가 실행 된다.
  };
}
