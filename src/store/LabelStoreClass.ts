import { Label } from '../../types';
import { builder } from '../common/decorator';
import Store from './Store';

export interface ILabelCls {
  name: string;
  color: string;
  description: string;
  isEmpty: () => boolean;
  isFull: () => boolean;
}
@builder('name', 'color', 'description')
export class LabelCls implements ILabelCls {
  #name: string;
  #color: string;
  #description: string;
  static builder: (props?: ILabelCls) => void;
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

const labelStore = Store({
  createHidden: true,
  labelList: [],
});

export { labelStore };
