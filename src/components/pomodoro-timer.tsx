import React, { useCallback, useEffect } from 'react';
import { useInterval } from '../hooks/use-interval';
import { Button } from './button';
import { Timer } from './timer';
import { hmsTimeConverter } from '../utils/hms-time-converter';

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
  const [amountOfCycles, setAmountOfCycles] = React.useState(
    new Array(props.cycles - 1).fill(true),
  );
  const [completedCycles, setCompletedCycles] = React.useState(0);
  const [totalFocusTime, setTotalFocusTime] = React.useState(0);
  const [completedPomodoros, setCompletedPomodoros] = React.useState(0);

  useInterval(
    () => {
      setMainTime(mainTime - 1);
      if (focusMode) setTotalFocusTime(totalFocusTime + 1);
    },
    timeCount ? 1000 : null,
  );

  const configureFocus = useCallback(() => {
    setTimeCount(true);
    setFocusMode(true);
    setRestMode(false);
    setMainTime(props.defaultPomodoroTime);

    startFocusAudio.play();
  }, [
    setTimeCount,
    setFocusMode,
    setRestMode,
    setMainTime,
    props.defaultPomodoroTime,
  ]);

  const configureRest = useCallback(
    (long: boolean) => {
      setTimeCount(true);
      setFocusMode(false);
      setRestMode(true);

      if (long) {
        setMainTime(props.longRestTime);
      } else {
        setMainTime(props.shortRestTime);
      }

      finishFocusAudio.play();
    },
    [
      setTimeCount,
      setFocusMode,
      setRestMode,
      setMainTime,
      props.shortRestTime,
      props.longRestTime,
    ],
  );

  useEffect(() => {
    if (focusMode) document.body.classList.add('focus');
    if (restMode) document.body.classList.remove('focus');

    if (mainTime > 0) return;

    if (focusMode && amountOfCycles.length > 0) {
      configureRest(false);
      amountOfCycles.pop();
    } else if (focusMode && amountOfCycles.length <= 0) {
      configureRest(true);
      setAmountOfCycles(new Array(props.cycles - 1).fill(true));
      setCompletedCycles(completedCycles + 1);
    }

    if (focusMode) setCompletedPomodoros(completedPomodoros + 1);
    if (restMode) configureFocus();
  }, [
    focusMode,
    restMode,
    mainTime,
    configureFocus,
    configureRest,
    completedCycles,
    amountOfCycles,
    completedPomodoros,
    props.cycles,
  ]);

  return (
    <div className="pomodoro">
      <h2>{focusMode ? 'Focus' : 'Rest'} mode</h2>
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
        <p>Completed cycles: {completedCycles}</p>
        <p>Focused time: {hmsTimeConverter(totalFocusTime)}</p>
        <p>Completed pomodoros: {completedPomodoros}</p>
      </div>
    </div>
  );
}
