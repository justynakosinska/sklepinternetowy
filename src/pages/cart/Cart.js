import React, { useEffect } from 'react';
import style from './Cart.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_TO_CART, CALCULATE_SUBTOTAL, CALCULATE_TOTAL_QUANTITY, CLEAR_CART, DECREASE_CART, REMOVE_FROM_CART, SAVE_URL, selectCartItems, selectCartTotalAmount, selectCartTotalQuantity } from '../../redux/slice/cartSlice';
import { selectIsLoggedIn } from '../../redux/slice/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';
import Card from '../../components/card/Card';


const Cart=()=>{
    const cartItems = useSelector(selectCartItems);
    const cartTotalAmount = useSelector(selectCartTotalAmount);
    const cartTotalQuantity = useSelector(selectCartTotalQuantity);
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(selectIsLoggedIn);

    const navigate = useNavigate();

  const increaseCart = (cart) => {
    dispatch(ADD_TO_CART(cart));
  };

  const decreaseCart = (cart) => {
    dispatch(DECREASE_CART(cart));
  };

  const removeFromCart = (cart) => {
    dispatch(REMOVE_FROM_CART(cart));
  };

  const clearCart = () => {
    dispatch(CLEAR_CART());
  };

  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL());
    dispatch(CALCULATE_TOTAL_QUANTITY());
    dispatch(SAVE_URL(""));
  }, [cartItems, dispatch]);

  const url = window.location.href;

  const checkout = () => {
    if (isLoggedIn) {
      navigate("/szczegoly-platnosci");
    } else {
      dispatch(SAVE_URL(url));
      navigate("/logowanie");
    }
  };


    return (
        <section>
        <div className={`container ${style.table}`}>
          <h2>Koszyk zakupów</h2>
          {cartItems.length === 0 ? (
            <>
              <p>Twój koszyk jest pusty</p>
              <br />
              <div>
                <Link to="/#produkty">&larr; Kontynuuj zakupy</Link>
              </div>
            </>
          ) : (
            <>
              <table>
                <thead>
                  <tr>
                    <th>L.P.</th>
                    <th>Produkt</th>
                    <th>Cena</th>
                    <th>Ilość</th>
                    <th>Suma</th>
                    <th>Akcja</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((cart, index) => {
                    const { id, name, price, imageURL, cartQuantity } = cart;
                    return (
                      <tr key={id}>
                        <td>{index + 1}</td>
                        <td>
                          <p>
                            <b>{name}</b>
                          </p>
                          <img
                            src={imageURL}
                            alt={name}
                            style={{ width: "100px" }}
                          />
                        </td>
                        <td>{price}</td>
                        <td>
                          <div className={style.count}>
                            <button
                              className="--btn"
                              onClick={() => decreaseCart(cart)}
                            >
                              -
                            </button>
                            <p>
                              <b>{cartQuantity}</b>
                            </p>
                            <button
                              className="--btn"
                              onClick={() => increaseCart(cart)}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td>{(price * cartQuantity).toFixed(2)}</td>
                        <td className={style.icons}>
                          <FaTrashAlt
                            size={19}
                            color="red"
                            onClick={() => removeFromCart(cart)}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className={style.summary}>
                <button className="--btn --btn-danger" onClick={clearCart}>
                  Wyczyść koszyk
                </button>
                <div className={style.checkout}>
                  <div>
                    <Link to="/#produkty">&larr; Kontynuuj zakupy</Link>
                  </div>
                  <br />
                  <Card cardClass={style.card}>
                    <p>
                      <b> {`Produkty w koszyku: ${cartTotalQuantity}`}</b>
                    </p>
                    <div className={style.text}>
                      <h4>Suma</h4>
                      <h3>{`${cartTotalAmount.toFixed(2)} zł`}</h3>
                    </div>
                    <p>Podatek oraz wysyłka doliczona przy płatności</p>
                    <button
                      className="--btn --btn-primary --btn-block"
                      onClick={checkout}
                    >
                      Płatność
                    </button>
                  </Card>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    );
  };
  
  export default Cart;