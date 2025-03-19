export { openModal, closeModal };

function openModal(popup) {
  popup.classList.add("popup_is-opened");
  const escapeHandler = handleEscape(popup);
  document.addEventListener("keydown", escapeHandler);
}

function closeModal(popup) {
  popup.classList.replace("popup_is-opened", "popup_is-animated");
  document.removeEventListener("keydown", handleEscape);
}

function handleEscape(popup) {
  return function (event) {
    if (event.key === "Escape") {
      closeModal(popup);
    }
  };
}
