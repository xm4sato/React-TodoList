import {
  TextField,
  type FormHelperTextProps,
  type SxProps,
  type TextFieldVariants,
} from "@mui/material";
import {
  useState,
  type JSX,
  type PropsWithChildren,
  type ProviderProps,
} from "react";

interface TextFieldUI {
  multiline?: boolean;
  label: string;
  value?: string;
  variant?: TextFieldVariants;
  error?: boolean;
  helperText?: string;
  slotProps?: {
    input: {
      startAdornment: JSX.Element;
    };
  };
  style?: React.CSSProperties;
  sx?: SxProps;
  Onchange: (e: any) => void;
}

function TextFieldUI(children: TextFieldUI) {
  return (
    <>
      <TextField
        onChange={(e) => children.Onchange(e.target.value)}
        id="standard-basic"
        label={children.label}
        value={children.value}
        multiline={children.multiline || false}
        variant={children.variant}
        error={children.error}
        helperText={children.helperText}
        style={children.style}
        slotProps={children.slotProps}
        sx={children.sx}
      />
    </>
  );
}

export default TextFieldUI;
