import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
formEl.addEventListener('input', throttle(onFormInput, 500));
formEl.addEventListener('submit', onFormSubmit);

populateForm();

function onFormInput(e) {
  const data = loadFromLS('feedback-form-state') || {};
  const nameEl = e.target.name;
  data[nameEl] = e.target.value;
  saveToLS('feedback-form-state', data);
}

function onFormSubmit(e) {
  e.preventDefault();
  const data = loadFromLS('feedback-form-state') || {};
  console.log(data);
  localStorage.removeItem('feedback-form-state');
  e.target.reset();
}

function populateForm() {
  const data = loadFromLS('feedback-form-state') || {};
  for (let key of Object.keys(data)) {
    formEl.elements[key].value = data[key];
  }
}

function saveToLS(key, value) {
  const jsonFormat = JSON.stringify(value);
  localStorage.setItem(key, jsonFormat);
}

function loadFromLS(key) {
  const data = localStorage.getItem(key);
  try {
    const result = JSON.parse(data);
    return result;
  } catch {
    return data;
  }
}
