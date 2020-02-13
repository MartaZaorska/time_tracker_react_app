import React, { useState, useEffect } from "react";

import { getTimeString } from "../helper/index";

function ActiveTimer({ updateTimer, removeTimer, timer, addError }) {
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
  }, []);

  const addDescriptionHandler = () =>
    updateTimer(timer._id, timer.category, timer.start, 0, description);

  const updateDescriptionHandler = () => {
    setDescription(timer.description);
    updateTimer(timer._id, timer.category, timer.start, 0, "");
  };

  const finishTimerHandler = now => {
    if (now) {
      const finish = new Date().getTime();
      updateTimer(timer._id, timer.category, timer.start, finish, description);
    } else {
      if (time.length === 0 || date.length === 0) {
        addError("Musisz ustawić date i czas zakończenia zadania");
        return;
      }

      const finish = new Date(`${date} ${time}`).getTime();
      updateTimer(timer._id, timer.category, timer.start, finish, description);
    }
  };

  const removeTimerHandler = () => removeTimer(timer._id);

  return (
    <section className="active_timer">
      <h2 className="active_timer__title">Aktywny Timer</h2>
      <h1 className="active_time__count">{count}</h1>
      <p className="active_timer__text">Kategoria: {timer.category}</p>
      {timer.description.length === 0 ? (
        <React.Fragment>
          <p className="active_timer__text">Opis (opcjonalnie)</p>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
          ></textarea>
          <button onClick={addDescriptionHandler} className="active_timer__btn">
            Dodaj opis
          </button>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <p className="active_timer__text">Opis: {timer.description}</p>
          <button
            className="active_timer__btn"
            onClick={updateDescriptionHandler}
          >
            Edytuj opis
          </button>
        </React.Fragment>
      )}
      <button onClick={removeTimerHandler} className="active_timer__btn">
        Usuń timer
      </button>
      <p className="active_timer__text">
        Zapomiałeś zatrzymać timer? Możesz wprowadzić ręcznie datę i godzinę
        zakończenia zdarzenia
      </p>
      <input type="date" value={date} onChange={e => setDate(e.target.value)} />
      <input type="time" value={time} onChange={e => setTime(e.target.value)} />
      <button
        className="active_timer__btn"
        onClick={() => finishTimerHandler(false)}
      >
        Zakończ zadanie w ustawionym czasie
      </button>
      <button
        onClick={() => finishTimerHandler(true)}
        className="active_timer__btn"
      >
        Zakończ zadanie teraz
      </button>
    </section>
  );
}

export default ActiveTimer;
