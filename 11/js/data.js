import { getRandomInteger, getRandomArrayElement, createRandomIdFromRangeGenerator } from './util.js';

// Исходные данные
const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const names = [
  'Алексей', 'Мария', 'Иван', 'Ольга', 'Дмитрий', 'Екатерина', 'Сергей', 'Анна', 'Никита', 'Юлия',
  'Владимир', 'Наталья', 'Максим', 'Татьяна', 'Андрей', 'Елена', 'Роман', 'Алиса', 'Павел', 'Ирина',
  'Евгений', 'Ксения', 'Артур', 'Вероника', 'Георгий', 'Светлана', 'Тимур', 'Полина', 'Лев', 'Дарья'
];

const descriptions = [
  'Тёплый летний вечер у моря',
  'Вид на город с высоты птичьего полёта',
  'Мгновение тишины в горах',
  'Солнечный день в парке',
  'Друзья на отдыхе',
  'Пойманный момент счастья',
  'Закат, который хочется запомнить',
  'Путешествие начинается',
  'Лучшие воспоминания лета',
  'Просто красивый кадр',
  'Тишина перед бурей',
  'Небо, солнце и немного свободы',
  'Мгновение вдохновения',
  'Когда всё идеально',
  'Путь домой',
  'Море, солнце и немного ветра',
  'Один кадр — тысяча эмоций',
  'Случайная прогулка',
  'Город засыпает',
  'Уютное утро с чашкой кофе',
];

const generateRandomUniqueId = createRandomIdFromRangeGenerator(1, 1000);
const generatePhotoId = createRandomIdFromRangeGenerator(1, 25);

const createComment = () => ({
  id: generateRandomUniqueId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomArrayElement(messages),
  name: getRandomArrayElement(names)
});

const createAnswer = () => {
  const id = generatePhotoId();
  const commentsCount = getRandomInteger(0, 30);
  const comments = Array.from({ length: commentsCount }, createComment);

  return {
    id,
    url: `photos/${id}.jpg`,
    description: getRandomArrayElement(descriptions),
    likes: getRandomInteger(15, 200),
    comments
  };
};

// Генерация массива из 25 фото
export const photos = Array.from({ length: 25 }, createAnswer);
