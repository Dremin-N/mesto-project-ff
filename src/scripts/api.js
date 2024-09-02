const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-22",
  headers: {
    authorization: "17dccafe-2ef1-4f66-949e-deec47f17770",
    "Content-Type": "application/json",
  },
};

const checkFetchStatus = function (res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
};

function getHeaderValues(name, about, avatar) {
  fetch(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: config.headers,
  })
    .then(checkFetchStatus)
    .then((res) => {
      name.textContent = res.name;
      about.textContent = res.about;
      avatar.style.backgroundImage = `url(${res.avatar})`;
    })
    .catch((res) => console.log(res));
}

const getInitialCards = function () {
  return fetch(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: config.headers,
  }).then(checkFetchStatus);
};

function changeProfileValues(name, description) {
  fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: description,
    }),
  }).then(checkFetchStatus);
}

function addNewCard(name, link) {
  fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then(checkFetchStatus);
}

function countLikeCard(counter) {
  fetch(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: config.headers,
  })
    .then(checkFetchStatus)
    .then((cards) => {
      cards.forEach((card) => {
        counter.textContent = card.likes.length;
      });
    });
}

function checkCardOwner(cardOwner, deleteButton) {
  if (cardOwner !== "b23a164077ee38c7fdc7404b") {
    deleteButton.remove();
  }
}

export {
  getHeaderValues,
  getInitialCards,
  changeProfileValues,
  addNewCard,
  countLikeCard,
  checkCardOwner,
};
