import React, { useState,useEffect } from 'react';
import './App.css';
import cardData from './cardData'; // Importing the card data from the separate file
import SpecificTopics from './topics'; // Import the new component
import Footer from './footer';                // Importing the Footer component


const NavBar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><a href="#chinese">Chinese</a></li>
        <li><a href="#math">Math</a></li>
        <li><a href="#code">Code</a></li>
        <li><a href="#download">Download</a></li>
        <li><a href="#about">About Us</a></li>
      </ul>
    </nav>
  );
};


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
  const [selectedBook, setSelectedBook] = useState('轻松学中文3 第一单元'); // State for selected book

  

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

  useEffect(() => {
    const defaultCards = cardData.find((book) => book.unit === selectedBook);
    if (defaultCards) {
      setCards(defaultCards.words);
    }
  }, [selectedBook]);
  

  const handleBookChange = (e) => {
    const selectedBook = e.target.value;
    setSelectedBook(selectedBook);
  
    // Find the book data based on the selected unit
    const selectedCards = cardData.find((book) => book.unit === selectedBook);
    if (selectedCards) {
      setCards(selectedCards.words);
    } else {
      setCards([]);
    }
  
    setCurrentCard(0);
    setShowAnswer(false);
    setFeedback(null);
    setUserGuess('');
  };

  return (
    <div className="app">
  <NavBar />
  <div className="layout-container">
    
    {/* Left Part: Header and Book Selection */}
    <div className="left-part">
      <header>
        <img src="./images/logo2.jpg" className="app-logo" alt="logo" />
        <h1>Learn Mandarin with YiLearn</h1>
        <h2>Each learner has a unique path. Start with different books to align your practice with what you're learning in school, making it easier to reinforce your studies.</h2>
      </header>

      <div className="book-selection">
        <label htmlFor="book-select">Select the books: </label>
        <select id="book-select" value={selectedBook} onChange={handleBookChange}>
          <option value="轻松学中文3 第一单元">轻松学中文3 第一单元</option>
          <option value="轻松学中文3 第二单元">轻松学中文3 第二单元</option>
          <option value="轻松学中文3 第三单元">轻松学中文3 第三单元</option>
          <option value="轻松学中文3 第四单元">轻松学中文3 第四单元</option>
          <option value="轻松学中文3 第五单元">轻松学中文3 第五单元</option>
          <option value="中文2 第1课">中文2 第1课</option>
          <option value="中文2 第2课">中文2 第2课</option>
          <option value="中文2 第3课">中文2 第3课</option>
          <option value="中文2 第4课">中文2 第4课</option>
          <option value="中文2 第5课">中文2 第5课</option>
          <option value="中文2 第6课">中文2 第6课</option>
          <option value="中文2 第7课">中文2 第7课</option>
          <option value="中文2 第8课">中文2 第8课</option>
          <option value="中文2 第9课">中文2 第9课</option>
          <option value="中文2 第10课">中文2 第10课</option>
          <option value="中文2 第11课">中文2 第11课</option>
          <option value="中文2 第12课">中文2 第12课</option>

        
        </select>
      </div>
    </div>

    {/* Right Part: Flashcards and Content */}
    <div className="right-part">
      <div className="streak">
        <p>Total Cards: {cards.length}</p>
        <p>Current Streak: {currentStreak}</p>
        <p>Longest Streak: {longestStreak}</p>
      </div>

      <div className="card-container">
        <div className="card" onClick={() => setShowAnswer(!showAnswer)}>
          {showAnswer ? cards[currentCard].answer.join(', ') : cards[currentCard].question}
        </div>

        {/* <div className="card-container">
  <div className="card" onClick={() => setShowAnswer(!showAnswer)}
    style={{ fontSize: calculateFontSize(showAnswer ? cards[currentCard].answer.join(', ') : cards[currentCard].question) }}>
    {showAnswer ? cards[currentCard].answer.join(', ') : cards[currentCard].question}
  </div> */}



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

        {feedback && (
          <p className={`feedback ${feedback === 'Correct!' ? 'correct' : 'incorrect'}`}>
            {feedback}
          </p>
        )}

        <div className="navigation">
          <button onClick={handlePrevCard}>←</button>
          <button onClick={handleNextCard}>→</button>
          <button onClick={shuffleCards}>Shuffle Cards</button>
        </div>
      </div>

      {showModal && (
        <Modal message={congratsMessage} onClose={closeModal} />
      )}
    </div>
  </div>
  <SpecificTopics />
  <Footer />

</div>


  );
};

export default App;
