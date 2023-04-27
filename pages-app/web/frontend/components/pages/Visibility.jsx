import {
  AlphaCard,
  Button,
  ChoiceList,
  Collapsible,
  Text,
  VerticalStack,
} from "@shopify/polaris";
import React, { useCallback, useState } from "react";

function getTimeZoneAbbreviation(date) {
  var timeZone = date.toString().match(/\((.*?)\)/);
  if (timeZone && timeZone.length > 1) {
    return timeZone[1];
  }
  return "";
}

export const Visibility = ({ dateString }) => {
  const [visibility, setVisibility] = useState("visible");
  var date = dateString ? new Date(dateString) : new Date();

  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();
  var hours = date.getHours();
  var minutes = date.getMinutes();

  var formattedDate =
    month +
    "/" +
    day +
    "/" +
    year +
    ", " +
    hours +
    ":" +
    (minutes < 10 ? "0" : "") +
    minutes +
    " " +
    getTimeZoneAbbreviation(date);

  const TimePicker = () => {
    const [open, setOpen] = useState(false);

    const handleToggle = useCallback(() => setOpen((open) => !open), []);
    return (
      <div>
        <Button onClick={handleToggle} ariaExpanded={open}>
          Set visibility date
        </Button>
        <Collapsible
          open={open}
          id="basic-collapsible"
          transition={{ duration: "500ms", timingFunction: "ease-in-out" }}
          expandOnPrint
        >
          <p>
            Your mailing list lets you contact customers or visitors who have
            shown an interest in your store. Reach out to them with exclusive
            offers or updates about your products.
          </p>
        </Collapsible>
      </div>
    );
  };
  return (
    <AlphaCard roundedAbove="sm">
      <VerticalStack gap="4">
        <Text fontWeight="bold">Visibility</Text>
        <ChoiceList
          choices={[
            {
              label:
                visibility === "visible"
                  ? `Visible as of ${formattedDate}`
                  : "Visible",
              value: "visible",
            },
            { label: "Hidden", value: "hidden" },
          ]}
          selected={visibility}
          onChange={(value) => {
            setVisibility(value[0]);
          }}
        />
        <TimePicker />
      </VerticalStack>
    </AlphaCard>
  );
};
