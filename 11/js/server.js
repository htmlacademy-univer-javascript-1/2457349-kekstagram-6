// Эндпоинты для работы с сервером
const Endpoints = {
  DATA: 'https://29.javascript.htmlacademy.pro/kekstagram/data',
  UPLOAD: 'https://29.javascript.htmlacademy.pro/kekstagram',
};

/**
 * Получает данные фотографий с сервера
 * @param {Function} onSuccess - Коллбэк при успехе
 * @param {Function} onError - Коллбэк при ошибке
 */
const fetchPhotosData = (onSuccess, onError) => {
  fetch(Endpoints.DATA)
    .then((response) => response.json())
    .then((photosData) => onSuccess(photosData))
    .catch(() => onError('Не удалось загрузить данные с сервера'));
};

/**
 * Отправляет данные фотографии на сервер
 * @param {Function} onSuccess - Коллбэк при успехе
 * @param {Function} onError - Коллбэк при ошибке
 * @param {FormData} photoFormData - Данные формы
 */
const submitPhotoData = (onSuccess, onError, photoFormData) => {
  fetch(Endpoints.UPLOAD, {
    method: 'POST',
    body: photoFormData,
  })
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onError('Ошибка при отправке фотографии');
      }
    })
    .catch(() => onError('Ошибка при отправке фотографии'));
};

export { fetchPhotosData, submitPhotoData };
