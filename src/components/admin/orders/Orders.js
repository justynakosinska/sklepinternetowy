import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useFetchCollection from "../../../customHooks/useFetchCollection";

import {
  selectOrderHistory,
  STORE_ORDERS,
} from "../../../redux/slice/orderSlice";
import Loader from "../../loader/Loader";
import styles from "./Orders.module.scss";

const Orders = () => {
  const { data, isLoading } = useFetchCollection("orders");
  const orders = useSelector(selectOrderHistory);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(STORE_ORDERS(data));
  }, [dispatch, data]);

  const handleClick = (id) => {
    navigate(`/administrator/szczegoly-zamowienia/${id}`);
  };

  return (
    <>
      <div className={styles.order}>
        <h2>Zamówienia</h2>
        <p>
          Otwórz zamówienie aby <b>zmienić status zamówienia</b>
        </p>
        <br />
        <>
          {isLoading && <Loader />}
          <div className={styles.table}>
            {orders.length === 0 ? (
              <p>Nie znaleziono zamówienia</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>L.p.</th>
                    <th>Data</th>
                    <th>Id zamówienia</th>
                    <th>Kwota zamowienia</th>
                    <th>Status zamowienia</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => {
                    const {
                      id,
                      orderDate,
                      orderTime,
                      orderAmount,
                      orderStatus,
                    } = order;
                    return (
                      <tr key={id} onClick={() => handleClick(id)}>
                        <td>{index + 1}</td>
                        <td>
                          {orderDate} o {orderTime}
                        </td>
                        <td>{id}</td>
                        <td>
                          
                          {orderAmount}
                          {"zł"}
                        </td>
                        <td>
                          <p
                            className={
                              orderStatus !== "Dostarczone"
                                ? `${styles.pending}`
                                : `${styles.delivered}`
                            }
                          >
                            {orderStatus}
                          </p>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </>
      </div>
    </>
  );
};

export default Orders;