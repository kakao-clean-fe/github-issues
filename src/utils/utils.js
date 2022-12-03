export function getRandomColor() {
  return Math.floor(Math.random() * Math.pow(16, 6)).toString(16).padStart(6, '0');
}

export function storeLocalStorage(label) {
  localStorage.setItem('pendingLabel', JSON.stringify(label));
}

export const $ = function(identifier) {
  return document.getElementById(identifier.split('#')[1]);
}

export const toggleLabelCreateButton = function(enable) {
  if (enable) {
    $('#label-create-button').classList.remove('opacity-50');
    $('#label-create-button').disabled = false;
  }
  else {
    $('#label-create-button').classList.add('opacity-50');
    $('#label-create-button').disabled = true;
  }
}

export const setInput = function(identifier, value) {
  $(`#${identifier}`).value = value;
}
