import throttle from 'lodash.throttle';

const refs = {
  formEl: document.querySelector('.feedback-form'),
  emailEl: document.querySelector('[name="email"]'),
  textareaEl: document.querySelector('[name="message"]'),
};

refs.formEl.addEventListener('submit', onFormSubmit);
refs.formEl.addEventListener('input', throttle(addToLS, 500));

const STORAGE_KEY = 'feedback-form-state';
let formData = {};
function onFormSubmit(e) {
  e.preventDefault();
  console.log('Отправляєм форму');
  formData = {};
  e.target.reset();
  localStorage.removeItem(STORAGE_KEY);
}
function addToLS(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}
populateTextarea();
function populateTextarea() {
  const savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (savedMessage) {
    refs.textareaEl.value = savedMessage.message || '';
    refs.emailEl.value = savedMessage.email || '';
  }
}
