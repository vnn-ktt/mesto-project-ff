const pageContent = document.querySelector('.page__content');

export const closePopup = (popup) => {
  document.removeEventListener('keydown', handleKeyboardEsc);
  popup.classList.remove('popup_is-opened');
};

export const openPopup = (popup) => {
  document.addEventListener('keydown', handleKeyboardEsc);
  popup.classList.add('popup_is-opened');
};

export const handleOverlayClick = (evt) => {
  if (evt.target.classList.contains('popup_is-opened')) {
    closePopup(evt.target);
  }
};

function handleKeyboardEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup(pageContent.querySelector('.popup_is-opened'));
  }
}
