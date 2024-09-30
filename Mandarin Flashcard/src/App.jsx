import React, { useState } from 'react';
import './App.css';

const App = () => {
  const cardData = [
    { question: "教室", answer: "Classroom" },
    { question: "老师", answer: "Teacher" },
    { question: "我们", answer: "We" },
    { question: "唱歌", answer: "Sing" },
    { question: "跳舞", answer: "Dance" },
    { question: "教学", answer: "Teach" },
    { question: "学习", answer: "Study" },
    { question: "中文", answer: " Mandarin" },
    { question: "学校", answer: "School" },
    { question: "春天", answer: "Spring" },
    { question: "秋天", answer: "Autumn" },
    { question: "夏天", answer: "Summer" },
    { question: "冬天", answer: "Winter" },

  ];

  const [currentCard, setCurrentCard] = useState(0); 
  const [showAnswer, setShowAnswer] = useState(false); 

  // Function to get random card
  const handleNextCard = () => {
    const randomIndex = Math.floor(Math.random() * cardData.length);
    setCurrentCard(randomIndex);
    setShowAnswer(false); //
  };

  return (
    <div className="app">
      <header>
        <h1>Mandarin Flashcards</h1>
        <h2>Learn common Mandarin phrases with flashcards!</h2>
        <p>Total Cards: {cardData.length}</p>
      </header>

      <div className="card">
        <div onClick={() => setShowAnswer(!showAnswer)}>
          {showAnswer ? cardData[currentCard].answer : cardData[currentCard].question}
        </div>
      </div>

      <button onClick={handleNextCard}>Next Card</button>
    </div>
  );
};

export default App;
