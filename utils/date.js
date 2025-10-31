export const getCurrentMonth = () => {
  return new Date().toLocaleString("default", { month: "long" });
};

export const getCurrentMonthNumber = () => {
  return new Date().getMonth() + 1;
};

export const getCurrentMonthShortName = () => {
  return new Date().toLocaleString("default", { month: "short" });
};

export const getNextMonth = () => {
  const date = new Date();
  date.setDate(1);
  date.setMonth(date.getMonth() + 1);
  return date.toLocaleString("default", { month: "long" });
};

export const getNextMonthNumber = () => {
  const date = new Date();
  date.setDate(1);
  date.setMonth(date.getMonth() + 1);
  return date.getMonth() + 1;
};

export const getNextMonthShortName = () => {
  const date = new Date();
  date.setDate(1);
  date.setMonth(date.getMonth() + 1);
  return date.toLocaleString("default", { month: "short" });
};

export const getCurrentYear = () => {
  return new Date().getFullYear();
};
