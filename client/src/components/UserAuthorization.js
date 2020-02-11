import React, { useContext } from "react";
import Context from "../context/index";

import { validateEmail } from "../helper/index";

function UserAuthorization() {
  const context = useContext(Context);

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
        <button
          type="submit"
          className="auth__btn"
          onClick={e => submitHandler(e, "login")}
        >
          Zaloguj się
        </button>
        <button
          type="submit"
          className="auth__btn"
          onClick={e => submitHandler(e, "register")}
        >
          Zarejestruj się
        </button>
      </form>
    </section>
  );
}

export default UserAuthorization;
