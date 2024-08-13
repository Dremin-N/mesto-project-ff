import { openModal } from "./modal";

const cardTemplate = document.querySelector("#card-template").content;

// переменная для формы с раскрытием изображения
const popupImage = document.querySelector(".popup_type_image");

// Функция создания карточки
function createCard(data, deleteCard, addLike) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const cardLikeButton = cardElement.querySelector(".card__like-button");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.innerText = data.name;

  // Обработчик открытия формы при клике на изображение
  cardImage.addEventListener("click", () => {
    document.querySelector(".popup__image").src = cardImage.src;
    document.querySelector(".popup__image").alt = cardImage.alt;
    document.querySelector(".popup__caption").innerText = cardTitle.innerText;
    openModal(popupImage);
  });

  // Обработчик удаления карточки при клике на крестик
  cardDeleteButton.addEventListener("click", () => {
    deleteCard(cardElement);
  });

  // Обработчик добавления/убирания лайка
  cardLikeButton.addEventListener("click", addLike);

  return cardElement;
}

// Функция удаления
function onDelete(elem) {
  elem.remove();
}

// Функция лайка
function addLike(event) {
  event.target.classList.toggle("card__like-button_is-active");
}

export { createCard, onDelete, addLike };
