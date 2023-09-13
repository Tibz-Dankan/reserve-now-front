export const addCommasToNumber = (number) => {
  const numberString = number.toString();

  const numberArray = numberString.split("");

  let formattedNumber = "";

  for (let i = numberArray.length - 1, commaCount = 0; i >= 0; i--) {
    if (commaCount === 3) {
      formattedNumber = "," + formattedNumber;
      commaCount = 0;
    }

    formattedNumber = numberArray[i] + formattedNumber;
    commaCount++;
  }

  return formattedNumber;
};
