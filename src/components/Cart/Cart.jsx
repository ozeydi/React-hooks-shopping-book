import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';
import {
  removeItem,
  addQuantity,
  subtractQuantity,
  loadOffers,
} from '../../actions/cartActions';

import Recipe from '../Recipe/Recipe';
import './cart.css';

const Cart = (props) => {
  const items = useSelector((state) => state.addedItems);
  const totalPrice = useSelector((state) => state.totalPrice);
  const offer = useSelector((state) => state.offer);

  // actions

  const dispatch = useDispatch();

  // find offers
  useEffect(() => {
    const addedItems = items.map((item) => item.isbn);
    dispatch(loadOffers(...addedItems));
  });

  //find the best offer
  const getBestOffer = () => {
    let bestOffer = 0;
    if (offer && totalPrice > 0) {
      let percentage = offer.offers.find((elt) => elt.type === 'percentage');
      let minus = offer.offers.find((elt) => elt.type === 'minus');
      let slice = offer.offers.find((elt) => elt.type === 'slice');
      let percentPromo = percentage ? (percentage.value * totalPrice) / 100 : 0;
      let minusPromo = minus ? minus.value : 0;
      let slicePromo = slice
        ? Math.floor(totalPrice / slice.sliceValue) * slice.value
        : 0;
      bestOffer = Math.max(percentPromo, slicePromo, minusPromo);
    }
    return bestOffer;
  };

  let addedItems = items.length ? (
    items.map((item) => {
      return (
        <div className="card added" key={item.isbn}>
          <li className="collection-item avatar">
            <div className="card-image">
              <img src={item.cover} alt={item.cover} />
            </div>

            <div className="item-desc">
              <span className="title">{item.title}</span>
              <p>
                <b>Price: {item.price}$</b>
              </p>
              <p>
                <b>Quantity: {item.quantity}</b>
              </p>
              <div className="add-remove">
                <Link to="/cart">
                  <i
                    className="material-icons"
                    onClick={() => {
                      console.log('add');
                      dispatch(addQuantity(item.isbn));
                    }}
                  >
                    arrow_drop_up
                  </i>
                </Link>
                <Link to="/cart">
                  <i
                    className="material-icons"
                    onClick={() => {
                      console.log('moins');

                      dispatch(subtractQuantity(item.isbn));
                    }}
                  >
                    arrow_drop_down
                  </i>
                </Link>
              </div>
              <button
                className="waves-effect waves-light btn pink remove"
                onClick={() => {
                  dispatch(removeItem(item.isbn));
                }}
              >
                Remove
              </button>
            </div>
          </li>
        </div>
      );
    })
  ) : (
    <p>No Books.</p>
  );
  return (
    <div className="box">
      <div className="cart ">
        <h5>You have ordered:</h5>
        <ul className="collection ">{addedItems}</ul>
      </div>
      <Recipe totalPrice={totalPrice} bestOffer={getBestOffer()} />
    </div>
  );
};

export default Cart;
