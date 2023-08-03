import React from 'react';
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

  useInterval(() => {
    setMainTime(mainTime - 1);
  }, 1000);

  return (
    <div className="pomodoro">
      <h2>Mode</h2>
      <Timer mainTime={mainTime} />

      <div className="controls">
        <Button text="Button" onClick={() => console.log('...')}></Button>
        <Button text="Button" onClick={() => console.log('...')}></Button>
        <Button text="Button" onClick={() => console.log('...')}></Button>
      </div>

      <div className="details">
        <p>Details</p>
      </div>
    </div>
  );
}
