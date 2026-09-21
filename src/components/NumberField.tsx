import * as React from "react";
import { NumberField } from "@base-ui/react/number-field";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export default function ExampleNumberField({ min, max, defaultValue, value, label, onChange }: { min?: number; max?: number; defaultValue?: number; value?: number; label?: string; onChange?: (value: number) => void }) {
  const id = React.useId();
  return (
    <NumberField.Root
      id={id}
      defaultValue={defaultValue}
      value={value}
      onValueChange={(value: number | null) => {
        if (onChange && value !== null) {
          onChange(value);
        }
      }}
      min={min}
      max={max}
      render={(props, state) => (
        <FormControl ref={props.ref} size="small" disabled={state.disabled} required={state.required} variant="outlined">
          {props.children}
        </FormControl>
      )}
    >
      <InputLabel
        htmlFor={id}
        sx={{
          color: "var(--text-muted)",
          "&.Mui-focused": { color: "var(--accent)" },
          "&.Mui-disabled": { color: "var(--text-muted)" },
        }}
      >
        {label}
      </InputLabel>
      <NumberField.Input
        id={id}
        render={(props, state) => (
          <OutlinedInput
            inputRef={props.ref}
            value={state.inputValue}
            onBlur={props.onBlur}
            onChange={props.onChange}
            onKeyUp={props.onKeyUp}
            onKeyDown={props.onKeyDown}
            onFocus={props.onFocus}
            size="small"
            label="Amount"
            slotProps={{ input: props }}
            endAdornment={
              <InputAdornment
                position="end"
                sx={{
                  flexDirection: "column",
                  maxHeight: "unset",
                  alignSelf: "stretch",
                  borderLeft: 1,
                  borderColor: "var(--border)",
                  ml: 0,
                  p: 0,
                  "& button": {
                    p: 0,
                    m: 0,
                    minWidth: "auto",
                    flex: 1,
                    borderRadius: 0.5,
                    color: "var(--text)",
                    backgroundColor: "var(--surface)",
                    "&:hover": { backgroundColor: "var(--hover)" },
                  },
                }}
              >
                <NumberField.Increment render={<IconButton size="small" aria-label="Increase" />}>
                  <KeyboardArrowUpIcon fontSize="small" sx={{ transform: "translateY(2px)", color: "var(--text)" }} />
                </NumberField.Increment>
                <NumberField.Decrement render={<IconButton size="small" aria-label="Decrease" />}>
                  <KeyboardArrowDownIcon fontSize="small" sx={{ transform: "translateY(-2px)", color: "var(--text)" }} />
                </NumberField.Decrement>
              </InputAdornment>
            }
            sx={{
              pr: 0,
              color: "var(--text)",
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "var(--border)" },
              "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "var(--border)" },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "var(--focus-ring)" },
              "& .MuiInputBase-input": { width: "4ch", color: "var(--text)" },
              "&.Mui-disabled": { color: "var(--text-muted)" },
            }}
          />
        )}
      />
    </NumberField.Root>
  );
}
