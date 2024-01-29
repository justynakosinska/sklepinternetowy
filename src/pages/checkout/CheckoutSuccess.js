import { Link } from "react-router-dom";

const CheckoutSuccess = () => {
  return (
    <section>
      <div className="container">
        <h2>Płatność powiodła się.</h2>
        <p>Dziękujemy za zakup.</p>
        <br />

        <button className="--btn --btn-primary">
          <Link to="/zamowienia">Zobacz status zamówienia</Link>
        </button>
      </div>
    </section>
  );
};

export default CheckoutSuccess;