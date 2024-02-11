import * as cardComponent from './scripts/components/card.js';
import * as modalComponent from './scripts/components/modal.js';
import * as validationComponent from './scripts/components/validation.js';
import * as apiComponent from './scripts/components/api.js';
import './pages/index.css';
import './images/logo.svg';

/**
 * DOM elements
 * Variables, function declarations
 */

const pageContent = document.querySelector('.page__content');
const popups = pageContent.querySelectorAll('.popup');
const popupTypeEdit = Array.from(popups).find((popup) =>
  popup.classList.contains('popup_type_edit'),
);
const popupTypeAdd = Array.from(popups).find((popup) =>
  popup.classList.contains('popup_type_new-card'),
);
const popupTypeAvatar = Array.from(popups).find((popup) =>
  popup.classList.contains('popup_type_avatar'),
);
const popupTypeDelete = Array.from(popups).find((popup) =>
  popup.classList.contains('popup_type_delete-card'),
);
const popupTypeEditSubmit = popupTypeEdit.querySelector(
  'button[type="submit"]',
);
const popupTypeAvatarSubmit = popupTypeAvatar.querySelector(
  'button[type="submit"]',
);
const popupTypeAddSubmit = popupTypeAdd.querySelector('button[type="submit"]');
const popupTypeImage = pageContent.querySelector('.popup_type_image');
const popupTypeImageElementImage =
  popupTypeImage.querySelector('.popup__image');
const popupTypeImageElementCaption =
  popupTypeImage.querySelector('.popup__caption');
const popupTypeEditOpenButton = pageContent.querySelector(
  '.profile__edit-button',
);
const popupTypeAddOpenButton = pageContent.querySelector(
  '.profile__add-button',
);
const profileImage = pageContent.querySelector('.profile__image');
const profileTitle = pageContent.querySelector('.profile__title');
const profileDescription = pageContent.querySelector('.profile__description');
const cardsContainer = pageContent.querySelector('.places__list');
const formsList = document.forms;
const formEditProfile = formsList.editProfile;
const formAvatar = formsList.updateAvatar;
const formNewPlace = formsList.newPlace;
const formDeleteCard = formsList.deleteCard;
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'input-error',
};
const cardForDelete = {};
let userId;

function handleFormEditProfileSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, popupTypeEditSubmit);
  const userData = {
    name: formEditProfile.elements.name.value,
    about: formEditProfile.elements.description.value,
  };
  apiComponent
    .requestUpdateUser(userData)
    .then((user) => {
      profileTitle.textContent = user.name;
      profileDescription.textContent = user.about;
      modalComponent.closePopup(popupTypeEdit);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      renderLoading(false, popupTypeEditSubmit);
    });
}

function handleFormAvatarSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, popupTypeAvatarSubmit);
  const url = formAvatar.elements.link.value;
  apiComponent
    .requestUpdateAvatar(url)
    .then((user) => {
      profileImage.style.backgroundImage = `url(${user.avatar})`;
      modalComponent.closePopup(popupTypeAvatar);
      evt.target.reset();
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      renderLoading(false, popupTypeAvatarSubmit);
    });
}

function handleFormNewPlaceSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, popupTypeAddSubmit);
  const dataCard = {
    name: formNewPlace.elements.placeName.value,
    link: formNewPlace.elements.link.value,
  };
  apiComponent
    .requestCreateCard(dataCard)
    .then((dataCard) => {
      const card = cardComponent.makeCard(
        userId,
        dataCard,
        openDeletePopup,
        cardComponent.likeCard,
        handleOpenImage,
      );
      cardsContainer.prepend(card);
      modalComponent.closePopup(popupTypeAdd);
      evt.target.reset();
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      renderLoading(false, popupTypeAddSubmit);
    });
}

function handleApproveDelete(evt, cardForDelete) {
  evt.preventDefault();
  apiComponent
    .requestDeleteCard(cardForDelete.id)
    .then(() => {
      cardComponent.deleteCard(cardForDelete.element);
      modalComponent.closePopup(popupTypeDelete);
    })
    .catch((error) => {
      console.error(error);
    });
}

function openDeletePopup(id, element) {
  cardForDelete.id = id;
  cardForDelete.element = element;
  modalComponent.openPopup(popupTypeDelete);
}

function handleOpenImage(dataCard) {
  popupTypeImageElementImage.src = dataCard.link;
  popupTypeImageElementImage.alt = dataCard.name;
  popupTypeImageElementCaption.textContent = dataCard.name;
  modalComponent.openPopup(popupTypeImage);
}

function renderLoading(isLoading, button) {
  if (isLoading) {
    button.textContent = 'Сохранение...';
  } else {
    button.textContent = 'Сохранить';
  }
}

/**
 * Initialization
 */
Promise.all([apiComponent.requestGetUser(), apiComponent.requestGetCards()])
  .then(([user, cards]) => {
    userId = user._id;
    profileTitle.textContent = user.name;
    profileDescription.textContent = user.about;
    profileImage.style.backgroundImage = `url(${user.avatar})`;
    cards.forEach((dataCard) => {
      const card = cardComponent.makeCard(
        userId,
        dataCard,
        openDeletePopup,
        cardComponent.likeCard,
        handleOpenImage,
      );
      cardsContainer.append(card);
    });
  })
  .catch((error) => {
    console.error(error);
  });

popupTypeEditOpenButton.addEventListener('click', () => {
  formEditProfile.elements.name.value = profileTitle.textContent;
  formEditProfile.elements.description.value = profileDescription.textContent;
  validationComponent.clearValidation(formEditProfile, validationConfig);
  modalComponent.openPopup(popupTypeEdit);
});

profileImage.addEventListener('click', () => {
  formAvatar.reset();
  validationComponent.clearValidation(formAvatar, validationConfig);
  modalComponent.openPopup(popupTypeAvatar);
});

popupTypeAddOpenButton.addEventListener('click', () => {
  formNewPlace.reset();
  validationComponent.clearValidation(formNewPlace, validationConfig);
  modalComponent.openPopup(popupTypeAdd);
});

popups.forEach((popup) => {
  popup.addEventListener('click', modalComponent.handleOverlayClick);
});

pageContent.querySelectorAll('.popup__close').forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => {
    modalComponent.closePopup(popup);
  });
});

formEditProfile.addEventListener('submit', (evt) => {
  handleFormEditProfileSubmit(evt);
});

formNewPlace.addEventListener('submit', (evt) => {
  handleFormNewPlaceSubmit(evt);
});

formAvatar.addEventListener('submit', (evt) => {
  handleFormAvatarSubmit(evt);
});

formDeleteCard.addEventListener('submit', (evt) => {
  handleApproveDelete(evt, cardForDelete);
});

formEditProfile.elements.name.value = profileTitle.textContent;

formEditProfile.elements.description.value = profileDescription.textContent;

validationComponent.enableValidation(formsList, validationConfig);
