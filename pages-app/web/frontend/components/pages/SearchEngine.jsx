import {
  AlphaCard,
  Box,
  HorizontalGrid,
  Text,
  VerticalStack,
} from "@shopify/polaris";
import React from "react";

export const SearchEngine = () => {
  return (
    <AlphaCard roundedAbove="sm">
      <VerticalStack gap="4">
        <Text fontWeight="bold">Search engine listing preview</Text>
        <Text>
          Add a description to see how this Page might appear in a search engine
          listing
        </Text>
      </VerticalStack>
    </AlphaCard>
  );
};
