/**
 * @author Walther Smith 
 * @version 1.0.0
 * @date 2024-07-11
 * @license MIT License
 */
import {translate} from './translator.js'


function isEmpty(text){
    return text.trim() == ''? true : false;
}

async function notification(elementId,message,classNotif){
    var notification = document.getElementById(elementId);
    //translation
    let lang = localStorage.getItem('lang'); 
    message = await translate(message, lang);

    notification.textContent =  message;
    notification.classList.add(classNotif);
    setTimeout(function() {
        notification.classList.remove(classNotif);
    }, 2000);
}


function updateCharCount() {
    const textarea = document.getElementById('txtMessage');
    const charCount = document.getElementById('charCount');
    const currentLength = textarea.value.length;
    textarea.maxlent
    charCount.textContent = `${currentLength}`;
}

function hasNumbers(text) {
    const numbersRegex = /[0-9]/;
    return numbersRegex.test(text);
}

function hasSpecialCharacters(text) {
    const specialCharsRegex = /[^a-z \r\n]/;
    return specialCharsRegex.test(text);
}

function hasAccentedCharacters(text) {
    const accentedCharsRegex = /[À-ÿ[^Ññ]]/;
    return accentedCharsRegex.test(text);
}

function hasUppercaseCharacters(text) {
    const uppercaseCharsRegex = /[A-Z]/;
    return uppercaseCharsRegex.test(text);
}



function downloadEncryptedText() {
    const textarea = document.getElementById('txtMessage');
    const text = textarea.value;
    
    if (text.trim() === '') {
        notification("notification",'❗ Please encrypt/decrypt some text before downloading.','showError');
        return;
    }

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'CipherText.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function copyText() {
    if (isEmpty(document.getElementById("txtMessage").value)) {
        notification("notification",'🙂 There is nothing to copy.','showError');
        return;
    }
    var textarea = document.getElementById("txtMessage");    
    textarea.select();
    document.execCommand("copy");
    notification("notification",'Message copied ✅','showInfo');
}

function clearText() {
    var textarea = document.getElementById("txtMessage");
    textarea.value = "";
    updateCharCount();
}   

function playEncryptionSound() {
    var audio = new Audio('src/assets/audio/sounds/Padlock.mp3');
    audio.volume = 0.1;
    audio.play();
}
function playDencryptionSound() {
    var audio = new Audio('src/assets/audio/sounds/Padlock_Unlock.mp3');
    audio.volume = 0.1;
    audio.play();
}

window.copyText = copyText;
window.clearText = clearText;

const svg = document.getElementById('smileyFace');
const elements = svg.querySelectorAll('circle, path');

// Almacenar los colores originales
const originalColors = Array.from(elements).map(el => ({
  element: el,
  fill: el.getAttribute('fill')
}));

function getRandomPastelColor() {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 100%, 80%)`;
}

function changeColors() {
  elements.forEach(el => {
    if (el.getAttribute('fill') !== 'none') {
      el.setAttribute('fill', getRandomPastelColor());
    }
  });
}

function restoreColors() {
  originalColors.forEach(item => {
    item.element.setAttribute('fill', item.fill);
  });
}

let intervalId;

svg.addEventListener('mouseenter', () => {
  intervalId = setInterval(changeColors, 30);
});

svg.addEventListener('mouseleave', () => {
  clearInterval(intervalId);
  restoreColors();
});






export {isEmpty,
    notification,
    updateCharCount,
    downloadEncryptedText,
    hasSpecialCharacters,
    hasAccentedCharacters,
    hasUppercaseCharacters,
    hasNumbers,
    copyText,
    clearText,
    playEncryptionSound,
    playDencryptionSound
 };