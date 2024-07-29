import initTextScramble from './textScramble.js';
import { notification,updateCharCount, downloadEncryptedText} from './utils.js';
import {toggleTheme} from './corlorMode.js';


document.addEventListener('DOMContentLoaded', () => {
    const textarea = document.getElementById('txtMessage');
    const downloadBtn = document.getElementById('downloadBtn');
    const colorMode = document.getElementById('theme-toggle');
    updateCharCount();
    textarea.addEventListener('input', updateCharCount); 
    downloadBtn.addEventListener('click', downloadEncryptedText);
    colorMode.addEventListener('click', toggleTheme);

    initTextScramble('txtMessage', 'btnEncrypt', 'btnDecrypt');
});

