// @todo: DOM узлы
const content = document.querySelector(".content");
const placesList = content.querySelector(".places__list");
const addButton = content.querySelector(".profile__add-button");

// @todo: Функция создания карточки

function createCard(cardData, deleteCard) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__image").src = cardData.link;
  cardElement.querySelector(".card__image").alt = cardData.alt;
  cardElement.querySelector(".card__title").textContent = cardData.name;
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => deleteCard(cardElement));
  return cardElement;
}

// @todo: Функция удаления карточки

function deleteCard(cardElement) {
  cardElement.remove();
}

// @todo: Вывести карточки на страницу

addButton.addEventListener("click", () => {
  initialCards.forEach((cardData) => {
    const newCard = createCard(cardData, deleteCard);
    placesList.append(newCard);
  });
});
