import { fetchPhotosData } from './server.js';
import { renderPictures } from './picture-rendering.js';
import './big-picture.js';
import { setupImageUploadForm } from './pristine-validation.js';
import { initializeFilters } from './filters.js';

const displayErrorNotification = (message) => {
  const alertBox = document.createElement('div');
  alertBox.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    padding: 10px 3px;
    font-size: 20px;
    text-align: center;
    background-color: red;
    color: white;
  `;
  alertBox.textContent = message;
  document.body.appendChild(alertBox);
  setTimeout(() => {
    alertBox.remove();
  }, 5000);
};

fetchPhotosData(
  (photosArray) => {
    renderPictures(photosArray);
    initializeFilters(photosArray);
  },
  (errorMsg) => {
    displayErrorNotification(errorMsg);
  }
);

setupImageUploadForm();
