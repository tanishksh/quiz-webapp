




// Home.js
import './HomePage.css';
import './common.css';

import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Welcome to Quiz Maker</h1>
      <div>
        <Link to="/create">
          <button>Create a Quiz</button>
        </Link>
        <Link to="/take">
          <button>Take a Quiz</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
