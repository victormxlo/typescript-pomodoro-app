import { timeFormatter } from './time-formatter';

export function hmsTimeConverter(seconds: number): string {
  const hours = timeFormatter(seconds / 3600);
  const min = timeFormatter((seconds / 60) % 60);
  const sec = timeFormatter((seconds % 60) % 60);

  return `${hours}:${min}:${sec}`;
}
