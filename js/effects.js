const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_STEP = 25;

const imageUploadForm = document.querySelector('.img-upload__form');
const decreaseScaleButton = imageUploadForm.querySelector('.scale__control--smaller');
const increaseScaleButton = imageUploadForm.querySelector('.scale__control--bigger');
const currentScaleValue = imageUploadForm.querySelector('.scale__control--value');
const previewImage = imageUploadForm.querySelector('.img-upload__preview img');
const effectsButtonsList = imageUploadForm.querySelector('.effects__list');
const effectSliderContainer = imageUploadForm.querySelector('.effect-level__slider');
const effectCurrentValue = imageUploadForm.querySelector('.effect-level__value');

const EffectSettings = {
  NONE: {
    range: { min: 0, max: 1 },
    start: 1,
    step: 0.1,
    connect: 'lower',
    format: {
      to(val) { return val; },
      from(val) { return parseFloat(val); },
    },
  },
  CHROME: {
    range: { min: 0, max: 1 },
    start: 1,
    step: 0.1,
    connect: 'lower',
    format: {
      to(val) { return val.toFixed(1); },
      from(val) { return parseFloat(val); },
    },
  },
  SEPIA: {
    range: { min: 0, max: 1 },
    start: 1,
    step: 0.1,
    connect: 'lower',
    format: {
      to(val) { return val.toFixed(1); },
      from(val) { return parseFloat(val); },
    },
  },
  MARVIN: {
    range: { min: 0, max: 100 },
    start: 100,
    step: 1,
    connect: 'lower',
    format: {
      to(val) { return `${val}%`; },
      from(val) { return parseFloat(val); },
    },
  },
  PHOBOS: {
    range: { min: 0, max: 3 },
    start: 3,
    step: 0.1,
    connect: 'lower',
    format: {
      to(val) { return `${val.toFixed(1)}px`; },
      from(val) { return parseFloat(val); },
    },
  },
  HEAT: {
    range: { min: 1, max: 3 },
    start: 3,
    step: 0.1,
    connect: 'lower',
    format: {
      to(val) { return val.toFixed(1); },
      from(val) { return parseFloat(val); },
    },
  },
};

let currentActiveEffect = 'none';

const applyImageScale = (scalePercent) => {
  currentScaleValue.value = `${scalePercent}%`;
  const scaleCoefficient = scalePercent / 100;
  previewImage.style.transform = `scale(${scaleCoefficient})`;
};

/**
 * Обработчик события нажатия кнопки уменьшения масштаба
 */
const handleDecreaseScale = () => {
  const currentPercent = parseInt(currentScaleValue.value, 10);
  if (currentPercent > SCALE_MIN) {
    applyImageScale(currentPercent - SCALE_STEP);
  }
};

/**
 * Обработчик события нажатия кнопки увеличения масштаба
 */
const handleIncreaseScale = () => {
  const currentPercent = parseInt(currentScaleValue.value, 10);
  if (currentPercent < SCALE_MAX) {
    applyImageScale(currentPercent + SCALE_STEP);
  }
};

const enableScaleControls = () => {
  decreaseScaleButton.addEventListener('click', handleDecreaseScale);
  increaseScaleButton.addEventListener('click', handleIncreaseScale);
};

const disableScaleControls = () => {
  decreaseScaleButton.removeEventListener('click', handleDecreaseScale);
  increaseScaleButton.removeEventListener('click', handleIncreaseScale);
};

const setImageEffect = (effectId) => {
  let effectClassName;
  let effectSettings;
  let cssFilterName;

  switch (effectId) {
    case 'effect-none':
      effectClassName = 'effects__preview--none';
      cssFilterName = 'none';
      effectSliderContainer.setAttribute('hidden', true);
      effectSettings = EffectSettings.NONE;
      break;
    case 'effect-chrome':
      effectClassName = 'effects__preview--chrome';
      cssFilterName = 'grayscale';
      effectSliderContainer.removeAttribute('hidden');
      effectSettings = EffectSettings.CHROME;
      break;
    case 'effect-sepia':
      effectClassName = 'effects__preview--sepia';
      cssFilterName = 'sepia';
      effectSliderContainer.removeAttribute('hidden');
      effectSettings = EffectSettings.SEPIA;
      break;
    case 'effect-marvin':
      effectClassName = 'effects__preview--marvin';
      cssFilterName = 'invert';
      effectSliderContainer.removeAttribute('hidden');
      effectSettings = EffectSettings.MARVIN;
      break;
    case 'effect-phobos':
      effectClassName = 'effects__preview--phobos';
      cssFilterName = 'blur';
      effectSliderContainer.removeAttribute('hidden');
      effectSettings = EffectSettings.PHOBOS;
      break;
    case 'effect-heat':
      effectClassName = 'effects__preview--heat';
      cssFilterName = 'brightness';
      effectSliderContainer.removeAttribute('hidden');
      effectSettings = EffectSettings.HEAT;
      break;
    default:
      effectClassName = 'effects__preview--none';
      cssFilterName = 'none';
      effectSliderContainer.setAttribute('hidden', true);
      effectSettings = EffectSettings.NONE;
  }

  currentActiveEffect = cssFilterName;
  previewImage.className = '';
  previewImage.classList.add(effectClassName);
  effectSliderContainer.noUiSlider.updateOptions(effectSettings);
};

/**
 * Обработчик события выбора эффекта
 */
const handleEffectChange = (evt) => {
  if (evt.target.closest('.effects__item')) {
    setImageEffect(evt.target.id);
  }
};

/**
 * Обработчик события изменения значения слайдера эффекта
 */
const handleEffectSliderUpdate = () => {
  const sliderCurrentValue = effectSliderContainer.noUiSlider.get();
  effectCurrentValue.value = parseFloat(sliderCurrentValue);
  if (currentActiveEffect === 'none') {
    previewImage.style.filter = '';
  } else {
    previewImage.style.filter = `${currentActiveEffect}(${sliderCurrentValue})`;
  }
};

const setupEffectsSystem = () => {
  effectCurrentValue.value = 1;
  currentActiveEffect = 'none';
  noUiSlider.create(effectSliderContainer, EffectSettings.NONE);
  effectSliderContainer.setAttribute('hidden', true);
  effectsButtonsList.addEventListener('change', handleEffectChange);
  effectSliderContainer.noUiSlider.on('update', handleEffectSliderUpdate);
};

const clearAllEffects = () => {
  previewImage.className = '';
  previewImage.style.filter = '';
  previewImage.style.transform = 'scale(1)';
  currentScaleValue.value = '100%';
  effectCurrentValue.value = 1;
  currentActiveEffect = 'none';
  const defaultEffectRadio = imageUploadForm.querySelector('#effect-none');
  if (defaultEffectRadio) {
    defaultEffectRadio.checked = true;
  }

  if (effectSliderContainer.noUiSlider) {
    effectSliderContainer.noUiSlider.destroy();
  }
};

export {
  enableScaleControls,
  disableScaleControls,
  setupEffectsSystem,
  clearAllEffects,
};
