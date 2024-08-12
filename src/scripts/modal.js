import { initialCards } from "./cards";

// Открытие модалки
function openModal(modal) {
  modal.classList.add("popup_is-opened");
  const closeButton = modal.querySelector(".popup__close");
  closeButton.addEventListener("click", () => {
    closeModal(modal);
  });

  window.addEventListener("keydown", closeModalEsc);
  modal.addEventListener("click", closeModalOverlay);
}

// Закрытие модалки
function closeModal(modal) {
  modal.classList.remove("popup_is-opened");

  window.removeEventListener("keydown", closeModalEsc);
  modal.removeEventListener("click", closeModalOverlay);
}

// закрытие модалки на Esc
function closeModalEsc(event) {
  if (event.key === "Escape") {
    closeModal(document.querySelector(".popup_is-opened"));
  }
}

// закрытие модалки кликом на overlay
function closeModalOverlay(event) {
  if (event.target.classList.contains("popup")) {
    closeModal(document.querySelector(".popup_is-opened"));
  }
}

// Функция редактирования имени и описания в профиле
function editNameModal(form) {
  const nameFormEdit = form.elements.name;
  const descriptionFormEdit = form.elements.description;
  const profileTitle = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");

  profileTitle.textContent = nameFormEdit.value;
  profileDescription.textContent = descriptionFormEdit.value;
}

// функция добавления новой карточки
function addCard(event) {
  event.preventDefault();

  const formAddCard = document.forms["new-place"];
  const placeNameinput = formAddCard.elements["place-name"];
  const linkInput = formAddCard.elements["link"];
  const elem = {
    name: placeNameinput.value,
    link: linkInput.value,
  };
  initialCards.unshift(elem);

  placeNameinput.value = "";
  linkInput.value = "";

  closeModal(document.querySelector(".popup_is-opened"));
}

export { openModal, closeModal, editNameModal, addCard };
