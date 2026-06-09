import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/ar"; // Activates full Arabic locale support for the picker UI layout
import { useState } from "react";

interface DatePickerProps {
  /** The standard ISO string representations of the date or null if unassigned */
  CurrentDate: string | null;
  /** Callback dispatcher to update the upstream global Zustand state store */
  setTime: (value: string | null) => void;
}

export default function DatePicker({ CurrentDate, setTime }: DatePickerProps) {
  /**
   * STEP 1: Incoming Data Normalization
   * Parse the immutable ISO string prop into a mutable Dayjs object instance.
   * Resolves to null if the dependency primitive is undefined or falsy.
   */
  const [dateValue, setDateValue] = CurrentDate
    ? useState<Dayjs>(dayjs(CurrentDate))
    : useState<Dayjs | null>(null);

  /**
   * STEP 2: Unified Change Event Handler
   * Orchestrates synchronization mutations between the local input viewport and the core store.
   * @param {Dayjs | null} newValue - The raw selected snapshot node evaluated from the UI picker.
   */
  const handleDateTimeChange = (newValue: Dayjs | null) => {
    if (newValue && newValue.isValid()) {
      // Safely transform valid Dayjs objects to standard ISO strings before committing
      setTime(newValue.toISOString());
      setDateValue(newValue); // Update local state to reflect the new selection immediately
    } else {
      // Safeguard against broken inputs by resetting the primitive to null
      setTime(null);
    }
  };

  return (
    /** * STEP 3: Localization Context Bootstrapping
     * Injects the Dayjs adapter and enforces regional formatting properties.
     */
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ar">
      <div className="w-full mt-5">
        <DateTimePicker
          label="موعد التذكير والمهمة"
          value={dateValue}
          onChange={handleDateTimeChange}
          disablePast // System safeguard to prevent selecting chronological dead-ends (the past)
          // Layout display presentation mask format
          format="YYYY-MM-DD hh:mm A"
          /**
           * STEP 4: Material-UI Structural Style Overrides
           * Implements Right-to-Left (RTL) input field alignment parameters to preserve UX harmony.
           */
          slotProps={{
            textField: {
              variant: "standard",
              fullWidth: true,
              sx: {
                "& .MuiInputBase-input": {
                  textAlign: "right",
                  direction: "rtl",
                },
                "& .MuiInputLabel-root": {
                  right: 12,
                  left: "auto",
                  transformOrigin: "right",
                },
                "& .MuiInput-underline:after": {
                  transformOrigin: "right", // Animates the underline focus highlight starting from the right anchor
                },
              },
            },
          }}
        />
      </div>
    </LocalizationProvider>
  );
}
