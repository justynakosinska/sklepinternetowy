import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQuantity,
} from "../../redux/slice/cartSlice";
import Card from "../card/Card";
import styles from "./CheckoutSummary.module.scss";

const CheckoutSummary = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);

  return (
    <div>
      <h3>Podsumowanie płatności</h3>
      <div>
        {cartItems.lenght === 0 ? (
          <>
            <p>Nie ma przedmiotów w twoim koszyku</p>
            <button className="--btn">
              <Link to="/#produkty">Powrót do sklepu</Link>
            </button>
          </>
        ) : (
          <div>
            <p>
              <b>{`Produkty w koszyku: ${cartTotalQuantity}`}</b>
            </p>
            <div className={styles.text}>
              <h4>Suma:</h4>
              <h3>{cartTotalAmount.toFixed(2)}</h3>
            </div>
            {cartItems.map((item, index) => {
              const { id, name, price, cartQuantity } = item;
              return (
                <Card key={id} cardClass={styles.card}>
                  <h4>Produkt: {name}</h4>
                  <p>Ilość {cartQuantity}</p>
                  <p>Cena jednostkowa {price}</p>
                  <p>Cena {price * cartQuantity}</p>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutSummary;