import "./contact.scss";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Icon } from "@iconify/react";
import emailjs from "@emailjs/browser";

function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // eslint-disable-next-line no-unused-vars
  const [disabled, setDisabled] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
    display: false,
    message: "",
    type: "",
  });

  const toggleAlert = (message, type) => {
    setAlertInfo({ display: true, message, type });

    setTimeout(() => {
      setAlertInfo({ display: false, message: "", type: "" });
    }, 5000);
  };

  const onSubmit = async (data) => {
    const { name, email, subject, message } = data;

    try {
      const templateParams = {
        name,
        email,
        subject,
        message,
      };
      await emailjs.send(
        "service_qx602fm",
        "template_i0oa0cl",
        templateParams,
        "aiNkOMGWI24xxwPF-"
      );
      toggleAlert(
        "Votre e-mail a bien été envoyé, je vous répondrai dans les plus proches délais.",
        "success"
      );
    } catch (e) {
      console.error(e);
      toggleAlert(
        "Une erreur est survenue, veuillez réessayer plus tard.",
        "danger"
      );
    } finally {
      setDisabled(false);
      reset();
    }
  };

  return (
    <footer id="contact">
      <div className="cont">
        <div className="cont__mail">
          <h2 className="cont__title">Contact</h2>
          <div className="contact-form">
            <form
              noValidate
              className="contact-form__flex"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="contact-form__first">
                <div className="contact-enterMessage">
                  <input
                    type="text"
                    name="name"
                    {...register("name", {
                      required: {
                        value: true,
                        message: "Merci d'entrer votre nom.",
                      },
                      maxLength: {
                        value: 30,
                        message: "Le nom ne doit pas excéder 30 caractères.",
                      },
                    })}
                    placeholder="Votre nom"
                  ></input>
                  {errors.name && (
                    <span className="errorMessage">{errors.name.message}</span>
                  )}
                </div>
                <div className="contact-enterMessage">
                  <input
                    type="email"
                    name="email"
                    placeholder="Votre adresse e-mail"
                    {...register("email", {
                      required: true,
                      pattern:
                        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    })}
                  ></input>
                  {errors.email && (
                    <span className="errorMessage">
                      Merci d&apos;entrer une adresse e-mail valide.
                    </span>
                  )}
                </div>
              </div>
              <div>
                <div className="contact-enterMessage">
                  <input
                    type="text"
                    name="subject"
                    placeholder="L'objet de l'e-mail"
                    {...register("subject", {
                      required: {
                        value: true,
                        message: "Merci d'entrer l'objet de votre e-mail.",
                      },
                      maxLength: {
                        value: 75,
                        message:
                          "L'objet de l'e-mail ne doit pas depasser 75 caractères.",
                      },
                    })}
                  ></input>
                  {errors.subject && (
                    <span className="errorMessage">
                      {errors.subject.message}
                    </span>
                  )}
                </div>
              </div>
              <div>
                <div className="contact-enterMessage">
                  <textarea
                    rows={3}
                    name="message"
                    placeholder="Ecrivez votre message..."
                    {...register("message", {
                      required: true,
                    })}
                  ></textarea>
                  {errors.message && (
                    <span className="errorMessage">
                      Merci d&apos;entrer votre message.
                    </span>
                  )}
                </div>
              </div>
              <button type="submit">Envoyer</button>
            </form>
          </div>
          <div className="confirm-box">
            {alertInfo.display && (
              <div
                className={`confirm-box__alert alert-${alertInfo.type}`}
                role="alert"
              >
                {alertInfo.message}
              </div>
            )}
          </div>
        </div>
        <div className="cont__rs">
          <a
            href="https://www.linkedin.com/in/sullivan-irbah-270892284/"
            target="_blank"
            rel="nofollow noopener"
            className="cont__icon"
          >
            <Icon icon="mdi:linkedin" />
          </a>
          <a
            href="https://github.com/sulirb"
            target="_blank"
            rel="nofollow noopener"
            className="cont__icon"
          >
            <Icon icon="mdi:github" />
          </a>
          <a
            href="https://suldev.carrd.co"
            target="_blank"
            rel="noopener"
            className="cont__icon"
          >
            <Icon icon="simple-icons:carrd" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Contact;
