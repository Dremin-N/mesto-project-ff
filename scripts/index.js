const placesList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

function createCard(data, deleteCard) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.innerText = data.name;

  cardDeleteButton.addEventListener("click", () => {
    deleteCard(cardElement);
  });

  return cardElement;
}

function onDelete(elem) {
  elem.remove();
}

function renderedElems(data, listContainer) {
  data.forEach((item) => {
    listContainer.append(createCard(item, onDelete));
  });
}

renderedElems(initialCards, placesList);
