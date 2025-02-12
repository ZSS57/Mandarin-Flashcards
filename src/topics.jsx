import React, { useState, useEffect } from 'react';
import festivalContent from './festivalContent'; // Import the festival content

const SpecificTopics = () => {
  // State to track selected festival
  const [selectedFestival, setSelectedFestival] = useState('春节');
  const [selectedWord, setSelectedWord] = useState(null);
  const [selectedMeaning, setSelectedMeaning] = useState(null);
  const [matches, setMatches] = useState([]);
  const [isGameCompleted, setIsGameCompleted] = useState(false);
  const [shuffledMeanings, setShuffledMeanings] = useState([]);

  // Handler for changing the selected festival
  const handleFestivalChange = (e) => {
    setSelectedFestival(e.target.value);
    resetGame();
  };

  // Handle selecting a word or meaning
  const handleWordClick = (word) => {
    setSelectedWord(word);
    if (selectedMeaning) {
      checkMatch(word, selectedMeaning);
    }
  };

  const handleMeaningClick = (meaning) => {
    setSelectedMeaning(meaning);
    if (selectedWord) {
      checkMatch(selectedWord, meaning);
    }
  };

  // Check if the selected word and meaning match
  const checkMatch = (word, meaning) => {
    const isCorrect = festivalContent[selectedFestival].gamePairs.some(
      (pair) => pair.word === word && pair.meaning === meaning
    );

    if (isCorrect) {
      setMatches([...matches, { word, meaning }]);
    }

    // Clear the selection after checking
    setSelectedWord(null);
    setSelectedMeaning(null);

    // If all words are matched, set game as completed
    if (matches.length + 1 === festivalContent[selectedFestival].gamePairs.length) {
      setIsGameCompleted(true);
    }
  };

  // Reset the game
  const resetGame = () => {
    setSelectedWord(null);
    setSelectedMeaning(null);
    setMatches([]);
    setIsGameCompleted(false);
    shuffleMeanings();
  };

  // Fisher-Yates shuffle algorithm to shuffle the meanings
  const shuffleMeanings = () => {
    const meanings = festivalContent[selectedFestival].gamePairs.map((pair) => pair.meaning);
    for (let i = meanings.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [meanings[i], meanings[j]] = [meanings[j], meanings[i]];
    }
    setShuffledMeanings(meanings);
  };

  // Shuffle meanings whenever the selected festival changes
  useEffect(() => {
    shuffleMeanings();
  }, [selectedFestival]);

  return (
    <div className="specific-topics">
      <h2>Specific Topics</h2>

      <div className="specific-topics-container">
        {/* Left side content */}
        <div className="festival-details">
          <div className="festival-selection">
            <label htmlFor="festival-select">Choose a festival: </label>
            <select id="festival-select" value={selectedFestival} onChange={handleFestivalChange}>
              {Object.keys(festivalContent).map((festival) => (
                <option key={festival} value={festival}>
                  {festival}
                </option>
              ))}
            </select>
          </div>

          <div className="festival-description">
            <p><strong>Description:</strong> {festivalContent[selectedFestival].description}</p>
            <div><strong>Poem:</strong></div>
            <div>
              {festivalContent[selectedFestival].poem.map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Video Section */}
        <div className="festival-media">
          <iframe
            width="560"
            height="315"
            src={festivalContent[selectedFestival].videoSrc.replace("watch?v=", "embed/")}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {/* Game Section */}
      <div className="festival-game-container">
        <div className="festival-game">
          <strong className="vocabulary-title">Match the Vocabulary:</strong>
          <div className="game-container">
            <div className="words">
              <h4>Words</h4>
              {festivalContent[selectedFestival].gamePairs.map((pair, index) => (
                <button
                  key={index}
                  onClick={() => handleWordClick(pair.word)}
                  className={selectedWord === pair.word ? 'selected' : ''}
                  disabled={matches.some((match) => match.word === pair.word)}
                >
                  {pair.word}
                </button>
              ))}
            </div>
            <div className="meanings">
              <h4>Meanings</h4>
              {shuffledMeanings.map((meaning, index) => (
                <button
                  key={index}
                  onClick={() => handleMeaningClick(meaning)}
                  className={selectedMeaning === meaning ? 'selected' : ''}
                  disabled={matches.some((match) => match.meaning === meaning)}
                >
                  {meaning}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Correct Matches Section - to the right of the game */}
        <div className="matches">
          <h4>Correct Matches:</h4>
          <ul>
            {matches.map((match, index) => (
              <li key={index}>{match.word} - {match.meaning}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Retake Button */}
      {isGameCompleted && (
        <div className="retake-container">
          <button className="retake-button" onClick={resetGame}>Retake</button>
        </div>
      )}
    </div>
  );
};

export default SpecificTopics;
