import {
  AlphaCard,
  ChoiceList,
  Select,
  Text,
  VerticalStack,
} from "@shopify/polaris";
import React, { useCallback, useState } from "react";

function SelectExample() {
  const [selected, setSelected] = useState("today");

  const handleSelectChange = useCallback((value) => setSelected(value), []);

  const options = [
    { label: "Default page", value: "default" },
    { label: "contact", value: "contact" },
  ];

  return (
    <Select
      label="Theme template"
      options={options}
      onChange={handleSelectChange}
      value={selected}
    />
  );
}
export const OnlineStore = () => {
  return (
    <AlphaCard roundedAbove="sm">
      <VerticalStack gap="4">
        <Text fontWeight="bold">Online Store</Text>
        <SelectExample />
        <Text>
          Assign a template from your current theme to define how the page is
          displayed.
        </Text>
      </VerticalStack>
    </AlphaCard>
  );
};
