import React, { useContext, useEffect } from "react";
import Context from "../context/index";

import { validateEmail } from "../helper/index";

function UserAuthorization() {
  const context = useContext(Context);

  useEffect(() => {
    if (document.body.getBoundingClientRect().width >= 992) {
      const bgElement = document.querySelector(".auth__background");
      fetch(`https://source.unsplash.com/collection/962362`)
        .then(res => (bgElement.style.backgroundImage = `url("${res.url}")`))
        .catch(
          () =>
            (bgElement.style.backgroundImage = `url("https://images.unsplash.com/photo-1535086842-67d300b770c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1536&q=80")`)
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
    </React.Fragment>
  );
}

export default UserAuthorization;
