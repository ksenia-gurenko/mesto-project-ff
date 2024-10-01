// @todo: Открытие и закрытие модального окна
const popupsArray = Array.from(document.querySelectorAll(".popup"));

function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscape);
}

function closePopup(popup) {
  if (popup) {
    popup.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", handleEscape);
  }
}

function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = popupsArray.find((popup) =>
      popup.classList.contains("popup_is-opened")
    );
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

function handleOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
}

export { openPopup, closePopup, handleOverlay, popupsArray };
