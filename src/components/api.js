const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-35",
  headers: {
    authorization: "e02c9263-8da5-4488-807d-a2954be84e6c",
    "Content-Type": "application/json",
  },
};

function request(endpoint, options) {
  const url = `${config.baseUrl}${endpoint}`;
  return fetch(url, options)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.error(`Ошибка запроса к ${endpoint}:`, err);
      throw err;
    });
}

export const getProfileInfo = () => {
  return request("/users/me", { headers: config.headers });
};

export const getInitialCards = () => {
  return request("/cards", { headers: config.headers });
};

export const updateProfile = (name, about) => {
  return request("/users/me", {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({ name, about }),
  });
};

export const addNewCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({ name, link }),
  });
};

export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  });
};

export const likeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  });
};

export const removeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  });
};

export const updateAvatar = (avatarUrl) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({ avatar: avatarUrl }),
  });
};
