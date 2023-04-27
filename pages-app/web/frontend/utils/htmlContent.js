export const getTextContent = (htmlString) => {
  var div = document.createElement("div");
  div.innerHTML = htmlString;

  // Lấy nội dung văn bản (text) bên trong đối tượng div
  var textContent = div.textContent || div.innerText || "";
  return textContent;
};
