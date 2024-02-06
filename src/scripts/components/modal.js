const pageContent = document.querySelector('.page__content');
function handleKeyboardEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup(pageContent.querySelector('.popup_is-opened'));
  }
}
export function closePopup(popup) {
  document.removeEventListener('keydown', handleKeyboardEsc);
  popup.classList.remove('popup_is-opened');
}
export function openPopup(popup) {
  document.addEventListener('keydown', handleKeyboardEsc);
  popup.classList.add('popup_is-opened');
}
