// Check if the Web Speech API is supported
const isSpeechRecognitionSupported = () => {
  return 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
};

const isSpeechSynthesisSupported = () => {
  return 'speechSynthesis' in window;
};

// Initialize the SpeechRecognition object
const initSpeechRecognition = () => {
  if (!isSpeechRecognitionSupported()) {
    console.error('Speech recognition is not supported by your browser.');
    return null;
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'en-US';
  
  return recognition;
};

// Initialize the SpeechSynthesis object
const initSpeechSynthesis = () => {
  if (!isSpeechSynthesisSupported()) {
    console.error('Speech synthesis is not supported by your browser.');
    return null;
  }
  
  return window.speechSynthesis;
};

// Speak text using the Web Speech API
const speakText = (text, voice = null, rate = 1, pitch = 1) => {
  if (!isSpeechSynthesisSupported()) {
    console.error('Speech synthesis is not supported by your browser.');
    return;
  }
  
  // Create a new SpeechSynthesisUtterance instance
  const utterance = new SpeechSynthesisUtterance(text);
  
  // Set the voice if provided, otherwise use the default voice
  if (voice) {
    utterance.voice = voice;
  }
  
  // Set rate and pitch
  utterance.rate = rate;
  utterance.pitch = pitch;
  
  // Speak the text
  window.speechSynthesis.speak(utterance);
  
  return utterance;
};

// Get available voices
const getVoices = () => {
  return new Promise((resolve) => {
    let voices = window.speechSynthesis.getVoices();
    
    if (voices.length) {
      resolve(voices);
    } else {
      // Wait for voices to be loaded
      window.speechSynthesis.onvoiceschanged = () => {
        voices = window.speechSynthesis.getVoices();
        resolve(voices);
      };
    }
  });
};

// Find a preferred voice by language and gender
const findVoice = async (language = 'en', gender = null) => {
  const voices = await getVoices();
  
  // Filter by language
  let filteredVoices = voices.filter(voice => voice.lang.startsWith(language));
  
  // If gender is specified, filter by gender
  if (gender && filteredVoices.length > 0) {
    const genderFiltered = filteredVoices.filter(voice => 
      voice.name.toLowerCase().includes(gender.toLowerCase())
    );
    
    if (genderFiltered.length > 0) {
      filteredVoices = genderFiltered;
    }
  }
  
  // Return the first matching voice or null if none found
  return filteredVoices.length > 0 ? filteredVoices[0] : null;
};

export {
  isSpeechRecognitionSupported,
  isSpeechSynthesisSupported,
  initSpeechRecognition,
  initSpeechSynthesis,
  speakText,
  getVoices,
  findVoice
}; 