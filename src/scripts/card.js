const cardTemplate = document.querySelector("#card-template").content;

// Функция создания карточки
function createCard(
  data,
  deleteCard,
  addLike,
  openPopupImage,
  countLikes,
  checkOwner
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardLikeCounter = cardElement.querySelector(".card__like-count");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  // Обработчик открытия формы при клике на изображение
  cardImage.addEventListener("click", openPopupImage);

  // Обработчик удаления карточки при клике на корзину
  cardDeleteButton.addEventListener("click", () => {
    deleteCard(cardElement);
  });

  // Проверяем кто создатель карточки, если не я - убираем кнопку удаления
  checkOwner(data.owner["_id"], cardDeleteButton);

  // Обработчик добавления/убирания лайка
  cardLikeButton.addEventListener("click", addLike);

  // Получаем количество лайков на карточке
  countLikes(cardLikeCounter);

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
