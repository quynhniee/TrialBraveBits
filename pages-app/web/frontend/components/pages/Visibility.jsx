import { AlphaCard, ChoiceList, Text, VerticalStack } from "@shopify/polaris";
import React from "react";

export const Visibility = () => {
  return (
    <AlphaCard roundedAbove="sm">
      <VerticalStack gap="4">
        <Text fontWeight="bold">Visibility</Text>
        <ChoiceList
          choices={[
            { label: "Visible ", value: "visible " },
            { label: "Hidden", value: "hidden" },
          ]}
          selected={""}
        />
      </VerticalStack>
    </AlphaCard>
  );
};
