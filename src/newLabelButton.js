export default class NewLabelButton {
    constructor(isSelected) {
        this.isSelected = isSelected;
        this.$newLabelButton = document.querySelector(".new-label-button");
        this.$newLabelForm = document.getElementById("new-label-form");

        this.$newLabelButton.addEventListener("click", this.handleClick.bind(this));
    }

    handleClick(){
        this.isSelected = !this.isSelected;
        this.isSelected ? this.$newLabelForm.classList.remove("hidden") : this.$newLabelForm.classList.add("hidden")
    }
}