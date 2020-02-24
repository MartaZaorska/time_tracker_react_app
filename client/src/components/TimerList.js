import React from "react";

import { getTimeString } from "../helper/index";
import EmptyTimers from "./EmptyTimers";

function TimerList({ data, removeTimer }) {
  if (data.length === 0) return <EmptyTimers />;

  return (
    <section className="timer_list">
      {data
        .sort((a, b) => b.start - a.start)
        .map(timer => (
          <section key={timer._id} className="timer_item">
            <header className="timer_item__header">
              <h4 className="timer_item__title">{timer.category}</h4>
              {timer.description.length === 0 ? null : (
                <p className="text--light timer_item__text">
                  {timer.description}
                </p>
              )}
            </header>
            <p className="timer_item__text">
              <span className="text--light">start:</span>
              <span className="text--color">
                {new Date(timer.start).toISOString().slice(0, 10)}
                {` `}
                {new Date(timer.start).toTimeString().slice(0, 5)}
              </span>
              <br />
              <span className="text--light">czas trwania:</span>{" "}
              <span className="text--color">
                {getTimeString(timer.finish, timer.start)}
              </span>
            </p>
            <section className="timer_item__footer">
              <button
                className="timer_item__btn"
                onClick={() => removeTimer(timer._id)}
              >
                usuń
              </button>
            </section>
          </section>
        ))}
    </section>
  );
}

export default TimerList;
