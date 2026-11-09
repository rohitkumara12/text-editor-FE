import { useState } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState<string>("");
  const [searchWord, setSearchWord] = useState<string>("");
  const [replaceWord, setReplaceWord] = useState<string>("");
  const [outputText, setOutputText] = useState<string>("");

  const wordCount =
    text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

  const handleReplace = () => {
    const escapedSearchWord = searchWord
      .trim()
      .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    if (!searchWord.trim()) {
      setOutputText(text);
      return;
    }

    const result = text.replace(
      new RegExp(`\\b${escapedSearchWord}\\b`, "gi"),
      replaceWord
    );

    setOutputText(result);
  };

  return (
    <main className="app">
      <header className="header">
        <h1>Text Editor</h1>
        <p>Find and replace words in your text.</p>
      </header>

      <section className="editor-container">
        <div className="editor-section">
          <label htmlFor="inputText">Input Text</label>

          <textarea
            id="inputText"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write your text here..."
          />

          <p className="word-count">Word count: {wordCount}</p>
        </div>

        <div className="editor-section">
          <label htmlFor="outputText">Output Text</label>

          <textarea
            id="outputText"
            value={outputText}
            readOnly
            placeholder="Your result will appear here..."
          />
        </div>
      </section>

      <section className="replace-section">
        <h2>Find & Replace</h2>

        <div className="replace-inputs">
          <div className="input-group">
            <label htmlFor="searchWord">Find Word</label>
            <input
              id="searchWord"
              type="text"
              value={searchWord}
              onChange={(e) => setSearchWord(e.target.value)}
              placeholder="Enter word to find..."
            />
          </div>

          <div className="input-group">
            <label htmlFor="replaceWord">Replace With</label>
            <input
              id="replaceWord"
              type="text"
              value={replaceWord}
              onChange={(e) => setReplaceWord(e.target.value)}
              placeholder="Enter replacement..."
            />
          </div>
        </div>

        <div className="button-container">
          <button onClick={handleReplace}>Replace</button>
        </div>
      </section>
    </main>
  );
}

export default App;