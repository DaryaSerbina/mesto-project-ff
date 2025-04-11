export { createCard, deleteCard, likeCard };

function createCard(
  cardData,
  handleOpenImage,
  handleDeleteClick,
  likeCardServer,
  removeCardServer,
  currentUserId
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardLikes = cardElement.querySelector(".card__like-number");
  cardImage.src = cardData.link;
  cardElement.querySelector(".card__title").textContent = cardData.name;
  cardImage.alt = cardData.name;
  cardLikes.textContent = cardData.likes.length;
  const deleteButton = cardElement.querySelector(".card__delete-button");
  if (cardData.owner._id !== currentUserId) {
    deleteButton.remove();
  }
  deleteButton.addEventListener("click", () => {
    if (handleDeleteClick) {
      handleDeleteClick(cardElement, cardData._id);
    }
  });
  cardImage.addEventListener("click", () =>
    handleOpenImage(cardData.link, cardData.name)
  );
  const likeButton = cardElement.querySelector(".card__like-button");
  const isLiked = cardData.likes.some((like) => like._id === currentUserId);
  if (isLiked) {
    likeButton.classList.add("card__like-button_is-active");
  }

  likeButton.addEventListener("click", () => {
    likeCard(
      likeButton,
      cardLikes,
      cardData._id,
      likeCardServer,
      removeCardServer
    );
  });

  return cardElement;
}

function deleteCard(cardElement) {
  cardElement.remove();
}

function likeCard(
  likeButton,
  cardLikes,
  cardId,
  likeCardServer,
  removeCardServer
) {
  const isCurrentlyLiked = likeButton.classList.contains(
    "card__like-button_is-active"
  );
  if (isCurrentlyLiked) {
    removeCardServer(cardId)
      .then((updatedCard) => {
        likeButton.classList.remove("card__like-button_is-active");
        cardLikes.textContent = updatedCard.likes.length;
      })
      .catch((err) => console.error("Ошибка снятия лайка:", err));
  } else {
    likeCardServer(cardId)
      .then((updatedCard) => {
        likeButton.classList.add("card__like-button_is-active");
        cardLikes.textContent = updatedCard.likes.length;
      })
      .catch((err) => console.error("Ошибка постановки лайка:", err));
  }
}
