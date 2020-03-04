import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './pages/Home';
import Blog from './containers/BlogContainer';
import BlogDetail from './containers/BlogDetailContainer';

import store from './store';

function About() {
  return <h2>About</h2>;
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Route path="/" exact component={Home} />
          <Route path="/about" component={About} />
          <Route exact path="/blog" component={Blog} />
          <Route path="/blog/:id" component={BlogDetail} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
