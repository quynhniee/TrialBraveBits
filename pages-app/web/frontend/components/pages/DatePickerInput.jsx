import {
  AlphaCard,
  DatePicker,
  Icon,
  Popover,
  TextField,
  VerticalStack,
} from "@shopify/polaris";
import { useEffect, useRef, useState } from "react";
import { CalendarMinor } from "@shopify/polaris-icons";

function DatePickerInput() {
  const [visible, setVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [{ month, year }, setDate] = useState({
    month: selectedDate.getMonth(),
    year: selectedDate.getFullYear(),
  });
  const formattedValue = selectedDate.toISOString().slice(0, 10);
  const datePickerRef = useRef(null);

  function handleInputValueChange() {
    console.log("handleInputValueChange");
  }
  function handleOnClose({ relatedTarget }) {
    setVisible(false);
  }
  function handleMonthChange(month, year) {
    setDate({ month, year });
  }
  function handleDateSelection({ end: newSelectedDate }) {
    setSelectedDate(newSelectedDate);
    setVisible(false);
  }
  useEffect(() => {
    if (selectedDate) {
      setDate({
        month: selectedDate.getMonth(),
        year: selectedDate.getFullYear(),
      });
    }
  }, [selectedDate]);
  return (
    <Popover
      active={visible}
      autofocusTarget="none"
      preferredAlignment="left"
      fullWidth
      preferInputActivator={false}
      preferredPosition="below"
      preventCloseOnChildOverlayClick
      onClose={handleOnClose}
      activator={
        <TextField
          role="combobox"
          label={"Visibility date"}
          prefix={<Icon source={CalendarMinor} />}
          value={formattedValue}
          onFocus={() => setVisible(true)}
          onChange={handleInputValueChange}
          autoComplete="off"
        />
      }
    >
      <AlphaCard ref={datePickerRef}>
        <DatePicker
          month={month}
          year={year}
          selected={selectedDate}
          onMonthChange={handleMonthChange}
          onChange={handleDateSelection}
        />
      </AlphaCard>
    </Popover>
  );
}

export default DatePickerInput;
