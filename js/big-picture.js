const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCaption = bigPicture.querySelector('.social__caption');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');


const createCommentElement = (comment) => {
  const li = document.createElement('li');
  li.className = 'social__comment';
  li.innerHTML = `
    <img
      class="social__picture"
      src="${comment.avatar}"
      alt="${comment.name}"
      width="35"
      height="35">
    <p class="social__text">${comment.message}</p>
  `;
  return li;
};


const openBigPicture = (photoData) => {

  bigPictureImg.src = photoData.url;
  bigPictureImg.alt = photoData.description;
  likesCount.textContent = photoData.likes;
  commentsCount.textContent = photoData.comments.length;
  socialCaption.textContent = photoData.description;


  socialComments.innerHTML = '';


  photoData.comments.forEach((comment) => {
    const commentElement = createCommentElement(comment);
    socialComments.appendChild(commentElement);
  });


  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');


  bigPicture.classList.remove('hidden');


  document.body.classList.add('modal-open');
};


const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
};


bigPictureCancel.addEventListener('click', closeBigPicture);


const onEscapePress = (evt) => {
  if (evt.key === 'Escape') {
    closeBigPicture();
  }
};


const addEscapeListener = () => {
  document.addEventListener('keydown', onEscapePress);
};

const removeEscapeListener = () => {
  document.removeEventListener('keydown', onEscapePress);
};


const originalOpenBigPicture = openBigPicture;
const openBigPictureWithEscape = (photoData) => {
  originalOpenBigPicture(photoData);
  addEscapeListener();
};

const originalCloseBigPicture = closeBigPicture;
const closeBigPictureWithEscape = () => {
  originalCloseBigPicture();
  removeEscapeListener();
};


export const openBigPictureModal = openBigPictureWithEscape;
export const closeBigPictureModal = closeBigPictureWithEscape;
