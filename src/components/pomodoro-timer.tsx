import React, { useEffect } from 'react';
import { useInterval } from '../hooks/use-interval';
import { Button } from './button';
import { Timer } from './timer';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const startingBell = require('../sounds/bell-start.mp3');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const finishingBell = require('../sounds/bell-finish.mp3');

const startFocusAudio = new Audio(startingBell);
const finishFocusAudio = new Audio(finishingBell);

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
  const [restMode, setRestMode] = React.useState(false);

  useEffect(() => {
    if (focusMode) document.body.classList.add('focus');
    if (restMode) document.body.classList.remove('focus');
  }, [focusMode, restMode]);

  useInterval(
    () => {
      setMainTime(mainTime - 1);
    },
    timeCount ? 1000 : null,
  );

  const configureFocus = () => {
    setTimeCount(true);
    setFocusMode(true);
    setRestMode(false);
    setMainTime(props.defaultPomodoroTime);

    startFocusAudio.play();
  };

  const configureRest = (long: boolean) => {
    setTimeCount(true);
    setFocusMode(false);
    setRestMode(true);

    if (long) {
      setMainTime(props.longRestTime);
    } else {
      setMainTime(props.shortRestTime);
    }

    finishFocusAudio.play();
  };

  return (
    <div className="pomodoro">
      <h2>Mode</h2>
      <Timer mainTime={mainTime} />

      <div className="controls">
        <Button text="Focus" onClick={() => configureFocus()}></Button>
        <Button text="Rest" onClick={() => configureRest(false)}></Button>
        <Button
          className={!focusMode && !restMode ? 'hidden' : ''}
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
