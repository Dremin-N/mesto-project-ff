import { openModal, closeModal } from "./modal.js";
import { createCard, onDelete, addLike } from "./card.js";
import { clearValidation, enableValidation } from "./validation.js";
import {
  getHeaderValues,
  getInitialCards,
  changeProfileValues,
  addNewCard,
  countLikeCard,
  checkCardOwner,
} from "./api.js";
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
const avatar = document.querySelector(".profile__image");

// Переменные для формы добавления карточки
const addButton = document.querySelector(".profile__add-button");
const popupAdd = document.querySelector(".popup_type_new-card");
const formAddCard = document.forms["new-place"];

// переменная для формы с раскрытием изображения
const popupImage = document.querySelector(".popup_type_image");
const popupImagePhoto = document.querySelector(".popup__image");
const popupImageCaption = document.querySelector(".popup__caption");

// Функция рендера элементов в контейнере
function renderedElems(data, listContainer) {
  data.forEach((item) => {
    listContainer.append(
      createCard(
        item,
        onDelete,
        addLike,
        openPopupImage,
        countLikeCard,
        checkCardOwner
      )
    );
  });
}

// Функция редактирования имени и описания в профиле
function editNameModal(event) {
  event.preventDefault();

  profileTitle.textContent = nameFormEdit.value;
  profileDescription.textContent = descriptionFormEdit.value;
  changeProfileValues(profileTitle.textContent, profileDescription.textContent);

  closeModal(popupEdit);
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

  placeNameinput.value = "";
  linkInput.value = "";

  placesList.prepend(createCard(elem, onDelete, addLike, openPopupImage));
  addNewCard(elem.name, elem.link);

  closeModal(popupAdd);
}

//Функция открытия попапа изображения
const openPopupImage = (event) => {
  popupImagePhoto.src = event.target.src;
  popupImagePhoto.alt = event.target.alt;
  popupImageCaption.textContent = event.target.alt;

  openModal(popupImage);
};

// Первоначальный рендер карточек
getInitialCards().then((cards) => {
  renderedElems(cards, placesList);
});

// Обработчики открытия модальных окон
editButton.addEventListener("click", () => {
  nameFormEdit.value = profileTitle.textContent;
  descriptionFormEdit.value = profileDescription.textContent;

  clearValidation(formEdit);
  openModal(popupEdit);
});

addButton.addEventListener("click", () => {
  clearValidation(formAddCard);
  openModal(popupAdd);
});

// Обработчики клика на крестик
popupEdit.querySelector(".popup__close").addEventListener("click", () => {
  closeModal(popupEdit);
});

popupAdd.querySelector(".popup__close").addEventListener("click", () => {
  closeModal(popupAdd);
});

popupImage.querySelector(".popup__close").addEventListener("click", () => {
  closeModal(popupImage);
});

// Обработчик для сохранения значений в форме редактирования профиля
formEdit.addEventListener("submit", editNameModal);

// Обработчик добавления новой карточки
formAddCard.addEventListener("submit", addCard);

enableValidation();

getHeaderValues(profileTitle, profileDescription, avatar);
