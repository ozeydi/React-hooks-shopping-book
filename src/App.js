import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Cart from './components/Cart/Cart';

const App = (props) => {
  const total = useSelector((state) => state.totalItems);

  return (
    <Router>
      <div>
        <Navbar total={total} />
        <Route exact path="/" component={Home} />
        <Route path="/cart" component={Cart} />
      </div>
    </Router>
  );
};

export default App;
