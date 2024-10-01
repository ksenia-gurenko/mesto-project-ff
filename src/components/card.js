// @todo: Функция создания карточки
const cardTemplate = document.querySelector("#card-template").content;
function createCard(card, deleteCard, likeCard, zoomCard) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const image = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  image.src = card.link;
  image.alt = card.name;
  cardTitle.textContent = card.name;
  deleteButton.addEventListener("click", deleteCard);
  likeButton.addEventListener("click", likeCard);
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
function deleteCard(event) {
  event.target.closest(".card").remove();
}

// @todo:  Лайк карточки
function likeCard(event) {
  event.target.classList.toggle("card__like-button_is-active");
}

export { createCard, deleteCard, likeCard };
