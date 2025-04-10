export { openModal, closeModal };

function openModal(popup) {
  popup.classList.add("popup_is-opened");
  const escapeHandler = (evt) => {
    if (evt.key === "Escape") {
      closeModal(popup); 
    }
  };
  document.addEventListener("keydown", escapeHandler);
  popup.escapeHandler = escapeHandler;
}

function closeModal(popup) {
  popup.classList.replace("popup_is-opened", "popup_is-animated");
  document.removeEventListener("keydown", popup.escapeHandler);
  delete popup.escapeHandler;
}

