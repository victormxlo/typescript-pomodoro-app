import React from 'react';
import { useInterval } from '../hooks/use-interval';
import { timeConverter } from '../utils/time-converter';

interface Props {
  defaultPomodoroTime: number;
}

export function PomodoroTimer(props: Props): JSX.Element {
  const [mainTime, setMainTime] = React.useState(props.defaultPomodoroTime);

  useInterval(() => {
    setMainTime(mainTime - 1);
  }, 1000);

  return <div>{timeConverter(mainTime)}</div>;
}
