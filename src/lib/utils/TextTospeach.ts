
const speech = new SpeechSynthesisUtterance()

function TextToSpeech(text: string) {
    speech.text = text
    console.log('start')
    window.speechSynthesis.speak(speech)
    console.log('done')
}

function AvailableVoices() {
    const voices = window.speechSynthesis.getVoices();
    return voices
}

export {
    TextToSpeech,
    AvailableVoices
}