


import './CreateQuizPage.css';
import './common.css';

import React, { useState } from 'react';
import axios from 'axios';

const CreateQuizForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState([{ questionText: '', options: ['', '', ''], correctAnswer: '' }]);
  const [quizId, setQuizId] = useState(null); // State to store quiz ID after creation

  const addQuestion = () => {
    setQuestions([...questions, { questionText: '', options: ['', '', ''], correctAnswer: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://quiz-webapp-7gsd.vercel.app/quizzes', {
        title,
        description,
        questions,
      });
      const createdQuizId = response.data._id; // Extract quiz ID from response
      setQuizId(createdQuizId); // Set quiz ID state
      console.log('Quiz created:', response.data);
      // Add redirection or success message handling if needed
    } catch (error) {
      console.error('Error creating quiz:', error);
    }
  };

  const handleQuestionChange = (e, index) => {
    const { name, value } = e.target;
    const newQuestions = [...questions];
    newQuestions[index][name] = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (e, questionIndex, optionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = e.target.value;
    setQuestions(newQuestions);
  };

  const handleCopyQuizId = () => {
    // Function to copy quiz ID to clipboard
    if (quizId) {
      navigator.clipboard.writeText(quizId);
      alert('Quiz ID copied to clipboard!');
    } else {
      alert('No Quiz ID to copy. Please create a quiz first.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Quiz Title" />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Quiz Description" />
      {questions.map((question, index) => (
        <div key={index}>
          <input
            type="text"
            name="questionText"
            value={question.questionText}
            onChange={(e) => handleQuestionChange(e, index)}
            placeholder="Question Text"
          />
          {question.options.map((option, optionIndex) => (
            <input
              key={optionIndex}
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(e, index, optionIndex)}
              placeholder={`Option ${optionIndex + 1}`}
            />
          ))}
          <input
            type="text"
            name="correctAnswer"
            value={question.correctAnswer}
            onChange={(e) => handleQuestionChange(e, index)}
            placeholder="Correct Answer"
          />
        </div>
      ))}
      <button type="button" onClick={addQuestion}>Add Question</button>
      <button type="submit">Create Quiz</button>

      {/* Display quiz ID after creation */}
      {quizId && (
        <div>
          <p>Quiz ID: {quizId}</p>
          <button type="button" onClick={handleCopyQuizId}>Copy Quiz ID</button>
        </div>
      )}
    </form>
  );
};

export default CreateQuizForm;
