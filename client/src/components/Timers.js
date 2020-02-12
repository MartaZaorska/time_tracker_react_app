import React, { useContext, useEffect, useState } from "react";

import Context from "../context/index";
import NewTimerForm from "./NewTimerForm";
import ActiveTimer from "./ActiveTimer";
import TimerList from "./TimerList";
import TimerStatistic from "./TimerStatistic";

function Timers() {
  const [activeTimer, setActiveTimer] = useState({});
  const context = useContext(Context);

  useEffect(() => {
    const timerIndex = context.timers.findIndex(timer => timer.finish === 0);
    if (timerIndex >= 0) setActiveTimer({ ...context.timers[timerIndex] });
  }, [context.timers]);

  const updateTimer = (timerId, category, start, finish, description) => {
    context.updateTimer(timerId, category, start, finish, description);
    setActiveTimer({});
  };

  if (Object.keys(activeTimer).length > 0)
    return (
      <ActiveTimer
        updateTimer={updateTimer}
        removeTimer={context.removeTimer}
        timer={activeTimer}
        addError={context.addError}
      />
    );

  return (
    <React.Fragment>
      <NewTimerForm addTimer={context.addTimer} addError={context.addError} />
      {context.timers.length === 0 ? (
        <p>Brak timerów</p>
      ) : (
        <React.Fragment>
          <TimerList
            timers={context.timers}
            removeTimer={context.removeTimer}
          />
          <TimerStatistic timers={context.timers} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default Timers;
