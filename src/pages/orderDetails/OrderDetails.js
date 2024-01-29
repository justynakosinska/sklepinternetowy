import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useFetchDocument from "../../customHooks/useFetchDocument";
import spinnerImg from "../../assets/spinner.jpg";
import styles from "./OrderDetails.module.scss";
const OrderDetails = () => {
  const [order, setOrder] = useState(null);
  const { id } = useParams();
  const { document } = useFetchDocument("orders", id);

  useEffect(() => {
    setOrder(document);
  }, [document]);

  return (
    <section>
      <div className={`container ${styles.table}`}>
        <h2>Szczegóły zamówienia</h2>
        <div>
          <Link to="/zamowienia">&larr; Powrót do zamówień</Link>
        </div>
        <br />
        {order === null ? (
          <img src={spinnerImg} alt="Ładowanie..." style={{ width: "50px" }} />
        ) : (
          <>
            <p>
              <b>ID zamówienia</b> {order.id}
            </p>
            <p>
              <b>Kwota zamówienia</b> {order.orderAmount} zł
            </p>
            <p>
              <b>Status zamówienia</b> {order.orderStatus}
            </p>
            <br />
            <table>
              <thead>
                <tr>
                  <th>L.p.</th>
                  <th>Produkt</th>
                  <th>Cena</th>
                  <th>Ilość</th>
                  <th>Suma</th>
                  <th>Akcja</th>
                </tr>
              </thead>
              <tbody>
                {order.cartItems.map((cart, index) => {
                  const { id, name, price, imageURL, cartQuantity } = cart;
                  return (
                    <tr key={id}>
                      <td>
                        <b>{index + 1}</b>
                      </td>
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
                      <td>{cartQuantity}</td>
                      <td>{(price * cartQuantity).toFixed(2)}</td>
                      <td className={styles.icons}>
                        <Link to={`/ocena-produktu/${id}`}>
                          <button className="--btn --btn-primary">
                            Oceń produkt
                          </button>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
      </div>
    </section>
  );
};

export default OrderDetails;