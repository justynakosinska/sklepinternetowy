import React, { useEffect, useState } from "react";
import useFetchDocument from "../../../customHooks/useFetchDocument";
import styles from "./OrderDetails.module.scss";
import spinnerImg from "../../../assets/spinner.jpg";
import { Link, useParams } from "react-router-dom";
import ChangeOrderStatus from "../changeOrderStatus/ChangeOrderStatus";

const OrderDetails = () => {
  const [order, setOrder] = useState(null);
  const { id } = useParams();
  const { document } = useFetchDocument("orders", id);

  useEffect(() => {
    setOrder(document);
  }, [document]);

  return (
    <>
      <div className={styles.table}>
        <h2>Szczegóły zamówienia</h2>
        <div>
          <Link to="/administrator/zamowienia">&larr; Powrót do zamówień</Link>
        </div>
        <br />
        {order === null ? (
          <img src={spinnerImg} alt="Loading..." style={{ width: "50px" }} />
        ) : (
          <>
            <p>
              <b>Id zamówienia</b> {order.id}
            </p>
            <p>
              <b>Kwota zamówienia</b> {order.orderAmount} zł
            </p>
            <p>
              <b>Status zamówienia</b> {order.orderStatus}
            </p>
            <p>
              <b>Adres wysyłki</b>
              <br />
              Adres: {order.shippingAddress.line1},
              {order.shippingAddress.line2}, {order.shippingAddress.city}
              <br />
              Miasto: {order.shippingAddress.country}
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
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
        <ChangeOrderStatus order={order} id={id} />
      </div>
    </>
  );
};

export default OrderDetails;