export const enableValidation = (domFormList, validationConfig) => {
  const arrFormList = Array.from(domFormList);
  arrFormList.forEach((formElem) => {
    setEventListenersToForm(formElem, validationConfig);
    formElem.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
  });
};
export const clearValidation = (form, validationConfig) => {
  const arrInputList = Array.from(
    form.querySelectorAll(validationConfig.inputSelector),
  );
  const button = form.querySelector(validationConfig.submitButtonSelector);
  arrInputList.forEach((inputElem) => {
    hideInputError(form, inputElem, validationConfig);
  });
  button.classList.add(validationConfig.inactiveButtonClass);
};
const setEventListenersToForm = (form, validationConfig) => {
  const arrInputList = Array.from(
    form.querySelectorAll(validationConfig.inputSelector),
  );
  const button = form.querySelector(validationConfig.submitButtonSelector);
  toggleButtonState(arrInputList, button, validationConfig);
  arrInputList.forEach((inputElem) => {
    inputElem.addEventListener('input', function () {
      checkInputValidity(form, inputElem, validationConfig);
      toggleButtonState(arrInputList, button, validationConfig);
    });
  });
};
const toggleButtonState = (arrInputList, button, validationConfig) => {
  if (hasInvalidInput(arrInputList)) {
    button.classList.add(validationConfig.inactiveButtonClass);
  } else {
    button.classList.remove(validationConfig.inactiveButtonClass);
  }
};
const hasInvalidInput = (arrInputList) => {
  return arrInputList.some((inputElem) => {
    return !inputElem.validity.valid;
  });
};
const checkInputValidity = (formElem, inputElem, validationConfig) => {
  if (inputElem.validity.patternMismatch) {
    inputElem.setCustomValidity(inputElem.dataset.patternMismatchMessage);
  } else {
    inputElem.setCustomValidity('');
  }
  if (!inputElem.validity.valid) {
    showInputError(
      formElem,
      inputElem,
      inputElem.validationMessage,
      validationConfig,
    );
  } else {
    hideInputError(formElem, inputElem, validationConfig);
  }
};
const showInputError = (
  formElem,
  inputElem,
  errorMessage,
  validationConfig,
) => {
  const errorElem = formElem.querySelector(
    `.${inputElem.id}-${validationConfig.errorClass}`,
  );
  inputElem.classList.add(validationConfig.inputErrorClass);
  errorElem.textContent = errorMessage;
};
const hideInputError = (formElem, inputElem, validationConfig) => {
  const errorElem = formElem.querySelector(
    `.${inputElem.id}-${validationConfig.errorClass}`,
  );
  inputElem.classList.remove(validationConfig.inputErrorClass);
  errorElem.textContent = '';
};
