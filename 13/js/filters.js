import { debounce } from './util.js';
import { renderPictures } from './picture-rendering.js';


const RANDOM_PHOTOS_COUNT = 10;
const FILTER_DELAY = 500;

const filtersContainer = document.querySelector('.img-filters');
const filterButtons = document.querySelectorAll('.img-filters__button');
const picturesContainer = document.querySelector('.pictures');

let currentPhotos = [];
let selectedFilter = 'filter-default';


const getDefaultPhotos = (photos) => [...photos];


const getRandomPhotos = (photos) => {
  const shuffled = [...photos];
  const result = [];
  const count = Math.min(RANDOM_PHOTOS_COUNT, shuffled.length);

  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * shuffled.length);
    result.push(shuffled[randomIndex]);
    shuffled.splice(randomIndex, 1);
  }

  return result;
};

const getDiscussedPhotos = (photos) =>
  [...photos].sort((a, b) => b.comments.length - a.comments.length);

const applyFilter = (photos, filter) => {
  switch (filter) {
    case 'filter-random':
      return getRandomPhotos(photos);
    case 'filter-discussed':
      return getDiscussedPhotos(photos);
    case 'filter-default':
    default:
      return getDefaultPhotos(photos);
  }
};


const rerenderPhotos = () => {
  const oldPictures = picturesContainer.querySelectorAll('.picture');
  oldPictures.forEach((picture) => picture.remove());

  const filteredPhotos = applyFilter(currentPhotos, selectedFilter);
  renderPictures(filteredPhotos);
};

const debouncedRerender = debounce(rerenderPhotos, FILTER_DELAY);

const handleFilterButtonClick = (evt) => {
  if (!evt.target.classList.contains('img-filters__button')) {
    return;
  }

  filterButtons.forEach((btn) => {
    btn.classList.remove('img-filters__button--active');
  });

  evt.target.classList.add('img-filters__button--active');
  selectedFilter = evt.target.id;
  debouncedRerender();
};

const initializeFilters = (photos) => {
  currentPhotos = photos;
  filtersContainer.classList.remove('hidden');
  filtersContainer.classList.remove('img-filters--inactive');
  filtersContainer.addEventListener('click', handleFilterButtonClick);

  const defaultButton = filtersContainer.querySelector('#filter-default');
  if (defaultButton) {
    defaultButton.classList.add('img-filters__button--active');
  }
};

export { initializeFilters };
