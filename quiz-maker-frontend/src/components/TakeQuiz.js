import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import './common.css';

import './TakeQuizPage.css'; // Import your CSS file for styling

const TakeQuiz = () => {
  const [quiz, setQuiz] = useState(null); // State to store quiz details
  const [quizId, setQuizId] = useState(''); // State to store quiz ID for fetching
  const [userAnswers, setUserAnswers] = useState([]); // State to store user's answers
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // State to track current question
  const [score, setScore] = useState(0); // State to track user's score
  const [quizCompleted, setQuizCompleted] = useState(false); // State to track quiz completion
  const [selectedOption, setSelectedOption] = useState(''); // State to track selected option

  useEffect(() => {
    // Function to fetch quiz details when component mounts
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/quizzes/${quizId}`);
        setQuiz(response.data); // Set fetched quiz data to state
      } catch (error) {
        console.error('Error fetching quiz:', error);
      }
    };

    // Call fetchQuiz function if quizId is set
    if (quizId) {
      fetchQuiz();
    }
  }, [quizId]); // Run effect whenever quizId changes

  const handleQuizIdChange = (e) => {
    setQuizId(e.target.value); // Update quizId state with input value
  };

  const handleAnswerSelect = (selectedOption) => {
    if (!quiz || !quiz.questions) return; // Ensure quiz and questions are available
    setSelectedOption(selectedOption); // Update selected option state
  };

  const handleNextQuestion = () => {
    if (!quiz || !quiz.questions) return; // Ensure quiz and questions are available
    const currentQuestion = quiz.questions[currentQuestionIndex];
    const isCorrect = selectedOption === currentQuestion.correctAnswer;

    if (isCorrect) {
      setScore(score + 1); // Increment score if answer is correct
    }

    setUserAnswers([...userAnswers, { question: currentQuestion.questionText, answer: selectedOption, correct: isCorrect }]);

    if (currentQuestionIndex + 1 < quiz.questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1); // Move to next question
      setSelectedOption(''); // Clear selected option for next question
    } else {
      setQuizCompleted(true); // Set quiz completion flag
    }
  };

  if (!quiz) {
    return (
      <div>
        <h2>Take Quiz</h2>
        <input type="text" value={quizId} onChange={handleQuizIdChange} placeholder="Enter Quiz ID" />
        <button onClick={() => setCurrentQuestionIndex(0)} disabled={!quizId}>Start Quiz</button>
      </div>
    );
  }

  if (quizCompleted) {
    return (
      <div className='quiz-results'>
        <h2>Quiz Completed</h2>
        <p>Your Final Score: {score}</p>
        {/* Display all questions with user answers and correct answers */}
        <ul>
          {userAnswers.map((answer, index) => (
            <li key={index}>
              Question: {answer.question} - Your Answer: {answer.answer} - {answer.correct ? 'Correct' : 'Incorrect'}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className='quiz-container'>
      <div className='quiz-header'>

      <h2>Take Quiz</h2>
      <h2>{quiz.description}</h2>
      <h2>{quiz.title}</h2>
      </div>
      {/* Render current question and options */}
      <div key={currentQuestionIndex}>
        <h4 className='question'>{quiz.questions[currentQuestionIndex].questionText}</h4>
        <ul className='options'>
          {quiz.questions[currentQuestionIndex].options.map((option, optIndex) => (
            <li key={optIndex}>
              <button
                className={selectedOption === option ? 'selected' : ''} // Apply 'selected' class if option is selected
                onClick={() => handleAnswerSelect(option)}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={handleNextQuestion} disabled={!selectedOption}>Next Question</button>
    </div>
  );
};

export default TakeQuiz;
