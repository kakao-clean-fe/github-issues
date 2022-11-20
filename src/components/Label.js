export default class Label {
  constructor({ name, description, color }) {
    this.name = name;
    this.description = description;
    this.color = color;
  }

  get() {
    return {
      name: this.name,
      description: this.description,
      color: this.color,
    };
  }
}
