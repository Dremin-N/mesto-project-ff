const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
  inputElement.classList.add(settings.inputErrorClass);
}

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  errorElement.textContent = "";
  errorElement.classList.remove(settings.errorClass);
  inputElement.classList.remove(settings.inputErrorClass);
}

function checkInputValidity(formElement, inputElement) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => !inputElement.validity.valid);
}

function toggleButtonState(inputList, submitButton) {
  if (hasInvalidInput(inputList)) {
    submitButton.classList.add(settings.inactiveButtonClass);
  } else {
    submitButton.classList.remove(settings.inactiveButtonClass);
  }
}

function setEventListeners(formElement) {
  const inputList = Array.from(
    formElement.querySelectorAll(settings.inputSelector)
  );
  const submitButton = formElement.querySelector(settings.submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(
        formElement,
        inputElement,
        inputElement.validationMessage
      );
      toggleButtonState(inputList, submitButton);
    });
  });
}

function clearValidation(formElement) {
  const submitButton = formElement.querySelector(settings.submitButtonSelector);
  const inputList = Array.from(
    formElement.querySelectorAll(settings.inputSelector)
  );

  toggleButtonState(inputList, submitButton);
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement);
  });
}

function enableValidation() {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));

  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
}

export { clearValidation, enableValidation };
