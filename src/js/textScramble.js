import { encryptText, decryptText, encrypt, decrypt } from './cipherText.js';
import { isEmpty,notification } from './utils.js';

class TextScramble {
    constructor(el) {
      this.el = el;
      this.chars = '!<>-_\\/[]{}—=+*^?#________';
      this.update = this.update.bind(this);
    }
    
    setText(newText) {
      const oldText = this.el.value;
      const length = Math.max(oldText.length, newText.length);
      return new Promise((resolve) => {
        this.queue = Array.from({length}, (_, i) => ({
          from: oldText[i] || '',
          to: newText[i] || '',
          start: Math.floor(Math.random() * 40),
          end: Math.floor(Math.random() * 40) + 40
        }));
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.resolve = resolve;
        this.update();
      });
    }
    
    update() {
      let output = '';
      let complete = 0;
      for (const { from, to, start, end, char } of this.queue) {
        if (this.frame >= end) {
          complete++;
          output += to;
        } else if (this.frame >= start) {
          if (!char || Math.random() < 0.28) {
            this.queue[complete].char = this.randomChar();
          }
          output += this.queue[complete].char;
        } else {
          output += from;
        }
      }
      this.el.value = output;
      if (complete === this.queue.length) {
        this.resolve();
      } else {
        this.frameRequest = requestAnimationFrame(this.update);
        this.frame++;
      }
    }
    
    randomChar() {
      return this.chars[Math.floor(Math.random() * this.chars.length)];
    }

    async startScramble(isEncrypt = true) {
        const originalText = this.el.value;
        let processedText;
        if(!isEmpty(originalText)){
            if (isEncrypt) {
                encryptText(); 
                processedText = this.el.value;
            } else {
                decryptText(); 
                processedText = this.el.value;
            }    
            await this.setText('_'.repeat(originalText.length));
            await new Promise(resolve => setTimeout(resolve, 100));
            await this.setText(processedText);
        }else{
            notification("notification",'⚠️ Please enter some text','showError');
        }
      }
  }
  
  const initTextScramble = (textareaId, encryptButtonId, decryptButtonId) => {
    const textarea = document.getElementById(textareaId);
    const encryptButton = document.getElementById(encryptButtonId);
    const decryptButton = document.getElementById(decryptButtonId);
    const fx = new TextScramble(textarea);
  
    encryptButton.addEventListener('click', () => fx.startScramble(true));
    decryptButton.addEventListener('click', () => fx.startScramble(false));
  };
  
  export default initTextScramble;