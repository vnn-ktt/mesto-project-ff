//Импорты
import * as cardComponent from './scripts/components/card.js';
import * as modalComponent from './scripts/components/modal.js';
import './pages/index.css';
import './images/logo.svg';
import avatar from './images/avatar.jpg';

//Переменные
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
const pageContent = document.querySelector('.page__content');
const popupTypeEdit = page.querySelector('.popup_type_edit');
const popupTypeAdd = page.querySelector('.popup_type_new-card');
const popupTypeEditOpenButton = page.querySelector('.profile__edit-button');
const popupTypeAddOpenButton = page.querySelector('.profile__add-button');
const profileTitle = page.querySelector('.profile__title');
const profileDescription = page.querySelector('.profile__description');
const cardsList = page.querySelector('.places__list');
const formEditProfile = document.forms.editProfile;
const formNewPlace = document.forms.newPlace;
const profile = document.querySelector('.profile__image');

//Обработчики событий
popupTypeEditOpenButton.addEventListener('click', () => {
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
function formEditProfileSubmitHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = formEditProfile.elements.name.value;
  profileDescription.textContent = formEditProfile.elements.description.value;
  modalComponent.closePopup(document.querySelector('.popup_is-opened'));
}
function formNewPlaceSubmitHandler(evt) {
  evt.preventDefault();
  let data = {
    name: formNewPlace.elements.placeName.value,
    link: formNewPlace.elements.link.value,
  };
  cardsList.prepend(cardComponent.makeCard(data, cardComponent.deleteCard));
  modalComponent.closePopup(page.querySelector('.popup_is-opened'));
}
formEditProfile.addEventListener('submit', formEditProfileSubmitHandler);
formNewPlace.addEventListener('submit', formNewPlaceSubmitHandler);

//Инициализация проекта
profile.style.cssText = `background-image: url(${avatar})`;
initialCards.forEach((elem) => {
  cardsList.append(cardComponent.makeCard(elem, cardComponent.deleteCard));
});
pageContent.querySelectorAll('.popup__close').forEach((elem) => {
  elem.addEventListener('click', () => {
    modalComponent.closePopup(pageContent.querySelector('.popup_is-opened'));
  });
});
formEditProfile.elements.name.value = 'Жак-Ив Кусто';
formEditProfile.elements.description.value = 'Исследователь океана';
