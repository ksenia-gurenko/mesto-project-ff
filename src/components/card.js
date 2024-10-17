import { putLike, deleteLike, deleteCardApi } from "./api.js";
// @todo: Функция создания карточки
const cardTemplate = document.querySelector("#card-template").content;

function createCard(card, userId, deleteCard, likeCard, zoomCard) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const image = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikesCounter = cardElement.querySelector(".card__likes-counter");
  cardLikesCounter.textContent = card.likes.length;
  const isLiked = card.likes.some((like) => like._id === userId);

  if (isLiked) {
    likeButton.classList.add("card__like-button_is-active");
  }
  image.src = card.link;
  image.alt = card.name;
  cardTitle.textContent = card.name;

  if (userId !== card.owner._id) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener("click", (event) => {
      const cardId = card._id;
      deleteCard(event, cardId);
    });
  }

  likeButton.addEventListener("click", (event) => {
    likeCard(cardLikesCounter, event, card);
  });

  image.addEventListener("click", (event) => {
    zoomCard({
      link: image.src,
      name: image.alt,
      title: cardTitle.textContent,
    });
  });

  return cardElement;
}

// @todo: Функция удаления карточки

function deleteCard(event, cardId) {
  deleteCardApi(cardId)
    .then(() => {
      event.target.closest(".card").remove();
    })
    .catch((err) => {
      console.log(err);
    });
}

// @todo:  Лайк карточки

function likeCard(cardLikesCounter, event, cards) {
  if (event.target.classList.contains("card__like-button_is-active")) {
    deleteLike(cards._id)
      .then((res) => {
        event.target.classList.toggle("card__like-button_is-active");
        cardLikesCounter.textContent = res.likes.length;
      })
      .catch((err) => {
        console.error("Произошла ошибка при удалении лайка:", err);
      });
  } else {
    putLike(cards._id)
      .then((res) => {
        event.target.classList.toggle("card__like-button_is-active");
        cardLikesCounter.textContent = res.likes.length;
      })
      .catch((err) => {
        console.error("Произошла ошибка при добавлении лайка:", err);
      });
  }
}

export { createCard, deleteCard, likeCard };
