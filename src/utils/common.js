export const formatDate = (isoDateStr, showTime = false, defaultText = "-") => {
  if (!isoDateStr) return defaultText;
  const date = new Date(isoDateStr);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...(showTime && {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
  };

  return date.toLocaleString("en-US", options);
};
export const formatNormal = (date, defaultText = "-") => {
  if (!date) return defaultText;
  return date.slice(0, 10);
};
