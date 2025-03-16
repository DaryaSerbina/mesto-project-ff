export { createCard, deleteCard, likeCard };
function createCard(cardData, deleteCard, openImage, likeCard) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = cardData.link;
  cardImage.alt = cardData.alt;
  cardElement.querySelector(".card__title").textContent = cardData.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => deleteCard(cardElement));

  cardImage.addEventListener("click", () => openImage(cardData.link, cardData.name));

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", likeCard);

  return cardElement;
}

function deleteCard(cardElement) {
  cardElement.remove();
}

function likeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}
