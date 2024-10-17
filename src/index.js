// index.js
import "./styles/index.css";
import { createCard, likeCard, deleteCard } from "./components/card.js";
import {
  openPopup,
  closePopup,
  handleOverlay,
  popupsArray,
} from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {
  getInitialCards,
  getInitialData,
  getUserData,
  editProfile,
  addNewCard,
  editAvatar,
} from "./components/api.js";

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");
const profilePopup = document.querySelector(".popup_type_edit");
const formElementEditProfile = profilePopup.querySelector(".edit-profile");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");
const avatarPopup = document.querySelector(".popup_type_avatar");
const formElementAvatar = avatarPopup.querySelector(".edit-avatar");
const editAvatarButton = document.querySelector(".profile__image_container");
const newCardPopup = document.querySelector(".popup_type_new-card");
const popupAddButton = document.querySelector(".profile__add-button");
const profileEditButton = document.querySelector(".profile__edit-button ");
const closeButtons = document.querySelectorAll(".popup__close");
const formElementNewCard = newCardPopup.querySelector(".new-place");
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const urlInput = document.querySelector(".popup__input_type_url");
let userId;
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const fillProfileInfo = (userData) => {
  profileTitle.textContent = userData.name;
  profileDescription.textContent = userData.about;
  profileImage.style.backgroundImage = `url(${userData.avatar})`;
};

// @todo: Вывести карточки на страницу
const renderInitialCards = (initialCards, userId) => {
  initialCards.forEach(function renderCard(card) {
    const element = createCard(card, userId, deleteCard, likeCard, zoomCard);
    placesList.append(element);
  });
};

popupAddButton.addEventListener("click", function () {
  formElementNewCard.reset();
  clearValidation(formElementNewCard, validationConfig);
  openPopup(newCardPopup);
});

profileEditButton.addEventListener("click", () => {
  fillProfilePopup(
    formElementEditProfile,
    profileTitle.textContent,
    profileDescription.textContent
  );
  clearValidation(formElementEditProfile, validationConfig);
  openPopup(profilePopup);
});

closeButtons.forEach(function (popupClose) {
  popupClose.addEventListener("click", function () {
    const thisPopup = popupClose.closest(".popup_is-opened");
    if (thisPopup) {
      closePopup(thisPopup);
    }
  });
});

popupsArray.forEach((popup) => {
  popup.addEventListener("click", handleOverlay);
});

//@todo:  Открытие попапа с картинкой
function zoomCard({ link, name, title }) {
  const zoomCardPopup = document.querySelector(".popup_type_image");
  const popupImage = zoomCardPopup.querySelector(".popup__image");
  popupImage.src = link;
  popupImage.alt = name;
  zoomCardPopup.querySelector(".popup__caption").textContent = title;
  openPopup(zoomCardPopup);
}

// @todo: Редактирование имени и информации о себе

function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  renderLoading(true, formElementEditProfile.querySelector(".popup__button"));
  const newProfileData = {
    name: formElementEditProfile.name.value,
    about: formElementEditProfile.description.value,
  };
  editProfile(newProfileData)
    .then((editedProfile) => {
      fillProfileInfo(editedProfile);
      closePopup(profilePopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(
        false,
        formElementEditProfile.querySelector(".popup__button")
      );
    });
}

const fillProfilePopup = (form, name, description) => {
  form.elements.name.value = name;
  form.elements.description.value = description;
};

formElementEditProfile.addEventListener("submit", handleProfileFormSubmit);

// @todo: Добавление карточки
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, formElementNewCard.querySelector(".popup__button"));
  const newPlaceData = {
    name: cardNameInput.value,
    link: urlInput.value,
  };
  addNewCard(newPlaceData)
    .then((newCard) => {
      const newElement = createCard(
        newCard,
        newCard.owner._id,
        deleteCard,
        likeCard,
        zoomCard
      );
      placesList.prepend(newElement);
      closePopup(newCardPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, formElementNewCard.querySelector(".popup__button"));
    });
}

function renderLoading(loading, button) {
  button.textContent = loading ? "Сохранение..." : "Сохранить";
}

formElementNewCard.addEventListener("submit", handleCardFormSubmit);

// @todo: Изменение аватара
function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, formElementAvatar.querySelector(".popup__button"));
  editAvatar(formElementAvatar.link.value)
    .then((updatedAvatar) => {
      fillProfileInfo(updatedAvatar);
      closePopup(avatarPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, formElementAvatar.querySelector(".popup__button"));
    });
}

editAvatarButton.addEventListener("click", (evt) => {
  formElementAvatar.reset();
  clearValidation(formElementAvatar, validationConfig);
  openPopup(avatarPopup);
});

formElementAvatar.addEventListener("submit", handleAvatarFormSubmit);

enableValidation(validationConfig);

getInitialData()
  .then((result) => {
    const userData = result[0];
    userId = userData._id;
    const initialCards = result[1];
    fillProfileInfo(userData);
    renderInitialCards(initialCards, userId);
  })
  .catch((err) => {
    console.log(err);
  });
