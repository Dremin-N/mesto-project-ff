import { openModal, closeModal } from "./modal.js";
import { createCard, onDelete, addLike } from "./card.js";
import { clearValidation, enableValidation } from "./validation.js";
import {
  getInitialCards,
  changeProfileValues,
  getDataUser,
  addNewCard,
  deleteCardFromServer,
  putLike,
  deleteLike,
  updateAvatar,
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

// Переменные для формы редактирования аватарки
const profileImage = document.querySelector(".profile__image");
const popupAvatar = document.querySelector(".popup_type_change_avatar");
const formAvatar = document.forms["change-avatar"];

// Переменные для формы добавления карточки
const addButton = document.querySelector(".profile__add-button");
const popupAdd = document.querySelector(".popup_type_new-card");
const formAddCard = document.forms["new-place"];

// переменная для формы с раскрытием изображения
const popupImage = document.querySelector(".popup_type_image");
const popupImagePhoto = document.querySelector(".popup__image");
const popupImageCaption = document.querySelector(".popup__caption");

// Функция рендера элементов в контейнере
function renderCards(data, userId) {
  data.forEach((item) => {
    placesList.append(
      createCard(
        item,
        onDelete,
        openPopupImage,
        userId,
        deleteCardFromServer,
        putLike,
        deleteLike
      )
    );
  });
}

// Функция редактирования имени и описания в профиле
function editNameModal(event) {
  event.preventDefault();
  renderLoader(true, event.target);

  changeProfileValues(nameFormEdit.value, descriptionFormEdit.value)
    .then((profile) => {
      profileTitle.textContent = profile.name;
      profileDescription.textContent = profile.about;
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoader(false, event.target);
      closeModal(popupEdit);
    });
}

// функция добавления новой карточки
function addCard(event) {
  event.preventDefault();
  renderLoader(true, event.target);

  const placeNameinput = formAddCard.elements["place-name"];
  const linkInput = formAddCard.elements["link"];
  const elem = {
    name: placeNameinput.value,
    link: linkInput.value,
  };

  placeNameinput.value = "";
  linkInput.value = "";

  addNewCard(elem.name, elem.link)
    .then((newCard) => {
      placesList.prepend(
        createCard(
          newCard,
          onDelete,
          openPopupImage,
          newCard.owner._id,
          deleteCardFromServer,
          putLike,
          deleteLike
        )
      );
    })
    .catch((err) => console.log(err))
    .finally(() => {
      closeModal(popupAdd);
      renderLoader(false, event.target);
    });
}

// Функция смены аватара
function changeAvatar(evt) {
  evt.preventDefault();
  renderLoader(true, evt.target);

  const avatarlink = formAvatar.elements.avatar;
  updateAvatar(avatarlink.value)
    .then((avatar) => {
      profileImage.style.backgroundImage = `url(${avatar})`;
    })
    .catch((err) => console.log(err))
    .finally(() => {
      closeModal(popupAvatar);
      renderLoader(false, evt.target);
    });

  avatarlink.value = "";
}

//Функция открытия попапа изображения
const openPopupImage = (event) => {
  popupImagePhoto.src = event.target.src;
  popupImagePhoto.alt = event.target.alt;
  popupImageCaption.textContent = event.target.alt;

  openModal(popupImage);
};

// Функция отображения лоадера
function renderLoader(isLoading, form) {
  const button = form.querySelector(".button");
  const initialValue = "Сохранить";

  if (isLoading) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = initialValue;
  }
}

function renderProfileData(userData) {
  profileTitle.textContent = userData.name;
  profileDescription.textContent = userData.about;
  profileImage.style.backgroundImage = `url(${userData.avatar})`;
}

// Первоначальный рендер карточек и данных профиля
Promise.all([getInitialCards(), getDataUser()])
  .then(([cards, userData]) => {
    const userId = userData._id;
    renderCards(cards, userId);
    renderProfileData(userData);
  })
  .catch((err) => console.log(err));

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

profileImage.addEventListener("click", () => {
  clearValidation(formAddCard);
  openModal(popupAvatar);
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

popupAvatar.querySelector(".popup__close").addEventListener("click", () => {
  closeModal(popupAvatar);
});

// Обработчик для сохранения значений в форме редактирования профиля
formEdit.addEventListener("submit", editNameModal);

// Обработчик добавления новой карточки
formAddCard.addEventListener("submit", addCard);

// Обработчик обновления аватара
formAvatar.addEventListener("submit", changeAvatar);

// Включаем валидацию
enableValidation();
