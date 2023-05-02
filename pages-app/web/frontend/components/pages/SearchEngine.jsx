import { AlphaCard, Text, VerticalStack } from "@shopify/polaris";
import React from "react";
import { getTextContent } from "../../utils/htmlContent";
import { getUrl } from "../../utils/preview";

export const SearchEngine = ({ title, body_html }) => {
  return (
    <AlphaCard roundedAbove="sm">
      <VerticalStack gap="4">
        <Text fontWeight="bold">Search engine listing preview</Text>
        {title && body_html ? (
          <div>
            <Text variant="headingLg">{title}</Text>
            <Text color="success">{getUrl(title)}</Text>
            <Text color="subdued">{getTextContent(body_html)}</Text>
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
