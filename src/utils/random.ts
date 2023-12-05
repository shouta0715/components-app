const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const symbols = "!@#$%^&*_-+=";

const char = alphabet + numbers + symbols;
const codeType = ["React", "Vue", "Angular", "HTML"];

export const randomNum = (max = 1000, min = 0) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const randomBool = () => {
  return Math.random() >= 0.5;
};

export const randomString = () => {
  const length = randomNum(10, 5);
  let result = "";

  Array.from({ length }).forEach(() => {
    result += char[randomNum(char.length - 1)];
  });

  return result;
};

export const randomCodeType = () => {
  return codeType[randomNum(codeType.length - 1)];
};

export const randomCommand = () => {
  return `npm install ${randomString()}`;
};

export const randomEmail = () => {
  return `${randomString()}@${randomString()}.com`;
};
