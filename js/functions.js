const islongenough = function (string, length) {
  if (string.length <= length){
    return true;
  }
  return false;
};

const ispalyndrome = function (string) {
  const noSpacesLowercase = string.replaceAll(' ', '').toLowerCase();
  let reversed = '';
  for (let i = noSpacesLowercase.length - 1; i >= 0; i--){
    reversed += noSpacesLowercase[i];
  }
  if (reversed === noSpacesLowercase){
    return true;
  }
  return false;
};

function extraxtAllNumbers(input) {
  const str = input.toString();
  let resultStr = '';
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const num = parseInt(char, 10);
    if (!Number.isNaN(num)) {
      resultStr += num;
    }
  }

  let resultNum = parseInt(resultStr);

  return resultNum;
}

