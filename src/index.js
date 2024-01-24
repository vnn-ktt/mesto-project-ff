import * as cardComponent from './scripts/components/card.js';
import * as modalComponent from './scripts/components/modal.js';
import './pages/index.css';
import './images/logo.svg';
import avatar from './images/avatar.jpg';

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];
const page = document.querySelector('.page');
const pageContent = page.querySelector('.page__content');
const popupTypeEdit = page.querySelector('.popup_type_edit');
const popupTypeAdd = page.querySelector('.popup_type_new-card');
const popupTypeImage = page.querySelector('.popup_type_image');
const popupTypeImageElementImage =
  popupTypeImage.querySelector('.popup__image');
const popupTypeImageElementCaption =
  popupTypeImage.querySelector('.popup__caption');
const popupTypeEditOpenButton = page.querySelector('.profile__edit-button');
const popupTypeAddOpenButton = page.querySelector('.profile__add-button');
const profileTitle = page.querySelector('.profile__title');
const profileDescription = page.querySelector('.profile__description');
const cardsList = page.querySelector('.places__list');
const formEditProfile = document.forms.editProfile;
const formNewPlace = document.forms.newPlace;
const profile = page.querySelector('.profile__image');

popupTypeEditOpenButton.addEventListener('click', () => {
  formEditProfile.elements.name.value = profileTitle.textContent;
  formEditProfile.elements.description.value = profileDescription.textContent;
  modalComponent.openPopup(popupTypeEdit);
});
popupTypeAddOpenButton.addEventListener('click', () => {
  modalComponent.openPopup(popupTypeAdd);
});
pageContent.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup_is-opened')) {
    modalComponent.closePopup(evt.target);
  }
});
function handleFormEditProfileSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = formEditProfile.elements.name.value;
  profileDescription.textContent = formEditProfile.elements.description.value;
  modalComponent.closePopup(document.querySelector('.popup_is-opened'));
  evt.target.reset();
}
function handleFormNewPlaceSubmit(evt) {
  evt.preventDefault();
  let data = {
    name: formNewPlace.elements.placeName.value,
    link: formNewPlace.elements.link.value,
  };
  cardsList.prepend(
    cardComponent.makeCard(
      data,
      cardComponent.deleteCard,
      likeCard,
      deployCard,
    ),
  );
  modalComponent.closePopup(page.querySelector('.popup_is-opened'));
  evt.target.reset();
}
function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}
function deployCard(evt) {
  popupTypeImageElementImage.src = evt.target.src;
  popupTypeImageElementImage.alt = evt.target.alt;
  popupTypeImageElementCaption.textContent = evt.target.alt;
  modalComponent.openPopup(popupTypeImage);
}
formEditProfile.addEventListener('submit', handleFormEditProfileSubmit);
formNewPlace.addEventListener('submit', handleFormNewPlaceSubmit);

profile.style.cssText = `background-image: url(${avatar})`;
initialCards.forEach((elem) => {
  cardsList.append(
    cardComponent.makeCard(
      elem,
      cardComponent.deleteCard,
      likeCard,
      deployCard,
    ),
  );
});
pageContent.querySelectorAll('.popup__close').forEach((elem) => {
  elem.addEventListener('click', () => {
    modalComponent.closePopup(pageContent.querySelector('.popup_is-opened'));
  });
});
formEditProfile.elements.name.value = 'Жак-Ив Кусто';
formEditProfile.elements.description.value = 'Исследователь океана';
