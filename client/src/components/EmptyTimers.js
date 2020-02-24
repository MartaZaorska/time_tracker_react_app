import React from "react";

function EmptyTimers() {
  return (
    <section className="empty_timers">
      <i className="far fa-hand-point-right empty_timers__icon"></i>
      <span className="empty_timers__text">Brak timerów</span>
    </section>
  );
}

export default EmptyTimers;
