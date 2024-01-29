import { useRef } from "react";
import Card from "../../components/card/Card";
import styles from "./Contact.module.scss";
import { FaPhoneAlt, FaEnvelope, FaTwitter } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";


const Contact = () => {
    
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    console.log(form.current);

    emailjs
      .sendForm(
        "service_xria5ly",
        "template_cyh07oq",
        form.current,
        "t7Fb3L82H7LwrpGho"
      )
      .then(
        (result) => {
          toast.success("Wiadomość została przesłana");
        },
        (error) => {
          toast.error(error.text);
        }
      );
    e.target.reset();
  };

  return (
    <section>
      <div className={`container ${styles.contact}`}>
        <h2>Skontaktuj się z nami</h2>
        <div className={styles.section}>
          <form ref={form} onSubmit={sendEmail}>
            <Card cardClass={styles.card}>
              <label>Imię</label>
              <input
                type="text"
                name="user_name"
                placeholder="Imię"
                required
              />
              <label>Email</label>
              <input
                type="email"
                name="user_email"
                placeholder="Adres email"
                required
              />
              <label>Temat</label>
              <input
                type="text"
                name="subject"
                placeholder="Temat"
                required
              />
              <label>Wiadomość</label>
              <textarea name="message" cols="30" rows="10"></textarea>
              <button className="--btn --btn-primary">Wyślij wiadomość</button>
            </Card>
          </form>

          <div className={styles.details}>
            <Card cardClass={styles.card2}>
              <h3>Informacje kontaktowe</h3>
              <p>Wypełnik formularz lub skontaktuj się z nami poprzez kanały podane poniżej</p>
              <div className={styles.icons}>
                <span>
                  <FaPhoneAlt />
                  <p>+48 123 456 789</p>
                </span>
                <span>
                  <FaEnvelope />
                  <p>pomoc@wome.pl</p>
                </span>
                <span>
                  <GoLocation />
                  <p>Dębica, Polska</p>
                </span>
                <span>
                  <FaTwitter />
                  <p>@Wome</p>
                </span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;