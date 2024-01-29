import { useState } from "react";
import { CountryDropdown } from "react-country-region-selector";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "../../components/card/Card";
import CheckoutSummary from "../../components/checkoutSummary/CheckoutSummary.js";
import {
  SAVE_BILLING_ADDRESS,
  SAVE_SHIPPING_ADDRESS,
} from "../../redux/slice/checkoutSlice";
import style from "./CheckoutDetails.module.scss";

const initialAddressState = {
  name: "",
  line1: "",
  line2: "",
  city: "",
  postal_code: "",
  country: "",
  phone: "",
};

const CheckoutDetails = () => {
  const [shippingAddress, setShippingAddress] = useState({
    ...initialAddressState,
  });
  const [billingAddress, setBillingAddress] = useState({
    ...initialAddressState,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleShipping = (e) => {
    const { name, value } = e.target;
    setShippingAddress({
      ...shippingAddress,
      [name]: value,
    });
  };

  const handleBilling = (e) => {
    const { name, value } = e.target;
    setBillingAddress({
      ...billingAddress,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(SAVE_SHIPPING_ADDRESS(shippingAddress));
    dispatch(SAVE_BILLING_ADDRESS(billingAddress));
    navigate("/platnosc");
  };

  return (
    <section>
      <div className={`container ${style.checkout}`}>
        <h2>Szczegóły płatności</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <Card cardClass={style.card}>
              <h3>Adres wysyłki</h3>
              <label>Imię i nazwisko odbiorcy</label>
              <input
                type="text"
                placeholder="Imię i nazwisko odbiorcy"
                required
                name="name"
                value={shippingAddress.name}
                onChange={(e) => handleShipping(e)}
              />
              <label>Adres</label>
              <input
                type="text"
                placeholder="Adres"
                required
                name="line1"
                value={shippingAddress.line1}
                onChange={(e) => handleShipping(e)}
              />
              <label>Adres c.d.</label>
              <input
                type="text"
                placeholder="Adres c.d."
                name="line2"
                value={shippingAddress.line2}
                onChange={(e) => handleShipping(e)}
              />
              <label>Miasto</label>
              <input
                type="text"
                placeholder="Miasto"
                required
                name="city"
                value={shippingAddress.city}
                onChange={(e) => handleShipping(e)}
              />
              
              <label>Kod pocztowy</label>
              <input
                type="text"
                placeholder="Kod pocztowy"
                required
                name="postal_code"
                value={shippingAddress.postal_code}
                onChange={(e) => handleShipping(e)}
              />
              {/* COUNTRY INPUT */}
              <CountryDropdown
                className={style.select}
                valueType="short"
                value={shippingAddress.country}
                onChange={(val) =>
                  handleShipping({
                    target: {
                      name: "country",
                      value: val,
                    },
                  })
                }
              />
              <label>Numer telefonu</label>
              <input
                type="text"
                placeholder="Numer telefonu"
                required
                name="phone"
                value={shippingAddress.phone}
                onChange={(e) => handleShipping(e)}
              />
            </Card>
            {/* BILLING ADDRESS */}
            <Card cardClass={style.card}>
              <h3>Adres rozliczeniowy</h3>
              <label>Imię i nazwisko</label>
              <input
                type="text"
                placeholder="Imię i nazwisko"
                required
                name="name"
                value={billingAddress.name}
                onChange={(e) => handleBilling(e)}
              />
              <label>Adres</label>
              <input
                type="text"
                placeholder="Adres"
                required
                name="line1"
                value={billingAddress.line1}
                onChange={(e) => handleBilling(e)}
              />
              <label>Adres c.d.</label>
              <input
                type="text"
                placeholder="Adres c.d."
                name="line2"
                value={billingAddress.line2}
                onChange={(e) => handleBilling(e)}
              />
              <label>Miasto</label>
              <input
                type="text"
                placeholder="Miasto"
                required
                name="city"
                value={billingAddress.city}
                onChange={(e) => handleBilling(e)}
              />
              
              <label>Kod pocztowy</label>
              <input
                type="text"
                placeholder="Kod pocztowy"
                required
                name="postal_code"
                value={billingAddress.postal_code}
                onChange={(e) => handleBilling(e)}
              />
              {/* COUNTRY INPUT */}
              <CountryDropdown
                className={style.select}
                valueType="short"
                value={billingAddress.country}
                onChange={(val) =>
                  handleBilling({
                    target: {
                      name: "country",
                      value: val,
                    },
                  })
                }
              />
              <label>Numer telefonu</label>
              <input
                type="text"
                placeholder="Numer telefonu"
                required
                name="phone"
                value={billingAddress.phone}
                onChange={(e) => handleBilling(e)}
              />
              <button type="submit" className="--btn --btn-primary">
                Realizuj płatność
              </button>
            </Card>
          </div>
          <div>
            <Card cardClass={style.card}>
              <CheckoutSummary />
            </Card>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CheckoutDetails;