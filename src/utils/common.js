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

export const DateTimeConvert = (dateN) => {
  if (!dateN) return null;
  const date = new Date(dateN * 1000);
  const pad = (n) => n.toString().padStart(2, "0");

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1); // Months are 0-based
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${year}-${month}-${day}`;
};

export const truncateToWords = (text, number) => {
  return text.split(/\s+/).slice(0, number).join(" ");
};


export const getTrialDaysLeft = (trialEndsAt) => {
  if (!trialEndsAt) return null;

  const endDate = new Date(trialEndsAt);
  const today = new Date();

  // Zero out the time part for accurate day difference
  endDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diffInMs = endDate - today;
  const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

  return diffInDays > 0 ? diffInDays : 0; // Returns 0 if trial has ended
}