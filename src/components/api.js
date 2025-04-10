const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-35",
  headers: {
    authorization: "e02c9263-8da5-4488-807d-a2954be84e6c",
    "Content-Type": "application/json",
  },
};

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

export const getProfileInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
    .then(checkResponse)
    .catch((err) => {
      console.error("Ошибка загрузки профиля:", err);
      throw err;
    });
};

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
    .then(checkResponse)
    .catch((err) => {
      console.error("Ошибка загрузки карточек:", err);
      throw err;
    });
};

export const updateProfile = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({ name, about }),
  })
    .then(checkResponse)
    .catch((err) => {
      console.error("Ошибка обновления профиля:", err);
      throw err;
    });
};

export const addNewCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({ name, link }),
  })
    .then(checkResponse)
    .catch((err) => {
      console.error("Ошибка добавления карточки:", err);
      throw err;
    });
};

export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then(checkResponse)
    .catch((err) => {
      console.error("Ошибка удаления карточки:", err);
      throw err;
    });
};

export const likeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  })
    .then(checkResponse)
    .catch((err) => {
      console.error("Ошибка лайка:", err);
      throw err;
    });
};

export const removeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then(checkResponse)
    .catch((err) => {
      console.error("Ошибка снятия лайка:", err);
      throw err;
    });
};

export const updateAvatar = (avatarUrl) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({ avatar: avatarUrl }),
  })
    .then(checkResponse)
    .catch((err) => {
      console.error("Ошибка обновления аватара:", err);
      throw err;
    });
};
