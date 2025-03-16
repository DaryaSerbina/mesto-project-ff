export { openModal, closeModal, openImage, currentPopup };
import {
  editPlaceholder,
  handleEscape,
  popupNameEdit,
  popupAddCard,
  popupOpenImage,
  popupImage,
  popupHandler,
  handleFormSubmit,
  addCardForm,
  editNameForm,
  popupCaption,
} from "../scripts/index.js";
let currentPopup = null;

function openModal(element) {
  if (element.classList.contains("profile__edit-button")) {
    popupNameEdit.classList.add("popup_is-opened");
    currentPopup = popupNameEdit;
    editPlaceholder();
  } else if (element.classList.contains("profile__add-button")) {
    popupAddCard.classList.add("popup_is-opened");
    currentPopup = popupAddCard;
  }
  const closeButton = currentPopup.querySelector(".popup__close");
  closeButton.addEventListener("click", (event) => popupHandler(event));
  currentPopup.addEventListener("click", (event) => popupHandler(event));
  popupNameEdit.addEventListener("submit", handleFormSubmit);
}

function openImage(imageSrc, imageName) {
  popupCaption.textContent = imageName;
  popupImage.src = imageSrc;
  popupOpenImage.classList.add("popup_is-opened");
  currentPopup = popupOpenImage;
  const closeButton = currentPopup.querySelector(".popup__close");
  closeButton.addEventListener("click", (event) => popupHandler(event));
  currentPopup.addEventListener("click", (event) => popupHandler(event));
  popupNameEdit.addEventListener("submit", handleFormSubmit);
  document.addEventListener("keydown", handleEscape);
}

function closeModal(popup) {
  popup.classList.replace("popup_is-opened", "popup_is-animated");
  addCardForm.reset();
  editNameForm.reset();
  document.removeEventListener("keydown", handleEscape);
  const closeButton = popup.querySelector(".popup__close");
  closeButton.removeEventListener("click", () => closeModal(popup));
  const overlay = popup;
  overlay.removeEventListener("click", (evt) => {
    if (evt.target === overlay) {
      closeModal(popup);
    }
  });
}
