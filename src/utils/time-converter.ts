import { timeFormatter } from './time-formatter';

export function timeConverter(seconds: number): string {
  const min = timeFormatter((seconds / 60) % 60);
  const sec = timeFormatter((seconds % 60) % 60);

  return `${min}:${sec}`;
}
