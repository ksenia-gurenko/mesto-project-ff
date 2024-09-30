// index.js
import './styles/index.css'; 
import { initialCards } from './components/cards.js';
import { createCard, likeCard, deleteCard } from './components/card.js';
import { openPopup, closePopup, handleOverlay, popupsArray } from './components/modal.js';


// @todo: DOM узлы 
const placesList = document.querySelector('.places__list');
const profilePopup = document.querySelector('.popup_type_edit');
const formElementEditProfile = profilePopup.querySelector('.edit-profile');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const newCardPopup = document.querySelector('.popup_type_new-card');
const popupAddButton = document.querySelector('.profile__add-button');
const profileEditButton = document.querySelector('.profile__edit-button ');
const closerPopups = document.querySelectorAll('.popup__close');
const formElementNewCard = newCardPopup.querySelector('.new-place');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const urlInput = document.querySelector('.popup__input_type_url');

 
// @todo: Вывести карточки на страницу 
initialCards.forEach(function(card) {
  const element = createCard(card, deleteCard, likeCard, zoomCard);
  placesList.append(element);
});

popupAddButton.addEventListener('click', function () {
  openPopup(newCardPopup);
 }); 
 
profileEditButton.addEventListener('click', function () {
 openPopup(profilePopup);
 }); 
 
closerPopups.forEach(function (popupClose) {
 popupClose.addEventListener('click', function () {
  const thisPopup = this.closest('.popup_is-opened'); 
   if (thisPopup) {
     closePopup(thisPopup);
   }
 });
 });

popupsArray.forEach((popup) => {
  popup.addEventListener('click', handleOverlay);
});

//@todo:  Открытие попапа с картинкой 
function zoomCard({link, name, title}) {
  const zoomCardPopup = document.querySelector('.popup_type_image');
  zoomCardPopup.querySelector('.popup__image').src = link;
  zoomCardPopup.querySelector('.popup__image').alt = name;
  zoomCardPopup.querySelector('.popup__caption').textContent = title;
  openPopup(zoomCardPopup);
 }

 // @todo: Редактирование имени и информации о себе 
 
 function handleProfileFormSubmit(evt) {
   evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.     
   const nameValue = formElementEditProfile.name.value;
   const jobValue = formElementEditProfile.description.value;
   profileTitle.textContent = nameValue;
   profileDescription.textContent = jobValue;
   closePopup(profilePopup);
   formElementEditProfile.reset();
 }
 
const fillProfilePopup = (form, name, description) => {
  form.elements.name.value = name;
  form.elements.description.value = description;
};

profileEditButton.addEventListener('click', () => {
 fillProfilePopup(
    formElementEditProfile,
    profileTitle.textContent,
    profileDescription.textContent,
  );
  openPopup(profilePopup);
});

formElementEditProfile.addEventListener('submit', handleProfileFormSubmit);

// @todo: Добавление карточки
function newPlaceFormSubmit(evt) {
  evt.preventDefault(); 
  const placeName = cardNameInput.value;
  const placelink = urlInput.value;
  const newCard = {
    name: placeName,
    link: placelink,
    }
  const newElement = createCard(newCard, deleteCard, likeCard, zoomCard);
  placesList.prepend(newElement);
  closePopup(newCardPopup);
  formElementNewCard.reset();
}

formElementNewCard.addEventListener('submit', newPlaceFormSubmit);


