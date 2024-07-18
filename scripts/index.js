const placesList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

function createCard(data, deleteButton) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.innerText = data.name;

  cardDeleteButton.addEventListener("click", () => {
    deleteButton(cardElement);
  });

  return cardElement;
}

function onDelete(elem) {
  elem.remove();
}

function renderedCards(dataCards) {
  dataCards.forEach((item) => {
    placesList.append(createCard(item, onDelete));
  });
}

renderedCards(initialCards);
