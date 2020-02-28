import React, { useContext, useEffect } from "react";
import Context from "../context/index";

import { validateEmail } from "../helper/index";

function UserAuthorization() {
  const context = useContext(Context);

  useEffect(() => {
    //Photos from the collection created by Joan Aldrich on Unsplash (collection id: 962362)
    if (document.body.getBoundingClientRect().width >= 992) {
      const bgElement = document.querySelector(".auth__background");
      fetch(`https://source.unsplash.com/collection/962362`).then(
        res => (bgElement.style.backgroundImage = `url("${res.url}")`)
      );
    }
  }, []);

  const submitHandler = (e, submitType) => {
    e.preventDefault();
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    if (emailInput.value.length === 0) {
      context.addError("Adres e-mail jest wymagany");
      return;
    }

    if (!validateEmail(emailInput.value)) {
      context.addError("Adres e-mail jest niepoprawny");
      return;
    }

    if (passwordInput.value.length === 0) {
      context.addError("Hasło jest wymagane");
      return;
    }

    context[submitType](emailInput.value, passwordInput.value);
  };

  return (
    <React.Fragment>
      <section className="auth">
        <form className="auth__form" noValidate>
          <input
            type="email"
            id="email"
            className="auth__input"
            placeholder="E-mail"
          />
          <input
            type="password"
            id="password"
            className="auth__input"
            placeholder="Hasło"
          />
          <p className="text--light auth--test">
            Możesz wypróbować aplikację logując się za pomocą
            <br /> e-mail: <span className="text--color">test@test.com</span>,
            hasło: <span className="text--color">test</span>.
          </p>
          <section className="auth__control">
            <button
              type="submit"
              className="auth__btn auth__btn--login"
              onClick={e => submitHandler(e, "login")}
            >
              Zaloguj się
            </button>
            <p className="auth__text text--light">lub</p>
            <button
              type="submit"
              className="auth__btn"
              onClick={e => submitHandler(e, "register")}
            >
              Załóż konto
            </button>
          </section>
        </form>
      </section>
      <section className="auth__background"></section>
      <p className="copyright">
        &copy; Time Tracker App created by{" "}
        <a
          href="https://martazaorska.github.io/portfolio/"
          rel="noopener noreferrer"
          target="_blank"
          className="copyright__link"
        >
          Marta Zaorska
        </a>
      </p>
    </React.Fragment>
  );
}

export default UserAuthorization;
