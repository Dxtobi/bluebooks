function TextToSpeech(text: string) {
  if (import.meta.env.SSR) {
    // Running on the server, do nothing or provide an alternative implementation
    return;
  }

  const speech = new SpeechSynthesisUtterance();
  speech.text = text;

  window.speechSynthesis.speak(speech);
}


function AvailableVoices() {
  if (import.meta.env.SSR) {
    // Running on the server, return an empty array or an alternative implementation
    return [];
  }

  const voices = window.speechSynthesis.getVoices();
  return voices;
}

export {
  TextToSpeech,
  AvailableVoices
}
