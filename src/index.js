import "./pages/index.css";
import "./scripts/cards.js";
import { initialCards } from "./scripts/cards.js";
import { createCard, deleteCard, likeCard } from "./components/card.js";
import { openModal, closeModal, openImage } from "./components/modal.js";

const content = document.querySelector(".content");
const cardsContainer = content.querySelector(".places__list");
const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const popupOpenImage = document.querySelector(".popup_type_image");
const popupImage = document.querySelector(".popup__image");
const popupNameEdit = document.querySelector(".popup_type_edit");
const popupAddCard = document.querySelector(".popup_type_new-card");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const nameInputCard = document.querySelector(".popup__input_type_card-name");
const urlInputCard = document.querySelector(".popup__input_type_url");
const addCardForm = document.forms["new-place"];
const popupCaption = document.querySelector(".popup__caption");
const popups = document.querySelectorAll(".popup");
const closeButtons = document.querySelectorAll(".popup__close");

initialCards.forEach((cardData) => {
  const newCard = createCard(cardData, deleteCard, handleOpenImage, likeCard);
  cardsContainer.append(newCard);
});

popups.forEach((popup) => {
  popup.addEventListener("click", (event) => {
    if (event.target === popup) {
      popupHandler(popup);
    }
  });
});

closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const popup = button.closest(".popup");
    popupHandler(popup);
  });
});

popupNameEdit.addEventListener("submit", handleEditForm);

editProfileButton.addEventListener("click", () => {
  openModal(popupNameEdit);
  editInput();
});
addCardButton.addEventListener("click", () => {
  openModal(popupAddCard);
});

popupAddCard.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const addCard = {
    name: nameInputCard.value,
    link: urlInputCard.value,
  };
  const newCard = createCard(addCard, deleteCard, handleOpenImage, likeCard);
  cardsContainer.prepend(newCard);
  addCardForm.reset();
  closeModal(popupAddCard);
});

function handleEditForm(evt) {
  evt.preventDefault();
  const nameInputValue = nameInput.value;
  const jobInputValue = jobInput.value;
  profileTitle.textContent = nameInputValue;
  profileDescription.textContent = jobInputValue;
  closeModal(popupNameEdit);
}

function editInput() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

function popupHandler(popup) {
  closeModal(popup);
}

function handleOpenImage(imageSrc, imageName) {
  openImage(imageSrc, imageName, popupImage, popupCaption, popupOpenImage);
}
