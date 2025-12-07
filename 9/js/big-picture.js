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


const updateCommentCount = () => {
  const commentCountSpan = socialCommentCount.querySelector('.comments-count');
  commentCountSpan.textContent = currentPhoto.comments.length;


  socialCommentCount.childNodes[0].nodeValue = `${displayedCommentsCount} из `;
};


const loadMoreComments = () => {
  if (!currentPhoto){
    return;
  }
  const comments = currentPhoto.comments;
  const remainingComments = comments.slice(
    displayedCommentsCount,
    displayedCommentsCount + COMMENTS_PER_LOAD
  );

  remainingComments.forEach((comment) => {
    const commentElement = createCommentElement(comment);
    socialComments.appendChild(commentElement);
  });

  displayedCommentsCount += remainingComments.length;
  updateCommentCount();


  if (displayedCommentsCount >= comments.length) {
    commentsLoader.classList.add('hidden');
  }
};


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


const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  currentPhoto = null;
  displayedCommentsCount = 0;
};


bigPictureCancel.addEventListener('click', closeBigPicture);


commentsLoader.addEventListener('click', loadMoreComments);


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

const openBigPictureWithEscape = (photoData) => {
  openBigPicture(photoData);
  addEscapeListener();
};

const closeBigPictureWithEscape = () => {
  closeBigPicture();
  removeEscapeListener();
};

export const openBigPictureModal = openBigPictureWithEscape;
export const closeBigPictureModal = closeBigPictureWithEscape;
