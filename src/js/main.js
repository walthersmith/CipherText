import initTextScramble from './textScramble.js';
import { notification,updateCharCount, downloadEncryptedText} from './utils.js';


document.addEventListener('DOMContentLoaded', () => {
    const textarea = document.getElementById('txtMessage');
    const downloadBtn = document.getElementById('downloadBtn');
    updateCharCount();
    textarea.addEventListener('input', updateCharCount); 
    downloadBtn.addEventListener('click', downloadEncryptedText);

    initTextScramble('txtMessage', 'btnEncrypt', 'btnDecrypt');
});

export function copyText() {
    var textarea = document.getElementById("txtMessage");    
    textarea.select();
    document.execCommand("copy");
    notification("notification",'Message copied ✅','showInfo');
}

window.copyText = copyText;