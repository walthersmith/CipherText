import initTextScramble from './textScramble.js';
import { notification,updateCharCount, downloadEncryptedText} from './utils.js';
import {toggleTheme} from './corlorMode.js';
import {changeLang,initializeTranslations} from './translator.js';


document.addEventListener('DOMContentLoaded', () => {
    const textarea = document.getElementById('txtMessage');
    const downloadBtn = document.getElementById('downloadBtn');
    const colorMode = document.getElementById('theme-toggle');
    const btnEs = document.getElementById('btnEs');
    const btnEn = document.getElementById('btnEn');

    updateCharCount();
    textarea.addEventListener('input', updateCharCount); 
    downloadBtn.addEventListener('click', downloadEncryptedText);
    colorMode.addEventListener('click', toggleTheme);
    initializeTranslations()
    btnEs.addEventListener('click', function() {changeLang('es');});
    btnEn.addEventListener('click', function() {changeLang('en');});
    localStorage.setItem('lang', 'en');

    initTextScramble('txtMessage', 'btnEncrypt', 'btnDecrypt');
});


document.addEventListener('DOMContentLoaded', function() { 

   
});
