const resolveDateString = (date?: Date | string): string => {
  return date ? new Date(date).toISOString().substring(0, 10) : "";
};

const isTodayOrGreater = (date: Date): boolean => {
  return equalOrGreater(date, new Date());
};

const equalOrGreater = (dateFirst: Date, dateSecond: Date): boolean => {
  return dateFirst.toDateString() === dateSecond.toDateString() || dateFirst > dateSecond;
};

export { equalOrGreater, isTodayOrGreater, resolveDateString };
