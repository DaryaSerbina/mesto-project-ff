import { initialCards } from "./cards.js";
import { createCard, deleteCard, likeCard } from "../components/card.js";
import {
  openModal,
  closeModal,
  openImage,
  currentPopup,
} from "../components/modal.js";
export {
  editPlaceholder,
  handleEscape,
  popupNameEdit,
  popupAddCard,
  popupOpenImage,
  popupImage,
  popupHandler,
  closeButton,
  handleFormSubmit,
  editPopupElements,
  addCardForm,
  editNameForm,
  popupCaption,
};

const content = document.querySelector(".content");
const cardsContainer = content.querySelector(".places__list");
const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const editPopupElements = [editProfileButton, addCardButton];
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
const editNameForm = document.forms["edit-profile"];
const closeButton = document.querySelector(".popup__close");
const popupCaption = document.querySelector(".popup__caption");

function handleFormSubmit(evt) {
  evt.preventDefault();
  const nameInputValue = nameInput.value;
  const jobInputValue = jobInput.value;
  profileTitle.textContent = nameInputValue;
  profileDescription.textContent = jobInputValue;
  closeModal(popupNameEdit);
}

function handleEscape(event) {
  if (event.key === "Escape") {
    closeModal(currentPopup);
  }
}

function editPlaceholder() {
  nameInput.placeholder = profileTitle.textContent;
  jobInput.placeholder = profileDescription.textContent;
}

function popupHandler(event) {
  const closeButton = currentPopup.querySelector(".popup__close");
  if (event.target === closeButton) {
    closeModal(currentPopup);
  } else if (event.target === currentPopup) {
    closeModal(currentPopup);
  }
}

initialCards.forEach((cardData) => {
  const newCard = createCard(cardData, deleteCard, openImage, likeCard);
  cardsContainer.append(newCard);
});

editPopupElements.forEach((element) => {
  element.addEventListener("click", () => {
    openModal(element);
  });
});


popupAddCard.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const addCard = [
    {
      name: nameInputCard.value,
      link: urlInputCard.value,
    },
  ];
  addCard.forEach((addCard) => {
    const newCard = createCard(addCard, deleteCard, openImage, likeCard);
    cardsContainer.prepend(newCard);
  });
  closeModal(popupAddCard);
});
