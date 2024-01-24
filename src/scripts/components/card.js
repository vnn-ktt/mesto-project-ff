const cardTemplate = document.querySelector('#card-template').content;

export function makeCard(data, deleteCard, likeCard, deployCard) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  card.querySelector('.card__title').textContent = data.name;
  const cardImage = card.querySelector('.card__image');
  cardImage.alt = data.name;
  cardImage.src = data.link;
  card
    .querySelector('.card__delete-button')
    .addEventListener('click', () => deleteCard(card));
  card.querySelector('.card__like-button').addEventListener('click', likeCard);
  card.querySelector('.card__image').addEventListener('click', deployCard);
  return card;
}
export function deleteCard(card) {
  card.remove();
}
export function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}
