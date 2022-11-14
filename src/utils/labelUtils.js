const uselabelBtn = () => {
  const createLabelBtn = app.querySelector("#label-create-button");
  createLabelBtn.disabled = false;
  createLabelBtn.classList.remove("opacity-50");
};

const checkInput = () => {
  let cond = true;
  document.querySelectorAll("dl.form-group.my-2 input").forEach((target) => {
    cond = cond && !!target.value;
  });
  return cond;
};

const rancomColor = () => Math.floor(Math.random() * 16777215).toString(16);

export { uselabelBtn, checkInput, rancomColor };
