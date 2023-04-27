import {
  AlphaCard,
  Box,
  HorizontalGrid,
  Text,
  VerticalStack,
} from "@shopify/polaris";
import React from "react";

const getUrl = (title) => {
  const s = title.toLowerCase().split(" ");
  return "https://quynhquynhiee.myshopify.com/pages/" + s.join("-");
};

const getText = (body_html) => {
  // Tạo một đối tượng div ẩn để chứa chuỗi HTML
  var div = document.createElement("div");
  div.innerHTML = body_html;

  // Lấy nội dung văn bản (text) bên trong đối tượng div
  var textContent = div.textContent || div.innerText || "";
  return textContent;
};
export const SearchEngine = ({ title, body_html }) => {
  return (
    <AlphaCard roundedAbove="sm">
      <VerticalStack gap="4">
        <Text fontWeight="bold">Search engine listing preview</Text>
        {title ? (
          <div>
            <Text variant="headingLg">{title}</Text>
            <Text color="success">{getUrl(title)}</Text>
            <Text color="subdued">{getText(body_html)}</Text>
          </div>
        ) : (
          <p>
            Add a title and description to see how this Page might appear in a
            search engine listing
          </p>
        )}
      </VerticalStack>
    </AlphaCard>
  );
};
