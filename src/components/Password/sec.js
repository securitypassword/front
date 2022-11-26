var CryptoJS = require("crypto-js");

var key="i forgor :skull:"

export function de(text){
    return CryptoJS.DES.decrypt(text.replace(/-/g, '+').replace(/_/g, '/'), key).toString(CryptoJS.enc.Utf8)
  }
  export function en(text){
    return CryptoJS.DES.encrypt(text, key).toString().replace(/\+/g, '-').replace(/\//g, '_')
  }
  //hacer que una string no cause probelmas en html
export function safe(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
} 
