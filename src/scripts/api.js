const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-22",
  headers: {
    authorization: "17dccafe-2ef1-4f66-949e-deec47f17770",
    "Content-Type": "application/json",
  },
};

function request(url, method, body = null) {
  return fetch(url, {
    method: method,
    headers: config.headers,
    body: body ? JSON.stringify(body) : null,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  });
}

function getInitialCards() {
  return request(`${config.baseUrl}/cards`, "GET");
}

function getDataUser() {
  return request(`${config.baseUrl}/users/me`, "GET");
}

function deleteCardFromServer(cardId) {
  return request(`${config.baseUrl}/cards/${cardId}`, "DELETE");
}

function putLike(cardId) {
  return request(`${config.baseUrl}/cards/likes/${cardId}`, "PUT");
}

function deleteLike(cardId) {
  return request(`${config.baseUrl}/cards/likes/${cardId}`, "DELETE");
}

function changeProfileValues(name, about) {
  return request(`${config.baseUrl}/users/me`, "PATCH", { name, about });
}

function addNewCard(name, link) {
  return request(`${config.baseUrl}/cards`, "POST", {
    name,
    link,
  });
}

function updateAvatar(avatar) {
  return request(`${config.baseUrl}/users/me/avatar`, "PATCH", { avatar });
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
