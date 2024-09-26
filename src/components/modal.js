// @todo: Открытие и закрытие модального окна 

function openPopup(popup) {
 popup.classList.add('popup_is-opened');
 popup.classList.add('popup_is-animated');
}

function closePopup(popup) {
 popup.classList.remove('popup_is-opened');
 popup.classList.add('popup_is-animated');
}

//@todo:  Открытие попапа с картинкой 
function zoomCard({link, name}) {
 const zoomCardPopup = document.querySelector('.popup_type_image');
 zoomCardPopup.querySelector('.popup__image').src = link;
 zoomCardPopup.querySelector('.popup__image').alt = name;
 openPopup(zoomCardPopup);
}

// @todo: Редактирование имени и информации о себе 
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.                                                                                                       
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  const userNameElement = document.querySelector('profile__title');
  const userJobElement = document.querySelector('profile__description');
  userNameElement.textContent = nameValue;
  userJobElement.textContent = jobValue;
  closePopup();
  formElementEditProfile.reset();
}

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
  closePopup();
  formElementNewCard.reset();
}

export { openPopup, closePopup, zoomCard, handleFormSubmit, newPlaceFormSubmit }
