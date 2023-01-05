const dayDivisor = 24 * 60 * 60 * 1000;

export const isValidDate = (date: string) => {
  const d = new Date(date);
  if (Object.prototype.toString.call(d) === '[object Date]') {
    return true;
  } else {
    return false;
  }
};

export const dayFromDate = (date: string) => {
  switch (new Date(date).getDay()) {
    case 0:
      return 'Sunday';
    case 1:
      return 'Monday';
    case 2:
      return 'Tuesday';
    case 3:
      return 'Wednesday';
    case 4:
      return 'Thursday';
    case 5:
      return 'Friday';
    case 6:
      return 'Saturday';
    default:
      return 'Invalid Day';
  }
};

export const durationDifference = (dateOld: string, dateNew: string) => {
  const old = new Date(dateOld);
  const newD = new Date(dateNew);
  const diff = Math.abs(newD.valueOf() - old.valueOf());

  //compute days, hours and Minutes
  const days = diff / dayDivisor;
  const hours = (days % 1) * 24;
  const minutes = (hours % 1) * 60;
  const secs = (minutes % 1) * 60;

  return { days, hours, minutes };
};
