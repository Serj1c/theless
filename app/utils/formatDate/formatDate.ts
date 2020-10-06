import moment from 'moment';
import 'moment/locale/ru';

export const formatDate = (start: number, end: number): string => {
  const now = moment.utc();
  const tomorrow = moment(now).add(1, 'days');

  // Today
  if (moment(end).isSame(now)) {
    return 'Сегодня';
  }

  // Tomorrow
  if (moment(start).isSame(end, 'day') && moment(end).isSame(tomorrow, 'day')) {
    return 'Завтра';
  }

  // Same day, render "10 января[ 2020], среда"
  if (moment(start).isSame(end, 'day')) {
    const format = moment(start).isSame(now, 'year')
      ? 'D MMMM, dddd'
      : 'D MMMM YYYY, dddd';

    return moment(start).format(format);
  }

  // Same month, render "С 10 по 20 января[ 2020]"
  if (moment(start).isSame(end, 'month')) {
    const format = moment(start).isSame(now, 'year') ? 'D MMMM' : 'D MMMM YYYY';
    const from = moment(start).format('D');
    const to = moment(end).format(format);

    return `С ${from} по ${to}`;
  }

  // Same year, render "С 10 января по 2 февряля 2020"
  if (moment(start).isSame(end, 'year')) {
    const format = moment(start).isSame(now, 'year') ? 'D MMMM' : 'D MMMM YYYY';
    const from = moment(start).format('D MMMM');
    const to = moment(end).locale('ru').format(format);

    return `С ${from} по ${to}`;
  }

  // Other, render "С 10 декабря 2020 по 2 ферваля 2021"
  const format = 'D MMMM YYYY';
  const from = moment(start).format(format);
  const to = moment(end).format(format);

  return `С ${from} по ${to}`;
};
