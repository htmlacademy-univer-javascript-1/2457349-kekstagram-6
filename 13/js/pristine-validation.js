import {
  enableScaleControls,
  disableScaleControls,
  setupEffectsSystem,
  clearAllEffects,
} from './effects.js';
import { submitPhotoData } from './server.js';


const HASHTAG_MAX_LENGTH = 20;
const HASHTAG_COUNT_LIMIT = 5;


function setupImageUploadForm() {
  const uploadFormElement = document.querySelector('.img-upload__form');
  const imageFileInput = uploadFormElement.querySelector('.img-upload__input');
  const editOverlay = document.querySelector('.img-upload__overlay');
  const closeEditButton = editOverlay.querySelector('#upload-cancel');
  const hashtagInput = uploadFormElement.querySelector('.text__hashtags');
  const commentTextarea = uploadFormElement.querySelector('.text__description');
  const previewImage = uploadFormElement.querySelector('.img-upload__preview img');

  let currentValidationError = '';


  // Инициализация валидатора
  const validator = new Pristine(uploadFormElement, {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'img-upload__field-wrapper--invalid',
    successClass: 'img-upload__field-wrapper--valid',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'span',
    errorTextClass: 'img-upload__error',
  });


  const getValidationError = () => currentValidationError;


  const validateCommentLength = (commentText) => {
    const maxCommentLength = 140;
    return commentText.length <= maxCommentLength;
  };


  const displayUploadForm = () => {

    if (!imageFileInput.files || !imageFileInput.files[0]) {
      return;
    }

    const selectedFile = imageFileInput.files[0];

    const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];

    if (!validImageTypes.includes(selectedFile.type)) {
      return;
    }

    const imageUrl = URL.createObjectURL(selectedFile);

    previewImage.src = imageUrl;

    editOverlay.classList.remove('hidden');
    document.body.classList.add('modal-open');
    enableScaleControls();
    setupEffectsSystem();
  };


  const showSuccessModal = () => {
    const successTemplate = document.querySelector('#success');
    const successElement = successTemplate.content.cloneNode(true);
    document.body.appendChild(successElement);

    const successModal = document.querySelector('.success');
    const successButton = document.querySelector('.success__button');

    const closeSuccess = () => {
      successModal.remove();
    };

    const handleSuccessEsc = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        closeSuccess();
      }
    };

    const handleSuccessOverlay = (evt) => {
      if (evt.target === successModal) {
        closeSuccess();
      }
    };

    successButton.addEventListener('click', closeSuccess);
    document.addEventListener('keydown', handleSuccessEsc);
    document.addEventListener('click', handleSuccessOverlay);
  };


  const showErrorModal = (errorMessage) => {
    const errorTemplate = document.querySelector('#error');
    const errorElement = errorTemplate.content.cloneNode(true);
    document.body.appendChild(errorElement);

    const errorModal = document.querySelector('.error');
    const errorTitle = document.querySelector('.error__title');
    const errorButton = document.querySelector('.error__button');

    errorTitle.textContent = errorMessage;

    const closeError = () => {
      errorModal.remove();
    };

    const handleErrorEsc = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        closeError();
      }
    };

    const handleErrorOverlay = (evt) => {
      if (evt.target === errorModal) {
        closeError();
      }
    };

    errorButton.addEventListener('click', closeError);
    document.addEventListener('keydown', handleErrorEsc);
    document.addEventListener('click', handleErrorOverlay);
  };


  // Функция закрытия формы
  const hideUploadForm = () => {
    editOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    uploadFormElement.reset();
    validator.reset();
    imageFileInput.value = '';
    const submitBtn = uploadFormElement.querySelector('.img-upload__submit');
    submitBtn.disabled = false;
    submitBtn.removeAttribute('title');
    submitBtn.textContent = 'Опубликовать';
    disableScaleControls();
    clearAllEffects();
  };


  const validateHashtagsInput = (hashtagText) => {
    currentValidationError = '';
    const text = hashtagText.trim();

    if (!text) {
      return true;
    }

    // Разделить по пробелам
    const tags = text.split(/\s+/);

    // Проверка 1: каждый должен начинаться с #
    if (tags.some((tag) => !tag.startsWith('#'))) {
      currentValidationError = 'Хэш-тег должен начинаться с символа #';
      return false;
    }

    // Проверка 2: нет дубликатов (case-insensitive)
    const lowerTags = tags.map((t) => t.toLowerCase());
    if (lowerTags.length !== new Set(lowerTags).size) {
      currentValidationError = 'Хэш-теги не должны повторяться';
      return false;
    }

    // Проверка 3: максимум 5 хэштегов
    if (tags.length > HASHTAG_COUNT_LIMIT) {
      currentValidationError = `Нельзя указать больше ${HASHTAG_COUNT_LIMIT} хэш-тегов`;
      return false;
    }

    // Проверка 4: максимум 20 символов
    if (tags.some((tag) => tag.length > HASHTAG_MAX_LENGTH)) {
      currentValidationError = `Максимальная длина одного хэш-тега ${HASHTAG_MAX_LENGTH} символов`;
      return false;
    }

    // Проверка 5: только буквы и цифры после #
    if (tags.some((tag) => !/^#[a-zа-яё0-9]+$/i.test(tag))) {
      currentValidationError = 'Хэш-тег содержит недопустимые символы';
      return false;
    }

    return true;
  };


  const updateSubmitButtonState = () => {
    const submitButton = uploadFormElement.querySelector('.img-upload__submit');
    const isFormValid = validator.validate();


    submitButton.disabled = !isFormValid;
    if (!isFormValid) {
      submitButton.setAttribute('title', 'Исправьте ошибки в форме');
    } else {
      submitButton.removeAttribute('title');
    }
  };


  const onHashtagFieldInput = () => {
    validator.validate();
    updateSubmitButtonState();
  };


  const onCommentFieldInput = () => {
    validator.validate();
    updateSubmitButtonState();
  };


  const handleDocumentEscape = (event) => {
    if (event.key === 'Escape') {
      hideUploadForm();
    }
  };


  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!validator.validate()) {
      return;
    }

    const submitBtn = uploadFormElement.querySelector('.img-upload__submit');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Публикую...';

    submitPhotoData(
      new FormData(uploadFormElement),
      () => {
        hideUploadForm();
        showSuccessModal();
      },
      (errorMessage) => {
        showErrorModal(errorMessage);
        submitBtn.disabled = false;
        submitBtn.textContent = 'Опубликовать';
      }
    );
  };


  // Регистрация валидаторов
  validator.addValidator(
    hashtagInput,
    validateHashtagsInput,
    getValidationError,
    2,
    false
  );


  validator.addValidator(
    commentTextarea,
    validateCommentLength,
    'Комментарий не должен превышать 140 символов',
    2,
    false
  );


  // Присоединение обработчиков событий
  imageFileInput.addEventListener('change', displayUploadForm);
  closeEditButton.addEventListener('click', hideUploadForm);
  document.addEventListener('keydown', handleDocumentEscape);


  [hashtagInput, commentTextarea].forEach((inputField) => {
    inputField.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
      }
    });
  });


  hashtagInput.addEventListener('input', onHashtagFieldInput);
  commentTextarea.addEventListener('input', onCommentFieldInput);
  uploadFormElement.addEventListener('submit', handleFormSubmit);


  // Начальная проверка состояния
  updateSubmitButtonState();
}


export { setupImageUploadForm };
