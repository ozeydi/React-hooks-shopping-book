import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { loadBooks } from '../../actions/cartActions';
import Book from '../Book/Book';
import './Home.css';

const Home = () => {
  const [searchValue, setsearchValue] = useState('');
  const [searchedItems, setsearchedItems] = useState([]);

  //
  const items = useSelector((state) => state.items);

  // actions
  const dispatch = useDispatch();

  // load all books
  useEffect(() => {
    dispatch(loadBooks());
  });

  const handleChange = (evt) => {
    setsearchValue(evt.target.value);
    findItems(evt.target.value);
  };

  // to show items matched with searchValue
  const findItems = (value) => {
    let newitems = [];
    newitems = items.filter((elt) => elt.title.toLowerCase().includes(value));
    setsearchedItems(newitems);
  };

  return (
    <div className="container">
      <h3 className="center">Our items</h3>
      <div className="container">
        <div className="row">
          <div className="col s12">
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">search</i>
                <input
                  type="text"
                  id="autocomplete-input"
                  className="autocomplete"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="box">
        {searchValue !== ''
          ? searchedItems.map((item) => (
              <Book
                key={item.isbn}
                title={item.title}
                price={item.price}
                cover={item.cover}
                id={item.isbn}
                info={item.synopsis}
              />
            ))
          : items.map((item) => (
              <Book
                key={item.isbn}
                title={item.title}
                price={item.price}
                cover={item.cover}
                id={item.isbn}
                info={item.synopsis}
              />
            ))}
      </div>
    </div>
  );
};

export default Home;
