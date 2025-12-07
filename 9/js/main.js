import { photos } from './data.js';
import { renderPictures } from './picture-rendering.js';
import './big-picture.js';
import { setupImageUploadForm } from './pristine-validation.js';


renderPictures(photos);
setupImageUploadForm();
