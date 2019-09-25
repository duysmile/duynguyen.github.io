import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';

function About() {
  return <h2>About</h2>;
}

function App() {
  return (
    <Router>
      <div>
        <Route path="/" exact component={Home} />
        <Route path="/about" component={About} />
        <Route exact path="/blog" component={Blog} />
        <Route path="/blog/:id" component={BlogDetail} />
      </div>
    </Router>
  );
}

export default App;
