const pageContent = document.querySelector('.page__content');

function keyboardEscHandler(evt) {
  if (evt.key === 'Escape') {
    closePopup(pageContent.querySelector('.popup_is-opened'));
  }
  document.removeEventListener('keydown', keyboardEscHandler);
}
export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
}
export function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', keyboardEscHandler);
}
