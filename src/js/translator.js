// Object to store translations
const translations = {
  es: {},
  en: {}
};

// Function to initialize translations
function initializeTranslations() {
  document.querySelectorAll('[data-translate]').forEach(element => {
      const key = element.id || element.tagName + '-' + Math.random().toString(36).substr(2, 9);
      translations.en[key] = element.tagName === 'INPUT' || element.tagName === 'TEXTAREA' 
          ? element.placeholder 
          : element.textContent.trim();
  });
}

// Function to translate
async function translate(text, targetLanguage) {
  const sourceLanguage = targetLanguage === 'en' ? 'es' : 'en';
  try {
      const translation = await translateText(text, sourceLanguage, targetLanguage);
      return translation;
  } catch (error) {
      // console.error("Translation error:", error);
      return text; // Returns the original text if there's an error
  }
}

async function translateText(text, sourceLanguage, targetLanguage) {
  try {
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLanguage}&tl=${targetLanguage}&dt=t&q=${encodeURIComponent(text)}`;
      
      const response = await fetch(url);
      if (!response.ok) {
          throw new Error(`Error getting translation: ${response.statusText}`);
      }
      const data = await response.json();
      return data[0][0][0]; // Returns the translation
  } catch (error) {
      // console.error("Error translating:", error);
      throw error; // Re-throws the error to be handled in the translate function
  }
}

// Function to change the language
async function changeLang(language) { 
  const sourceLanguage = language === 'es' ? 'en' : 'es';
  const targetLanguage = language;
  if(language === 'es'){
      document.getElementById('btnEn').classList.remove('selected');
      document.getElementById('btnEs').classList.add('selected');
  }else{
      document.getElementById('btnEs').classList.remove('selected'); 
      document.getElementById('btnEn').classList.add('selected'); 
  }

  for (const [key, text] of Object.entries(translations[sourceLanguage])) {
      if (!translations[targetLanguage][key]) {
          translations[targetLanguage][key] = await translate(text, targetLanguage);
      }

      const element = document.getElementById(key) || document.querySelector(`[data-translate="${key}"]`);
      if (element) { 
          if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
              element.placeholder = translations[targetLanguage][key];
          } else {
              element.textContent = translations[targetLanguage][key];
          }
      }
  }
}

export {changeLang, initializeTranslations};