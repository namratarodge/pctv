export const parseQueryString = (
  queryString: string
): Record<string, string> => {
  if (!queryString) return {};
  return queryString
    .split("&")
    .filter(Boolean)
    .reduce((acc: Record<string, string>, part) => {
      const [key, value] = part.split("=");
      acc[key] = decodeURIComponent(value || "");
      return acc;
    }, {});
};
