export const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-24",
  headers: {
    authorization: "42990d20-5bf4-4516-a1c3-36f0363231d2",
    "Content-Type": "application/json",
  },
};

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

//Загрузка информации о пользователе с сервера
// GET https://nomoreparties.co/v1/:wff-cohort-24/users/me

export const getUserData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(handleResponse);
};

//Загрузка карточек с сервера
// GET https://nomoreparties.co/v1/wff-cohort-24/cards

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(handleResponse);
};

export const getInitialData = () => {
  return Promise.all([getUserData(), getInitialCards()]);
};

//Редактирование профиля
// PATCH https://nomoreparties.co/v1/wff-cohort-24/users/me
export const editProfile = (userProfileData) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: userProfileData.name,
      about: userProfileData.about,
    }),
  }).then(handleResponse);
};

//Добавление новой карточки
//POST https://nomoreparties.co/v1/wff-cohort-24/cards

export const addNewCard = (cardData) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: cardData.name,
      link: cardData.link,
    }),
  }).then(handleResponse);
};

//Отображение количества лайков карточки
//Постановка и снятие лайка

// PUT https://nomoreparties.co/v1/wff-cohort-24/cards/likes/cardId
export const putLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then(handleResponse);
};
// DELETE https://nomoreparties.co/v1/wff-cohort-24/cards/likes/cardId
export const deleteLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(handleResponse);
};

//Удаление карточки
//DELETE https://nomoreparties.co/v1/wff-cohort-24/cards/cardId
export const deleteCardApi = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(handleResponse);
};

//Обновление аватара пользователя
//PATCH https://nomoreparties.co/v1/wff-cohort-24/users/me/avatar
export const editAvatar = (avatarLink) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarLink,
    }),
  }).then(handleResponse);
};
