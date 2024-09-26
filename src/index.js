// index.js
import './styles/index.css'; 
import { initialCards } from './components/cards.js';
import { createCard, likeCard, deleteCard } from './components/card.js';
import { openPopup, closePopup, zoomCard, handleFormSubmit, newPlaceFormSubmit } from './components/modal.js';


// @todo: DOM узлы 
const placesList = document.querySelector('.places__list');
const popup = document.querySelector('.popup');
const editPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const popupAddButton = document.querySelector('.profile__add-button');
const popupEditButton = document.querySelector('.profile__edit-button ');
const closerPopups = document.querySelectorAll('.popup__close');
const formElementEditProfile = editPopup.querySelector('.edit-profile');
const nameInput = formElementEditProfile.querySelector('.popup__input_type_name');
const jobInput = formElementEditProfile.querySelector('.popup__input_type_description');
const formElementNewCard = newCardPopup.querySelector('.new-place');
const cardNameInput = formElementNewCard.querySelector('.popup__input_type_card-name');
const urlInput = formElementNewCard.querySelector('.popup__input_type_url');
 
// @todo: Вывести карточки на страницу 
initialCards.forEach(function(card) {
  const element = createCard(card, deleteCard, likeCard, zoomCard);
  placesList.append(element);
});

popupAddButton.addEventListener('click', function () {
  openPopup(newCardPopup);
 }); 
 
popupEditButton.addEventListener('click', function () {
 openPopup(editPopup);
 }); 
 
closerPopups.forEach(function (popupClose) {
 popupClose.addEventListener('click', function () {
   const popup = this.closest('.popup_is-opened');
   if (popup) {
     closePopup(popup);
   }
 });
 });

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    closePopup(popup);
  } 
  });
  
popup.addEventListener('click', (evt) => {
  if (evt.target === popup) {
    closePopup(popup);
  }
  }); 

formElementEditProfile.addEventListener('submit', handleFormSubmit);

formElementNewCard.addEventListener('submit', newPlaceFormSubmit);


