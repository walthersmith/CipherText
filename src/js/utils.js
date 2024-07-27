/**
 * @author Walther Smith 
 * @version 1.0.0
 * @date 2024-07-11
 * @license MIT License
 */

function isEmpty(text){
    return text.trim() == ''? true : false;
}

function notification(elementId,message,classNotif){
    var notification = document.getElementById(elementId);
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

function existSpecialCharacters(text){
    return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(text);
}

function existAccentedCharacters(text) {
    return /[áàâäãåāăąéèêëēĕėęěíìîïīįıóòôöõøōőœúùûüūůűųýÿŷÁÀÂÄÃÅĀĂĄÉÈÊËĒĔĖĘĚÍÌÎÏĪĮIÓÒÔÖÕØŌŐŒÚÙÛÜŪŮŰŲÝŸŶ]/.test(text);
}



function downloadEncryptedText() {
    const textarea = document.getElementById('txtMessage');
    const text = textarea.value;
    
    if (text.trim() === '') {
        notification("notification",'⚠️ Please encrypt/decrypt some text before downloading.','showError');
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

export {isEmpty,
    notification,
    updateCharCount,
    downloadEncryptedText,
    existSpecialCharacters,
    existAccentedCharacters };