"use server"


import CryptoJS from 'crypto-js';

const generateHash = (message) => {
  const hash = CryptoJS.HmacSHA256(message, process.env.ESEWA_TEST_SECRET);
  const hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
  return hashInBase64;
};

export default generateHash;

