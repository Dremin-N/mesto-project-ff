const cardTemplate = document.querySelector("#card-template").content;

// Функция создания карточки
function createCard(
  data,
  deleteCard,
  openPopupImage,
  userId,
  deleteCardFromServer,
  putLike,
  deleteLike
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
    deleteCardFromServer(data._id)
      .then(() => {
        deleteCard(cardElement);
      })
      .catch((err) => console.log(err));
  });

  // Проверяем кто создатель карточки, если не я - убираем кнопку удаления
  if (data.owner._id !== userId) {
    cardDeleteButton.remove();
  }

  // Получаем количество лайков на карточке
  cardLikeCounter.textContent = data.likes.length;

  // Проверяем лайкал ли user
  if (data.likes.some((like) => like._id === userId)) {
    cardLikeButton.classList.add("card__like-button_is-active");
  }

  //Вешаем слушатель для лайка
  cardLikeButton.addEventListener("click", () => {
    if (cardLikeButton.classList.contains("card__like-button_is-active")) {
      deleteLike(data._id)
        .then((updateCard) => {
          cardLikeCounter.textContent = updateCard.likes.length;
          cardLikeButton.classList.remove("card__like-button_is-active");
        })
        .catch((err) => console.log(err));
    } else {
      putLike(data._id)
        .then((updateCard) => {
          cardLikeCounter.textContent = updateCard.likes.length;
          cardLikeButton.classList.add("card__like-button_is-active");
        })
        .catch((err) => console.log(err));
    }
  });

  return cardElement;
}

// Функция удаления
function onDelete(elem) {
  elem.remove();
}

export { createCard, onDelete };
