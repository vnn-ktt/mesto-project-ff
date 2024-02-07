import {
  server_CONFIG,
  requestDeleteCard,
  requestLikeCard,
  requestDislikeCard,
} from './api.js';

const cardTemplate = document.querySelector('#card-template').content;

export const makeCard = (dataCard, deleteCard, likeCard, deployCard) => {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardLikeButton = card.querySelector('.card__like-button');

  card.setAttribute('data-card-id', dataCard._id);
  card.querySelector('.card__title').textContent = dataCard.name;
  cardImage.alt = dataCard.name;
  cardImage.src = dataCard.link;
  cardImage.addEventListener('click', deployCard);

  if (dataCard.likes.some((like) => like._id === server_CONFIG._id_user)) {
    cardLikeButton.classList.add('card__like-button_is-active');
  }
  card.querySelector('.card__like-count').textContent = dataCard.likes.length;
  cardLikeButton.addEventListener('click', likeCard);

  if (dataCard.owner._id === server_CONFIG._id_user) {
    card
      .querySelector('.card__delete-button')
      .addEventListener('click', () => deleteCard(card));
  } else {
    card.querySelector('.card__delete-button').remove();
  }

  return card;
};

export const deleteCard = (card) => {
  requestDeleteCard(card.dataset.cardId)
    .then(() => {
      card
        .querySelector('.card__delete-button')
        .removeEventListener('click', deleteCard);
      card
        .querySelector('.card__like-button')
        .removeEventListener('click', likeCard);
      card.remove();
    })
    .catch((error) => {
      console.error(error);
    });
};

export const likeCard = (evt) => {
  const card = evt.target.closest('.card');
  if (!evt.target.classList.contains('card__like-button_is-active')) {
    requestLikeCard(card.dataset.cardId)
      .then((dataCard) => {
        evt.target.nextElementSibling.textContent = dataCard.likes.length;
        evt.target.classList.add('card__like-button_is-active');
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    requestDislikeCard(card.dataset.cardId)
      .then((dataCard) => {
        evt.target.nextElementSibling.textContent = dataCard.likes.length;
        evt.target.classList.remove('card__like-button_is-active');
      })
      .catch((error) => {
        console.error(error);
      });
  }
};
