import { renderPictures } from './picture-rendering.js';
import { initializeFilters } from './filters.js';
import { getData } from './server.js';
import { setupImageUploadForm } from './image-upload.js';

// Загрузка данных
getData((photos) => {
  renderPictures(photos);
  initializeFilters(photos);
}, () => {
});

setupImageUploadForm();
