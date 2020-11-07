import { START_YEAR } from 'constants/common';

export const getYears = (): string => {
  const now = new Date();
  const currentYear = now.getFullYear();

  if (currentYear > START_YEAR) {
    return `${START_YEAR}–${currentYear}`;
  }

  return String(START_YEAR);
};
