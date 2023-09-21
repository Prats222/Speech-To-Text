import 'regenerator-runtime/runtime';
import './App.css';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useState } from 'react';

const App = () => {
  const [copiedText, setCopiedText] = useState('');
  const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
  const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  const handleCopy = () => {
    setCopiedText(transcript);
    navigator.clipboard.writeText(transcript); // Copy to clipboard
  };

  return (
    <>
      <div className="container">
        <h2>Speech to Text ~ Prats</h2>
        <br />
        <p>Uses React-SpeechRecognition to identify speech and custom state to copy text.</p>

        <div className="main-content" onClick={handleCopy}>
          {transcript}
        </div>

        <div className="btn-style">
          <button onClick={handleCopy}>Copy to clipboard</button>
          <button onClick={startListening}>Start Listening</button>
          <button onClick={SpeechRecognition.stopListening}>Stop Listening</button>
        </div>

        {copiedText && <p>Copied: {copiedText}</p>}
      </div>
    </>
  );
};

export default App;
