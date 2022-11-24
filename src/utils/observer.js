export class Observer {
  constructor() {
    this._observers = new Set();
  }
  subscribe(observer) {
    this._observers.add(observer);
  }
  notify() {
    this._observers.forEach((observer) => observer());
  }
}

export class LabelInput extends Observer {
  #name
  #description
  #color

  constructor(props) {
    super();
    const { name, description, color} = props;

    this.#name = name;
    this.#description = description;
    this.#color = color;
  }


  get name() {
    return this.#name;
  }

  get description() {
    return this.#description;
  }

  get color() {
    return this.#color;
  }

  set name(value) {
    this.#name = value;
    this.notify();
  }

  set description(value) {
    this.#description = value;
    this.notify();
  }

  set color(value) {
    this.#color = value;
    this.notify();
  }
}
