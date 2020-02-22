import React, { useContext, useEffect, useState } from "react";

import Context from "../context/index";
import NewTimerForm from "./NewTimerForm";
import ActiveTimer from "./ActiveTimer";
import TimersContent from "./TimersContent";

function Timers() {
  const [activeTimer, setActiveTimer] = useState({});
  const context = useContext(Context);

  useEffect(() => {
    const timerIndex = context.timers.findIndex(timer => timer.finish === 0);
    if (timerIndex >= 0) setActiveTimer({ ...context.timers[timerIndex] });
  }, [context.timers]);

  const updateTimer = (timerId, category, start, finish, description) => {
    context.updateTimer(timerId, category, start, finish, description);
    if (finish > 0) setActiveTimer({});
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
      {context.timers.length === 0 ? <p>Brak timerów</p> : <TimersContent />}
    </React.Fragment>
  );
}

export default Timers;
