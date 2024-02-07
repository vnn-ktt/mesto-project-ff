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

const page = document.querySelector('.page');
const pageContent = page.querySelector('.page__content');
const popupTypeEdit = page.querySelector('.popup_type_edit');
const popupTypeAvatar = page.querySelector('.popup_type_avatar');
const popupTypeAdd = page.querySelector('.popup_type_new-card');
const popupTypeImage = page.querySelector('.popup_type_image');
const popupTypeImageElementImage =
  popupTypeImage.querySelector('.popup__image');
const popupTypeImageElementCaption =
  popupTypeImage.querySelector('.popup__caption');
const popupTypeEditOpenButton = page.querySelector('.profile__edit-button');
const popupTypeAddOpenButton = page.querySelector('.profile__add-button');
const profileImage = page.querySelector('.profile__image');
const profileTitle = page.querySelector('.profile__title');
const profileDescription = page.querySelector('.profile__description');
const cardsList = page.querySelector('.places__list');
const formsList = document.forms;
const formEditProfile = formsList.editProfile;
const formAvatar = formsList.updateAvatar;
const formNewPlace = formsList.newPlace;
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'input-error',
};

function handleFormEditProfileSubmit(evt) {
  evt.preventDefault();
  renderFormLoading(true);
  const userData = {
    name: formEditProfile.elements.name.value,
    about: formEditProfile.elements.description.value,
  };
  apiComponent
    .requestUpdateUser(userData)
    .then((user) => {
      profileTitle.textContent = user.name;
      profileDescription.textContent = user.about;
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      renderFormLoading(false);
      modalComponent.closePopup(document.querySelector('.popup_is-opened'));
      evt.target.reset();
    });
}

function handleFormAvatarSubmit(evt) {
  evt.preventDefault();
  renderFormLoading(true);
  const url = formAvatar.elements.link.value;
  apiComponent
    .requestUpdateAvatar(url)
    .then((user) => {
      profileImage.style.cssText = `background-image: url(${user.avatar})`;
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      renderFormLoading(false);
      modalComponent.closePopup(document.querySelector('.popup_is-opened'));
      evt.target.reset();
    });
}

function handleFormNewPlaceSubmit(evt) {
  evt.preventDefault();
  renderFormLoading(true);
  const dataCard = {
    name: formNewPlace.elements.placeName.value,
    link: formNewPlace.elements.link.value,
  };
  apiComponent
    .requestCreateCard(dataCard)
    .then((dataCard) => {
      const card = cardComponent.makeCard(
        dataCard,
        cardComponent.deleteCard,
        cardComponent.likeCard,
        deployCard,
      );
      cardsList.prepend(card);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      renderFormLoading(false);
      modalComponent.closePopup(document.querySelector('.popup_is-opened'));
      evt.target.reset();
    });
}

function deployCard(evt) {
  popupTypeImageElementImage.src = evt.target.src;
  popupTypeImageElementImage.alt = evt.target.alt;
  popupTypeImageElementCaption.textContent = evt.target.alt;
  modalComponent.openPopup(popupTypeImage);
}

function renderFormLoading(isLoading) {
  const submit = page
    .querySelector('.popup_is-opened')
    .querySelector('.popup__button');
  if (isLoading) {
    submit.textContent = 'Сохранение...';
  } else {
    submit.textContent = 'Сохранить';
  }
}

/**
 * Initialization
 */

Promise.all([apiComponent.requestGetUser(), apiComponent.requestGetCards()])
  .then((response) => {
    profileTitle.textContent = response[0].name;
    profileDescription.textContent = response[0].about;
    profileImage.style.cssText = `background-image: url(${response[0].avatar})`;
    response[1].forEach((dataCard) => {
      const card = cardComponent.makeCard(
        dataCard,
        cardComponent.deleteCard,
        cardComponent.likeCard,
        deployCard,
      );
      cardsList.append(card);
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
  formAvatar.elements.link.value = '';
  validationComponent.clearValidation(formAvatar, validationConfig);
  modalComponent.openPopup(popupTypeAvatar);
});

popupTypeAddOpenButton.addEventListener('click', () => {
  formNewPlace.elements.placeName.value = '';
  formNewPlace.elements.link.value = '';
  validationComponent.clearValidation(formNewPlace, validationConfig);
  modalComponent.openPopup(popupTypeAdd);
});

pageContent.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup_is-opened')) {
    modalComponent.closePopup(evt.target);
  }
});

pageContent.querySelectorAll('.popup__close').forEach((elem) => {
  elem.addEventListener('click', () => {
    modalComponent.closePopup(pageContent.querySelector('.popup_is-opened'));
  });
});

formEditProfile.addEventListener('submit', handleFormEditProfileSubmit);

formNewPlace.addEventListener('submit', handleFormNewPlaceSubmit);

formAvatar.addEventListener('submit', handleFormAvatarSubmit);

formEditProfile.elements.name.value = profileTitle.textContent;

formEditProfile.elements.description.value = profileDescription.textContent;

validationComponent.enableValidation(formsList, validationConfig);
