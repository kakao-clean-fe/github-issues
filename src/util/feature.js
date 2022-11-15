export const getRandom = (arr) => {
  return Math.floor(Math.random() * arr.length);
}

export const isHexColor = (value) => {
  return /^#[0-9A-F]{6}$/i.test(value);
}

export const isValid = (target) => target.validity.valid;
