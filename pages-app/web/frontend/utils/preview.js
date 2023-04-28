export const getUrl = (title) => {
  const s = title.trim().toLowerCase().split(" ");
  return "https://quynhquynhiee.myshopify.com/pages/" + s.join("-");
};
