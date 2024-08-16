/**
 * @file this file contains function to encrypt and decrypt text 
 * @author Walther Smith 
 * @version 1.0.0
 * @date 2024-07-11
 * @license MIT License
 */
import { updateCharCount, hasSpecialCharacters, hasAccentedCharacters } from './utils.js';


function encryptText() {     
    let encryptedText = [];
    splitInWords().forEach(element => {
        encryptedText.push(encrypt(element))
    });
    document.getElementById('txtMessage').value = encryptedText.join(' ');
    updateCharCount();
}

function decryptText() {     
    let encryptedText = [];
    splitInWords().forEach(element => {
        encryptedText.push(decrypt(element))
    });
    document.getElementById('txtMessage').value = encryptedText.join(' ');
    updateCharCount();
}

function validateText(text) {
    return text.toLowerCase();
}

function splitInWords() {
    const textArea = document.getElementById('txtMessage');
    const text = validateText(textArea.value);
    return text.split(" ");
}

function encrypt(word){    
    let encryptedWord = []
    for (let i = 0; i < word.length; i++) {
        encryptedWord.push(cipherRules(word[i]));
    }
    return encryptedWord.join('');
}

function cipherRules(letter){
    switch(letter){
        case "e":
            return "enter";
        case "i":
            return "imes"
        case "a":
            return "ai"
        case "o":
            return "ober"
        case "u":
            return "ufat"
        default:
            return letter;
    }
    
}

/*    DECYPHER  RUTINE
 */function decrypt(text) {
    const rules = { 'enter': 'e', 'imes': 'i', 'ai': 'a', 'ober': 'o', 'ufat': 'u' };
    const pattern = new RegExp(Object.keys(rules).join('|'), 'g');
    return (function recursiveDecrypt(input) {
        const decrypted = input.replace(pattern, match => rules[match]);
        return decrypted === input ? decrypted : recursiveDecrypt(decrypted);
    })(text);
}
 
export { encryptText, decryptText, encrypt, decrypt };