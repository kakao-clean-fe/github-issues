import { Label } from '../../types';
import { builder } from '../common/decorator';
import Store from './Store';

export interface ILabelCls {
  name: string;
  color: string;
  description: string;
  isEmpty: () => boolean;
  isFull: () => boolean;
  builder?: () => any;
}
@builder('name', 'color', 'description')
export class LabelCls implements ILabelCls {
  #name: string;
  #color: string;
  #description: string;
  static builder: any;
  constructor(props = { name: '', color: '', description: '' }) {
    const { name, color, description } = props;
    this.#name = name || '';
    this.#color = color || '';
    this.#description = description || '';
  }

  get name() {
    return this.#name;
  }
  get color() {
    return this.#color;
  }
  get description() {
    return this.#description;
  }
  isEmpty() {
    return this.#name === '' && this.#color === '' && this.#description === '';
  }
  isFull() {
    return this.#name !== '' && this.#color !== '' && this.#description !== '';
  }
}

// export class LabelBuilder {
//   #name: string;
//   #color: string;
//   #description: string;
//   constructor(label?: Label) {
//     if (label) {
//       this.#name = label.name;
//       this.#color = label.color;
//       this.#description = label.description;
//     } else {
//       this.#name = '';
//       this.#color = '';
//       this.#description = '';
//     }
//   }
//   setName(name: string) {
//     this.#name = name;
//     return this;
//   }
//   setColor(color: string) {
//     this.#color = color;
//     return this;
//   }
//   setDescription(description: string) {
//     this.#description = description;
//     return this;
//   }
//   build() {
//     return new LabelCls({
//       name: this.#name,
//       color: this.#color,
//       description: this.#description,
//     });
//   }
// }

const labelStore = Store({
  createHidden: true,
  labelList: [],
});

export { labelStore };
