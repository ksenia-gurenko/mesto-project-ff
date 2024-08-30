// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content; 

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(card, deleteCard) {
   const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
   const deleteButton = cardElement.querySelector('.card__delete-button');
   cardElement.querySelector('.card__image').src = card.link;
   cardElement.querySelector('.card__image').alt = card.name;
   cardElement.querySelector('.card__title').textContent = card.name;
   deleteButton.addEventListener('click', deleteCard);
   return cardElement;
}

// @todo: Функция удаления карточки
 function deleteCard(event) {
    event.target.closest('.card').remove()
 }
 
// @todo: Вывести карточки на страницу
initialCards.forEach(function(card) {
    const element = createCard(card, deleteCard);
    placesList.append(element);
});
 