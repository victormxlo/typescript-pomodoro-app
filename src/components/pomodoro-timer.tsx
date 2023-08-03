import React, { useEffect } from 'react';
import { useInterval } from '../hooks/use-interval';
import { Button } from './button';
import { Timer } from './timer';

interface Props {
  defaultPomodoroTime: number;
  shortRestTime: number;
  longRestTime: number;
  cycles: number;
}

export function PomodoroTimer(props: Props): JSX.Element {
  const [mainTime, setMainTime] = React.useState(props.defaultPomodoroTime);
  const [timeCount, setTimeCount] = React.useState(false);
  const [focusMode, setFocusMode] = React.useState(false);

  useEffect(() => {
    if (focusMode) document.body.classList.add('focus');
  }, [focusMode]);

  useInterval(
    () => {
      setMainTime(mainTime - 1);
    },
    timeCount ? 1000 : null,
  );

  const configureFocus = () => {
    setTimeCount(true);
    setFocusMode(true);
  };

  return (
    <div className="pomodoro">
      <h2>Mode</h2>
      <Timer mainTime={mainTime} />

      <div className="controls">
        <Button text="Focus" onClick={() => configureFocus()}></Button>
        <Button text="Button" onClick={() => console.log('...')}></Button>
        <Button
          text={timeCount ? 'Pause' : 'Play'}
          onClick={() => setTimeCount(!timeCount)}
        ></Button>
      </div>

      <div className="details">
        <p>Details</p>
      </div>
    </div>
  );
}
