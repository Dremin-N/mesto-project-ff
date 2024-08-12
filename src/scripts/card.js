import { openModal } from "./modal";

const cardTemplate = document.querySelector("#card-template").content;

// переменные для формы с раскрытием изображения
const popupImage = document.querySelector(".popup_type_image");

// Функция создания карточки
function createCard(data, deleteCard) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.innerText = data.name;

  cardImage.addEventListener("click", () => {
    openModal(popupImage);
    document.querySelector(".popup__image").src = cardImage.src;
    document.querySelector(".popup__caption").innerText = cardTitle.innerText;
  });

  cardDeleteButton.addEventListener("click", () => {
    deleteCard(cardElement);
  });

  return cardElement;
}

function onDelete(elem) {
  elem.remove();
}

export { createCard, onDelete };
