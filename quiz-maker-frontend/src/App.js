




// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import CreateQuizForm from './components/CreateQuizForm';
import TakeQuiz from './components/TakeQuiz';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateQuizForm />} />
        <Route path="/take" element={<TakeQuiz />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
