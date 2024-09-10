const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-22",
  headers: {
    authorization: "17dccafe-2ef1-4f66-949e-deec47f17770",
    "Content-Type": "application/json",
  },
  id: "b23a164077ee38c7fdc7404b",
};

const checkFetchStatus = function (res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
};

function getInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: config.headers,
  }).then(checkFetchStatus);
}

function getDataUser() {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: config.headers,
  }).then(checkFetchStatus);
}

function changeProfileValues(name, description) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: description,
    }),
  }).then(checkFetchStatus);
}

function addNewCard(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then(checkFetchStatus);
}

function deleteCardFromServer(cardIdd) {
  fetch(`${config.baseUrl}/cards/${cardIdd}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkFetchStatus);
}

function putLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then(checkFetchStatus);
}

function deleteLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkFetchStatus);
}

function updateAvatar(avatar) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar,
    }),
  }).then(checkFetchStatus);
}

export {
  getInitialCards,
  getDataUser,
  changeProfileValues,
  addNewCard,
  deleteCardFromServer,
  putLike,
  deleteLike,
  updateAvatar,
};
