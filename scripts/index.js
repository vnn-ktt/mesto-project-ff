// DOM-узлы
const pageBody = document.querySelector('.page');
const cardsList = pageBody.querySelector('.places__list');
const cardTemplate = pageBody.querySelector('#card-template').content;

// Функции
const makeCard = function (data, deleteCard) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  card.querySelector('.card__title').textContent = data.name;
  const cardImage = card.querySelector('.card__image');
  cardImage.alt = data.name;
  cardImage.src = data.link;
  const cardDeleteButton = card.querySelector('.card__delete-button');
  cardDeleteButton.addEventListener('click', () => deleteCard(card));
  return card;
};
const deleteCard = (card) => card.remove();

// Инициализация страницы
initialCards.forEach((elem) => {
  cardsList.append(makeCard(elem, deleteCard));
});
