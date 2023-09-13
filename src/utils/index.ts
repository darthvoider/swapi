export const getSpecieId = (url: string | undefined): string | undefined => {
  if (!url) return undefined;

  const parts = url.split("/");
  return parts[parts.length - 2];
};
