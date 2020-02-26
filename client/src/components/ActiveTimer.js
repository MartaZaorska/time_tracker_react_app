import React, { useState, useEffect } from "react";

import { getTimeString } from "../helper/index";

function ActiveTimer({ updateTimer, timer, addError }) {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(
    new Date(timer.start).toISOString().slice(0, 10)
  );
  const [time, setTime] = useState("");
  const [count, setCount] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(getTimeString(new Date().getTime(), timer.start));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [timer.start]);

  const addDescriptionHandler = () =>
    updateTimer(timer._id, timer.category, timer.start, 0, description);

  const updateDescriptionHandler = () => {
    setDescription(timer.description);
    updateTimer(timer._id, timer.category, timer.start, 0, "");
  };

  const finishTimerHandler = now => {
    const desc = description || timer.description || "";
    if (now) {
      const finish = new Date().getTime();
      updateTimer(timer._id, timer.category, timer.start, finish, desc);
    } else {
      if (time.length === 0 || date.length === 0) {
        addError("Musisz ustawić date i czas zakończenia zadania");
        return;
      }

      const finish = new Date(`${date} ${time}`).getTime();
      updateTimer(timer._id, timer.category, timer.start, finish, desc);
    }
  };

  return (
    <section className="active_timer">
      <header className="active_timer__header">
        <p className="active_timer__text text--light">Aktywny Timer</p>
        <h1 className="active_timer__count">{count}</h1>
      </header>
      <section className="active_timer__content">
        <p className="active_timer__text">
          Kategoria: <span className="text--color">{timer.category}</span>
        </p>
        <p className="active_timer__text">
          Start:{" "}
          <span className="text--color">
            {new Date(timer.start).toISOString().slice(0, 10)}
            {` `}
            {new Date(timer.start).toTimeString().slice(0, 5)}
          </span>
        </p>
      </section>
      <section className="active_timer__options">
        {timer.description.length === 0 ? (
          <React.Fragment>
            <p className="active_timer__text">Opis (opcjonalnie)</p>
            <textarea
              className="active_timer__textarea"
              value={description}
              onChange={e => setDescription(e.target.value)}
            ></textarea>
            <button
              onClick={addDescriptionHandler}
              className="active_timer__btn"
            >
              Dodaj opis
            </button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <p className="active_timer__text">
              <span className="text--light">Opis:</span> {timer.description}
            </p>
            <button
              className="active_timer__btn"
              onClick={updateDescriptionHandler}
            >
              Edytuj opis
            </button>
          </React.Fragment>
        )}
      </section>
      <section className="active_timer--date">
        <p className="active_timer__text">
          Zapomiałeś zatrzymać timer? Możesz wprowadzić ręcznie datę i godzinę
          zakończenia czynności
        </p>
        <input
          type="date"
          className="active_timer__input"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
        <input
          type="time"
          className="active_timer__input active_timer__input--time"
          value={time}
          onChange={e => setTime(e.target.value)}
        />
        <br />
        <button
          className="active_timer__btn"
          onClick={() => finishTimerHandler(false)}
        >
          Zakończ zadanie w ustawionym czasie
        </button>
      </section>
      <section className="active_timer--finish">
        <button
          onClick={() => finishTimerHandler(true)}
          className="active_timer__btn"
        >
          Zakończ zadanie teraz
        </button>
      </section>
    </section>
  );
}

export default ActiveTimer;
