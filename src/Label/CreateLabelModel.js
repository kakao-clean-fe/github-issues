import { getLabelsData } from "../api";
import { Observable } from "../utils";

export default class CreateLabelModel extends ListLabelModel {
  constructor({name, color, description}) {
    super();
    this.name = name;
    this.color = color;
    this.description = description
  }
}