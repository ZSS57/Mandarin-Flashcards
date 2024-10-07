import React, { useState,useEffect } from 'react';
import './App.css';
import cardData from './cardData'; // Importing the card data from the separate file


const Modal = ({ message, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

const App = () => {
  const [cards, setCards] = useState(cardData); // Use cards from state, initialize with cardData
  const [currentCard, setCurrentCard] = useState(0); 
  const [showAnswer, setShowAnswer] = useState(false); 
  const [userGuess, setUserGuess] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [correctCount, setCorrectCount] = useState(0); // Track number of correct answers
  const [showModal, setShowModal] = useState(false); // Track if modal is shown
  const [congratsMessage, setCongratsMessage] = useState(null); // To display congratulations message
  const [currentStreak, setCurrentStreak] = useState(0); // Track current streak of correct responses
  const [longestStreak, setLongestStreak] = useState(0); // Track the longest streak of correct responses


    // Fisher-Yates shuffle algorithm to randomize cards
  // Fisher-Yates shuffle algorithm to randomize cards
  const shuffleCards = () => {
    const shuffledCards = [...cards]; // Create a copy of the card array
    for (let i = shuffledCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Pick a random index
      [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]]; // Swap elements
    }
    setCards(shuffledCards); // Update the state with the shuffled cards
    setCurrentCard(0); // Reset to the first card after shuffle
    setShowAnswer(false); // Hide the answer after shuffling
    setFeedback(null); // Reset feedback after shuffle
    setUserGuess('');
  };

    const handleNextCard = () => {
      setCurrentCard((prevCard) => (prevCard + 1) % cards.length);
      setShowAnswer(false);
      setFeedback(null); // Reset feedback when moving to a new card
      setUserGuess(''); // Clear the guess input
    };

    const handlePrevCard = () => {
      setCurrentCard((prevCard) => (prevCard - 1 + cards.length) % cards.length);
      setShowAnswer(false);
      setFeedback(null); // Reset feedback when moving to a new card
      setUserGuess(''); // Clear the guess input
    };



      // Function to check if the user's guess is correct
  const handleSubmitGuess = () => {
    const trimmedGuess = userGuess.trim().toLowerCase(); // Trim spaces and convert to lowercase
    const correctAnswers = cards[currentCard].answer.map(answer => answer.toLowerCase()); // Convert all answers to lowercase

    if (correctAnswers.includes(trimmedGuess)){
      setFeedback('Correct!');
      setCorrectCount((prevCount) => prevCount + 1); // Increment correct count
    

    // Update the current streak and check if it's the longest streak
    setCurrentStreak((prevStreak) => prevStreak + 1);
    setLongestStreak((prevLongest) => Math.max(prevLongest, currentStreak + 1));
      
    // Check if it's time to show the congratulations message
      if ((correctCount + 1) % 10 === 0) {
        setCongratsMessage(`Good job! You've answered ${correctCount + 1} words correctly!`);
        setShowModal(true); // Show the modal
      }
    } else {
      setFeedback('Incorrect. Try again!');
      setCurrentStreak(0); // Reset current streak if the guess is incorrect

    }

   
  };
  // Close the modal after 3 seconds and go to the next card
  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        setShowModal(false);
        handleNextCard(); // Move to the next card after closing the modal
      }, 3000);

      return () => clearTimeout(timer); // Cleanup timer on component unmount or modal close
    }
  }, [showModal]);
  // Close the modal
const closeModal = () => {
  setShowModal(false);
  handleNextCard(); // Move to the next card after closing the modal

};

      // Submit on "Enter" key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmitGuess();
    }
  };


  // Handle arrow key navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      handleNextCard();
    } else if (e.key === 'ArrowLeft') {
      handlePrevCard();
    }
  };

  // Add keydown event listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="app">
      <header>
        <h1>Mandarin Flashcards</h1>
        <h2>Learn common Mandarin phrases with flashcards!</h2>
        <p>Total Cards: {cards.length}</p>
      </header>

      <div className="streak">
        <p>Current Streak: {currentStreak}</p> {/* Display current streak */}
        <p>Longest Streak: {longestStreak}</p> {/* Display longest streak */}
      </div>


      <div className="card">
        <div onClick={() => setShowAnswer(!showAnswer)}>
          {showAnswer ? cards[currentCard].answer.join(', ') : cards[currentCard].question}
        </div>
      </div>


      <div className="controls">
        <input
          type="text"
          value={userGuess}
          onChange={(e) => setUserGuess(e.target.value)}
          onKeyPress={handleKeyPress}  
          placeholder="Enter your guess"
        />
        <button onClick={handleSubmitGuess}>Submit</button>
      </div>

      {feedback && <p className={`feedback ${feedback === 'Correct!' ? 'correct' : 'incorrect'}`}>
          {feedback} </p>}
   

    <div className="navigation">
      <button onClick={handlePrevCard}> ← </button>
      <button onClick={handleNextCard}> → </button>
      <button onClick={shuffleCards}>Shuffle Cards</button> {/* Shuffle button */}
    </div>

  
    {showModal && (
        <Modal message={congratsMessage} onClose={closeModal} />
      )}

    </div>
  );
};

export default App;
