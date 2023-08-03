import React from 'react';
import { timeConverter } from '../utils/time-converter';

interface Props {
  mainTime: number;
}

export function Timer(props: Props): JSX.Element {
  return <div className="timer">{timeConverter(props.mainTime)}</div>;
}
