export const convertToReadableDate = (date: string): string => {
  let readableDate = new Date(date).toLocaleString("ru-RU", {
    timeZone: "Europe/Moscow",
  });
  return readableDate.split(",")[0];
};
