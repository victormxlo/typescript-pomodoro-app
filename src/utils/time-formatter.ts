const timeFormatter = (n: number): string =>
  Math.floor(n).toString().padStart(2, '0');

export { timeFormatter };
