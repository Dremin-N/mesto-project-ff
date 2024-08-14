const cardTemplate = document.querySelector("#card-template").content;

// Функция создания карточки
function createCard(data, deleteCard, addLike, openPopupImage) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const cardLikeButton = cardElement.querySelector(".card__like-button");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  // Обработчик открытия формы при клике на изображение
  cardImage.addEventListener("click", openPopupImage);

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
