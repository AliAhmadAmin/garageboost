export const UK_LOCALE = "en-GB";
export const UK_TIME_ZONE = "Europe/London";

export type DateInput = Date | string | number;

export const formatUKDate = (
  value: DateInput,
  options: Intl.DateTimeFormatOptions = { day: "numeric", month: "short", year: "numeric" }
) => {
  const date = value instanceof Date ? value : new Date(value);
  return new Intl.DateTimeFormat(UK_LOCALE, {
    timeZone: UK_TIME_ZONE,
    ...options,
  }).format(date);
};

export const formatUKDateFromLocalDate = (
  value: string,
  options: Intl.DateTimeFormatOptions = { day: "numeric", month: "short", year: "numeric" }
) => {
  const date = new Date(`${value}T00:00:00`);
  return formatUKDate(date, options);
};
