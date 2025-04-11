import "./pages/index.css";
import { createCard, deleteCard, likeCard } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {
  getProfileInfo as getEdit,
  getInitialCards as getCards,
  updateProfile as changeName,
  addNewCard as postCard,
  deleteCard as deleteCardFromServer,
  updateAvatar,
  likeCard as likeCardServer,
  removeCard as removeCardServer,
} from "./components/api.js";

let currentCardElement = null;
let currentCardId = null;
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
const profileImage = document.querySelector(".profile__image");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const urlInputAvatar = document.querySelector(".popup__input_type_url-avatar");
const addCardForm = document.forms["new-place"];
const popupCaption = document.querySelector(".popup__caption");
const popups = document.querySelectorAll(".popup");
const closeButtons = document.querySelectorAll(".popup__close");
const nameEditForm = document.forms["edit-profile"];
const deleteCardForm = document.forms["delete"];
const editAvatarButton = document.querySelector(".profile__image-button");
const editAvatarForm = document.forms["edit-image"];
const popupChangeAvatar = document.querySelector(".popup_type_avatar");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
let currentUserId;

document.addEventListener("DOMContentLoaded", () => {
  Promise.all([getEdit(), getCards()])
    .then(([userData, cards]) => {
      currentUserId = userData._id;
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      profileImage.style.backgroundImage = `url(${userData.avatar})`;

      cards.forEach((cardData) => {
        const cardElement = createCard(
          cardData,
          handleOpenImage,
          handleDeleteClick,
          likeCardServer,
          removeCardServer,
          currentUserId
        );
        cardsContainer.append(cardElement);
      });
    })
    .catch((err) => {
      console.error("Ошибка при загрузке данных:", err);
    });

  enableValidation(validationConfig);
});

popups.forEach((popup) => {
  popup.addEventListener("click", (event) => {
    if (event.target === popup) {
      popupHandler(popup);
    }
  });
});

closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => {
    popupHandler(popup);
  });
});

nameEditForm.addEventListener("submit", handleEditForm);

editAvatarButton.addEventListener("click", () => {
  openModal(popupChangeAvatar);
  editAvatarForm.reset();
  editInput();
  clearValidation(editAvatarForm, validationConfig);
});

editAvatarForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const avatarUrl = urlInputAvatar.value;
  const submitButton = editAvatarForm.querySelector(".form__submit");
  renderLoading(submitButton, true);
  updateAvatar(avatarUrl)
    .then((userData) => {
      const newAvatarUrl = userData.avatar || avatarUrl 
      profileImage.style.backgroundImage = `url(${newAvatarUrl})`;
      editAvatarForm.reset();
      closeModal(popupChangeAvatar);
    })
    .catch((err) => {
      console.error("Ошибка обновления аватара:", err);
    })
    .finally(() => {
      renderLoading(submitButton, false);
    });
});

editProfileButton.addEventListener("click", () => {
  openModal(popupNameEdit);
  editInput();
  clearValidation(nameEditForm, validationConfig);
});

addCardButton.addEventListener("click", () => {
  addCardForm.reset();
  clearValidation(addCardForm, validationConfig);
  openModal(popupAddCard);
});

addCardForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const formData = new FormData(addCardForm);
  const name = formData.get("place-name");
  const link = formData.get("link");
  renderLoading(evt.submitter, true);

  postCard(name, link)
    .then((cardData) => {
      const newCard = createCard(
        cardData,
        handleOpenImage,
        handleDeleteClick,
        likeCardServer,
        removeCardServer,
        currentUserId
      );
      cardsContainer.prepend(newCard);
      addCardForm.reset();
      closeModal(popupAddCard);
    })
    .catch((err) => {
      console.error("Ошибка при добавлении карточки:", err);
    })
    .finally(() => {
      renderLoading(evt.submitter, false);
    });
});

function handleEditForm(evt) {
  evt.preventDefault();
  const nameInputValue = nameInput.value;
  const jobInputValue = jobInput.value;
  renderLoading(evt.submitter, true);
  changeName(nameInputValue, jobInputValue)
    .then((userData) => {
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      closeModal(popupNameEdit);
      clearValidation(nameEditForm, validationConfig);
    })
    .catch((err) => {
      console.error("Ошибка обновления профиля:", err);
    })
    .finally(() => {
      renderLoading(evt.submitter, false);
    });
}

function editInput() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

getEdit()
  .then((userData) => {
    console.log("Данные пользователя:", userData);
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = `url(${userData.avatar})`;
  })
  .catch((err) => {
    console.error("Не удалось загрузить данные:", err);
  });

function popupHandler(popup) {
  addCardForm.reset();
  clearValidation(addCardForm, validationConfig);
  closeModal(popup);
}

function handleOpenImage(imageSrc, imageName) {
  openImage(imageSrc, imageName, popupImage, popupCaption, popupOpenImage);
}

function openImage(
  imageSrc,
  imageName,
  popupImage,
  popupCaption,
  popupOpenImage
) {
  popupImage.src = imageSrc;
  popupCaption.textContent = imageName;
  popupImage.alt = imageName;
  openModal(popupOpenImage);
}

function handleDeleteClick(cardElement, cardId) {
  const popupDelete = document.querySelector(".popup_type_delete");
  const deleteForm = popupDelete.querySelector("form");
  currentCardElement = cardElement;
  currentCardId = cardId;
  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (currentCardId && currentCardElement) {
      deleteCardFromServer(currentCardId)
        .then(() => {
          deleteCard(currentCardElement);
          closeModal(popupDelete);
          currentCardElement = null;
          currentCardId = null;
        })
        .catch((err) => {
          console.error("Ошибка удаления карточки:", err);
        });
    }
  };

  const handleOverlayClose = (evt) => {
    if (
      evt.target === popupDelete ||
      evt.target.classList.contains("popup__close")
    ) {
      deleteForm.removeEventListener("submit", handleSubmit);
      popupDelete.removeEventListener("click", handleOverlayClose);
      closeModal(popupDelete);
      currentCardElement = null;
      currentCardId = null;
    }
  };

  deleteForm.removeEventListener("submit", handleSubmit);
  popupDelete.removeEventListener("click", handleOverlayClose);
  deleteForm.addEventListener("submit", handleSubmit);
  popupDelete.addEventListener("click", handleOverlayClose);

  openModal(popupDelete);
}

function renderLoading(button, isLoading) {
  if (isLoading) {
    button.textContent = "Сохранить...";
  } else {
    button.textContent = "Сохранить";
  }
}

enableValidation(validationConfig);
