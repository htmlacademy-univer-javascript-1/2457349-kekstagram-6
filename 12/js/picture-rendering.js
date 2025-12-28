import { openBigPictureModal } from './big-picture.js';

const pictureTemplate = document.querySelector('#picture');
const picturesContainer = document.querySelector('.pictures');

const createPictureElement = (photoData) => {
  const pictureElement = pictureTemplate.content.cloneNode(true);

  const img = pictureElement.querySelector('.picture__img');
  img.src = photoData.url;
  img.alt = photoData.description;

  const likesSpan = pictureElement.querySelector('.picture__likes');
  likesSpan.textContent = photoData.likes;

  const commentsSpan = pictureElement.querySelector('.picture__comments');
  commentsSpan.textContent = photoData.comments.length;

  const pictureLink = pictureElement.querySelector('.picture');
  pictureLink.addEventListener('click', (evt) => {
    evt.preventDefault();
    openBigPictureModal(photoData);
  });

  return pictureElement;
};

const renderPictures = (photosArray) => {
  const fragment = new DocumentFragment();

  photosArray.forEach((photoData) => {
    const pictureElement = createPictureElement(photoData);
    fragment.appendChild(pictureElement);
  });

  picturesContainer.appendChild(fragment);
};

export { renderPictures };
