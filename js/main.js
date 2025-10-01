const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

function createRandomIdFromRangeGenerator (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

const generateRandomUniqueId = createRandomIdFromRangeGenerator(1, 1000);

const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const names = ['Алексей', 'Мария', 'Иван', 'Ольга', 'Дмитрий', 'Екатерина', 'Сергей', 'Анна', 'Никита', 'Юлия',
  'Владимир', 'Наталья', 'Максим', 'Татьяна', 'Андрей', 'Елена', 'Роман', 'Алиса', 'Павел', 'Ирина',
  'Евгений', 'Ксения', 'Артур', 'Вероника', 'Георгий', 'Светлана', 'Тимур', 'Полина', 'Лев', 'Дарья'];

const createComment = () => ({
  id: generateRandomUniqueId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: `${getRandomArrayElement(messages)}`,
  name: `${getRandomArrayElement(names)}`
});

const generatePhotoId = createRandomIdFromRangeGenerator(1, 25);

const createAnswer = () => {
  const id = generatePhotoId();
  const commentsCount = getRandomInteger(0, 30);
  const comments = Array.from({ length: commentsCount }, createComment);

  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: `Описание фотографии №${id}`,
    likes: getRandomInteger(15, 200),
    comments: comments
  };
};

Array.from({length: 25}, createAnswer);
