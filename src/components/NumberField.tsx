import * as React from "react";
import { NumberField as BaseNumberField } from "@base-ui/react/number-field";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import "./NumberField.css";

type NumberFieldProps = {
  min?: number;
  max?: number;
  defaultValue?: number;
  value?: number;
  label?: string;
  onChange?: (value: number) => void;
};

export default function NumberField({ min, max, defaultValue, value, label, onChange }: NumberFieldProps) {
  const id = React.useId();
  return (
    <BaseNumberField.Root
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
        <FormControl ref={props.ref} className="number-field" size="small" disabled={state.disabled} required={state.required} variant="outlined">
          {props.children}
        </FormControl>
      )}
    >
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <BaseNumberField.Input
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
            label={label}
            slotProps={{ input: props }}
            endAdornment={
              <InputAdornment position="end" className="number-field__adornment">
                <BaseNumberField.Increment render={<IconButton size="small" aria-label="Increase" />}>
                  <KeyboardArrowUpIcon fontSize="small" className="number-field__icon--up" />
                </BaseNumberField.Increment>
                <BaseNumberField.Decrement render={<IconButton size="small" aria-label="Decrease" />}>
                  <KeyboardArrowDownIcon fontSize="small" className="number-field__icon--down" />
                </BaseNumberField.Decrement>
              </InputAdornment>
            }
          />
        )}
      />
    </BaseNumberField.Root>
  );
}
