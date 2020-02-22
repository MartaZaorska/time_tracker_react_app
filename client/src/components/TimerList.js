import React from "react";

import { getTimeString } from "../helper/index";

function TimerList({ data, removeTimer }) {
  if (data.length === 0) return <p>Brak timerów</p>;

  return (
    <section className="timer__list">
      {data
        .sort((a, b) => b.start - a.start)
        .map(timer => (
          <section key={timer._id} className="timer__item">
            <p>
              {timer.category}
              {timer.description.length === 0 ? null : (
                <span> ({timer.description})</span>
              )}
              <br />
              start: {new Date(timer.start).toISOString().slice(0, 10)}
              {` `}
              {new Date(timer.start).toTimeString().slice(0, 5)}, czas trwania:{" "}
              {getTimeString(timer.finish, timer.start)}
              <button onClick={() => removeTimer(timer._id)}>Usuń timer</button>
            </p>
          </section>
        ))}
    </section>
  );
}

export default TimerList;
