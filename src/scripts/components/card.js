import { requestLikeCard, requestDislikeCard } from './api.js';

const cardTemplate = document.querySelector('#card-template').content;

export const makeCard = (
  userId,
  dataCard,
  openDeletePopup,
  likeCard,
  handleOpenImage,
) => {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardLikeButton = card.querySelector('.card__like-button');
  const cardLikeCount = card.querySelector('.card__like-count');
  const cardDeleteButton = card.querySelector('.card__delete-button');
  const cardIsLiked = dataCard.likes.some((like) => like._id === userId);
  card.querySelector('.card__title').textContent = dataCard.name;
  cardImage.alt = dataCard.name;
  cardImage.src = dataCard.link;
  cardImage.addEventListener('click', () => handleOpenImage(dataCard));
  if (cardIsLiked) {
    cardLikeButton.classList.add('card__like-button_is-active');
  }
  cardLikeCount.textContent = dataCard.likes.length;
  cardLikeButton.addEventListener('click', () =>
    likeCard(dataCard._id, cardLikeButton, cardLikeCount),
  );
  if (dataCard.owner._id === userId) {
    cardDeleteButton.addEventListener('click', () =>
      openDeletePopup(dataCard._id, card),
    );
  } else {
    cardDeleteButton.remove();
  }
  return card;
};

export const deleteCard = (card) => {
  card.remove();
};

export const likeCard = (cardId, likeButtonElement, likeCountElement) => {
  if (!likeButtonElement.classList.contains('card__like-button_is-active')) {
    requestLikeCard(cardId)
      .then((dataCard) => {
        likeCountElement.textContent = dataCard.likes.length;
        likeButtonElement.classList.add('card__like-button_is-active');
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    requestDislikeCard(cardId)
      .then((dataCard) => {
        likeCountElement.textContent = dataCard.likes.length;
        likeButtonElement.classList.remove('card__like-button_is-active');
      })
      .catch((error) => {
        console.error(error);
      });
  }
};
