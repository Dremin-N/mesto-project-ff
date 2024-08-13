// Открытие модалки
function openModal(modal) {
  modal.classList.add("popup_is-opened");
  const closeButton = modal.querySelector(".popup__close");
  closeButton.addEventListener("click", () => {
    closeModal(modal);
  });

  window.addEventListener("keydown", closeModalEsc);
  modal.addEventListener("click", closeModalOverlay);
}

// Закрытие модалки
function closeModal(modal) {
  modal.classList.remove("popup_is-opened");

  window.removeEventListener("keydown", closeModalEsc);
  modal.removeEventListener("click", closeModalOverlay);
}

// закрытие модалки на Esc
function closeModalEsc(event) {
  if (event.key === "Escape") {
    closeModal(document.querySelector(".popup_is-opened"));
  }
}

// закрытие модалки кликом на overlay
function closeModalOverlay(event) {
  if (event.target.classList.contains("popup")) {
    closeModal(document.querySelector(".popup_is-opened"));
  }
}

export { openModal, closeModal };
