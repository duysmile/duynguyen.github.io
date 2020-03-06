import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import Blog from './containers/BlogContainer';
import BlogDetail from './containers/BlogDetailContainer';

import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/blog" component={Blog} />
          <Route exact path="/blog/:id" component={BlogDetail} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
