import { initialCards } from "./cards.js";
import { openModal, closeModal } from "./modal.js";
import { createCard, onDelete, addLike } from "./card.js";
import "../pages/index.css";

// Переменная для контейнера карточки
const placesList = document.querySelector(".places__list");

//Переменные для формы редактирования профиля
const editButton = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_type_edit");
const formEdit = document.forms["edit-profile"];
const nameFormEdit = formEdit.elements.name;
const descriptionFormEdit = formEdit.elements.description;
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
nameFormEdit.value = profileTitle.textContent;
descriptionFormEdit.value = profileDescription.textContent;

// Переменные для формы добавления карточки
const addButton = document.querySelector(".profile__add-button");
const popupAdd = document.querySelector(".popup_type_new-card");
const formAddCard = document.forms["new-place"];

// Функция рендера элементов в контейнере
function renderedElems(data, listContainer) {
  data.forEach((item) => {
    listContainer.append(createCard(item, onDelete, addLike));
  });
}

// Функция редактирования имени и описания в профиле
function editNameModal(event) {
  event.preventDefault();

  profileTitle.textContent = nameFormEdit.value;
  profileDescription.textContent = descriptionFormEdit.value;

  closeModal(document.querySelector(".popup_is-opened"));
}

// функция добавления новой карточки
function addCard(event) {
  event.preventDefault();

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

renderedElems(initialCards, placesList);

// Обработчики открытия модальных окон
editButton.addEventListener("click", () => {
  openModal(popupEdit);
});

addButton.addEventListener("click", () => {
  openModal(popupAdd);
});

// Обработчик для сохранения значений в форме редактирования профиля
formEdit.addEventListener("submit", editNameModal);

// Обработчик добавления новой карточки
formAddCard.addEventListener("submit", (event) => {
  addCard(event);

  placesList.prepend(createCard(initialCards[0], onDelete));
});
