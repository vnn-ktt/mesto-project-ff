import * as modalComponent from './modal.js';

const cardTemplate = document.querySelector('#card-template').content;

function likeCardHandler(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}
function deployCardHandler(evt) {
  let popupTypeImage = document.querySelector('.popup_type_image');
  popupTypeImage.querySelector('.popup__image').src = evt.target.src;
  popupTypeImage.querySelector('.popup__caption').textContent = evt.target.alt;
  modalComponent.openPopup(popupTypeImage);
}
export function makeCard(data, deleteCard) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  card.querySelector('.card__title').textContent = data.name;
  const cardImage = card.querySelector('.card__image');
  cardImage.alt = data.name;
  cardImage.src = data.link;
  card
    .querySelector('.card__delete-button')
    .addEventListener('click', () => deleteCard(card));
  card
    .querySelector('.card__like-button')
    .addEventListener('click', likeCardHandler);
  card
    .querySelector('.card__image')
    .addEventListener('click', deployCardHandler);
  return card;
}
export function deleteCard(card) {
  card.remove();
}
