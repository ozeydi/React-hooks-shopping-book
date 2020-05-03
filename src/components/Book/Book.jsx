import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../actions/cartActions';

import './Book.css';

const Book = (props) => {
  const [isOpen, setisOpen] = useState(false);

  // actions

  const dispatch = useDispatch();

  const toggleReveal = () => {
    setisOpen(!isOpen);
  };

  const renderResume = () => {
    return (
      <div>
        <h6 className="grey-text text-darken-4">
          {props.title}
          <i className="material-icons   link" onClick={() => toggleReveal()}>
            close
          </i>
        </h6>
        <p className="info">{props.info}</p>
      </div>
    );
  };

  return (
    <div className="card cover">
      {!isOpen ? (
        <div>
          <div className="card-image">
            <img src={props.cover} alt={props.title} />
          </div>
          <div className="card-content">
            <span className="card-title ">{props.title}</span>
            <p>
              <b>Price: {props.price}$</b>
            </p>
            <div className="card-action link">
              <span id="toggle" onClick={() => toggleReveal()}>
                Show resume
              </span>
            </div>
            <span
              to="/"
              className="btn-floating halfway-fab waves-effect waves-light red"
              onClick={() => {
                dispatch(addToCart(props.id));
              }}
            >
              <i className="material-icons">add</i>
            </span>
          </div>
        </div>
      ) : (
        renderResume()
      )}
    </div>
  );
};

export default Book;
