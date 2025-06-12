export const formatDate = (isoDateStr, showTime = false) => {
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
