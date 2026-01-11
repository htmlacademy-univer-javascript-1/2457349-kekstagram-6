const BASE_URL = 'https://29.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные с сервера',
  SEND_DATA: 'Ошибка при отправке фотографии',
};

const load = (route, errorText, method = Method.GET, body = null, onSuccess, onError) => {
  fetch(`${BASE_URL}${route}`, { method, body })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      onError(errorText);
    });
};

const getData = (onSuccess, onError) => load(Route.GET_DATA, ErrorText.GET_DATA, Method.GET, null, onSuccess, onError);

const sendData = (body, onSuccess, onError) => load(Route.SEND_DATA, ErrorText.SEND_DATA, Method.POST, body, onSuccess, onError);

export { getData, sendData };
