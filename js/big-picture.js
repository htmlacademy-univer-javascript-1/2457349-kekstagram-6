import { isEscKey } from './util.js';

const COMMENTS_PER_LOAD = 5;

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCaption = bigPicture.querySelector('.social__caption');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');

let currentPhoto = null;
let displayedCommentsCount = 0;

const createCommentElement = (commentData) => {
  const li = document.createElement('li');
  li.className = 'social__comment';

  const avatar = commentData.avatar || 'img/avatar-1.svg';
  const name = commentData.name || 'Аноним';
  const text = commentData.message || '';

  const img = document.createElement('img');
  img.className = 'social__picture';
  img.src = avatar;
  img.alt = name;
  img.width = 35;
  img.height = 35;

  const textElement = document.createElement('p');
  textElement.className = 'social__text';
  textElement.textContent = text;

  li.appendChild(img);
  li.appendChild(textElement);

  return li;
};

/**
 * Обновляет количество отображаемых комментариев
 */
const updateCommentCount = () => {
  const commentCountSpan = socialCommentCount.querySelector('.comments-count');
  commentCountSpan.textContent = currentPhoto.comments.length;
  socialCommentCount.childNodes[0].nodeValue = `${displayedCommentsCount} из `;
};

/**
 * Загружает следующую порцию комментариев (по 5 штук)
 */
const loadMoreComments = () => {
  if (!currentPhoto) {
    return;
  }

  const comments = currentPhoto.comments;
  const remainingComments = comments.slice(
    displayedCommentsCount,
    displayedCommentsCount + COMMENTS_PER_LOAD
  );

  remainingComments.forEach((commentData) => {
    const commentElement = createCommentElement(commentData);
    socialComments.appendChild(commentElement);
  });

  displayedCommentsCount += remainingComments.length;
  updateCommentCount();

  if (displayedCommentsCount >= comments.length) {
    commentsLoader.classList.add('hidden');
  }
};

/**
 * Открывает большую картинку с фотографией и комментариями
 */
const openBigPicture = (photoData) => {
  currentPhoto = photoData;
  displayedCommentsCount = 0;

  bigPictureImg.src = photoData.url;
  bigPictureImg.alt = photoData.description;
  likesCount.textContent = photoData.likes;
  commentsCount.textContent = photoData.comments.length;
  socialCaption.textContent = photoData.description;
  socialComments.innerHTML = '';

  loadMoreComments();

  socialCommentCount.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');

  if (photoData.comments.length <= COMMENTS_PER_LOAD) {
    commentsLoader.classList.add('hidden');
  }

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

/**
 * Закрывает большую картинку и очищает состояние
 */
const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  currentPhoto = null;
  displayedCommentsCount = 0;
};

/**
 * Обработчик нажатия клавиши Escape
 */
const handleEscapeKey = (evt) => {
  if (isEscKey(evt)) {
    closeBigPicture();
    document.removeEventListener('keydown', handleEscapeKey);
  }
};

/**
 * Добавляет обработчик для закрытия по Escape
 */
const addEscapeListener = () => {
  document.addEventListener('keydown', handleEscapeKey);
};

/**
 * Удаляет обработчик для закрытия по Escape
 */
const removeEscapeListener = () => {
  document.removeEventListener('keydown', handleEscapeKey);
};

/**
 * Открывает модальное окно большой картинки с поддержкой закрытия по Escape
 */
const openBigPictureModal = (photoData) => {
  openBigPicture(photoData);
  addEscapeListener();
};

/**
 * Закрывает модальное окно большой картинки и удаляет обработчик Escape
 */
const closeBigPictureModal = () => {
  removeEscapeListener();
  closeBigPicture();
};

// Обработчики событий
bigPictureCancel.addEventListener('click', closeBigPictureModal);
commentsLoader.addEventListener('click', loadMoreComments);

export { openBigPictureModal };
