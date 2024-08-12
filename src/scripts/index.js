import { initialCards } from "./cards.js";
import { openModal, closeModal, editNameModal, addCard } from "./modal.js";
import { createCard, onDelete } from "./card.js";
import "../pages/index.css";

// Переменные для темплейта карточки и контейнера
const placesList = document.querySelector(".places__list");

//Переменные для формы редактирования
const editButton = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_type_edit");
const formEdit = document.forms["edit-profile"];

// Переменные для формы добавления карточки
const addButton = document.querySelector(".profile__add-button");
const popupAdd = document.querySelector(".popup_type_new-card");
const formAddCard = document.forms["new-place"];

function renderedElems(data, listContainer) {
  data.forEach((item) => {
    listContainer.append(createCard(item, onDelete));
  });
}

renderedElems(initialCards, placesList);

editButton.addEventListener("click", () => {
  openModal(popupEdit);
});

addButton.addEventListener("click", () => {
  openModal(popupAdd);
});

formEdit.addEventListener("submit", (event) => {
  event.preventDefault();
  editNameModal(formEdit);
  closeModal(popupEdit);
});

formAddCard.addEventListener("submit", (event) => {
  addCard(event);

  placesList.prepend(createCard(initialCards[0], onDelete));
});
