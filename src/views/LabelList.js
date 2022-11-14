

export const LabelList = class {

  get event () {

  }

  get template () {

  }

  constructor ({labelName, labelColor, labelDesc, issueCount}) {
    this.labelName = labelName;
    this.labelColor = labelColor;
    this.labelDesc = labelDesc;
    this.issueCount = issueCount;
  }
}
