import {
  AlphaCard,
  Box,
  Button,
  ChoiceList,
  Collapsible,
  DatePicker,
  Icon,
  Popover,
  Text,
  TextField,
  VerticalStack,
} from "@shopify/polaris";
import React, { useCallback, useEffect, useRef, useState } from "react";
import DatePickerInput from "./DatePickerInput";
import TimePickerInput from "./TimePickerInput";

function getTimeZoneAbbreviation(date) {
  var timeZone = date.toString().match(/\((.*?)\)/);
  if (timeZone && timeZone.length > 1) {
    return timeZone[1];
  }
  return "";
}

const DateTimePicker = ({ open, setOpen }) => {
  const handleToggle = useCallback(() => setOpen((open) => !open), []);

  return (
    <div>
      {open === false && (
        <Button onClick={handleToggle} ariaExpanded={open} plain>
          Set visibility date
        </Button>
      )}
      <Collapsible
        open={open}
        id="basic-collapsible"
        transition={{ duration: "100ms", timingFunction: "ease-in-out" }}
        expandOnPrint
      >
        <VerticalStack gap="2">
          <DatePickerInput />
          <TimePickerInput />
        </VerticalStack>
      </Collapsible>
      {open === true && (
        <Button onClick={handleToggle} ariaExpanded={open} plain>
          Clear date...
        </Button>
      )}
    </div>
  );
};

export const Visibility = ({
  page,
  dateString,
  visibility,
  setVisibility,
  setActiveSaveBar,
  currentVisibility,
}) => {
  const [visiblePicker, setVisiblePicker] = useState(false);
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

  // useEffect(() => {
  //   if (visibility === "visible") setVisiblePicker(false);
  //   // const tmp = page?.published_at ? "visible" : "hidden";
  //   // console.log(page?.published_at, visibility);
  //   // if (visibility !== tmp) setActiveSaveBar(true);
  //   // else setActiveSaveBar(false);
  //   setActiveSaveBar(visibility !== currentVisibility ? true : false);
  // }, [visibility]);

  useEffect(() => {
    if (visiblePicker === true) setVisibility("hidden");
  }, [visiblePicker]);

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
        <DateTimePicker open={visiblePicker} setOpen={setVisiblePicker} />
      </VerticalStack>
    </AlphaCard>
  );
};
