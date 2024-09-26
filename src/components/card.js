// @todo: Функция создания карточки 
const cardTemplate = document.querySelector('#card-template').content; 
function createCard(card, deleteCard, likeCard, zoomCard) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    const image = cardElement.querySelector('.card__image');
    const zoomCardPopup = document.querySelector('.popup_type_image');
    cardElement.querySelector('.card__image').src = card.link;
    cardElement.querySelector('.card__image').alt = card.name;
    cardElement.querySelector('.card__title').textContent = card.name;
    deleteButton.addEventListener('click', deleteCard);
    likeButton.addEventListener('click', likeCard);
    image.addEventListener('click', (event) => {
     zoomCard({
       link: cardElement.querySelector('.card__image').src,
       name: zoomCardPopup.querySelector('.popup__image').alt
       });
   });
    return cardElement;
 }

// @todo: Функция удаления карточки 
function deleteCard(event) {
    event.target.closest('.card').remove()
 }

// @todo:  Лайк карточки 
function likeCard(event) {
    event.target.classList.toggle('card__like-button_is-active');
}

export { createCard, deleteCard, likeCard }