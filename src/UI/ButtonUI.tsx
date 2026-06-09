import Stack from "@mui/material/Stack";
import Button, { type ButtonProps } from "@mui/material/Button";

export default function ButtonUI(children: ButtonProps) {
  return (
    <Stack spacing={2} direction="row">
      <Button
        onClick={children.onClick}
        variant={children.variant}
        sx={children.sx}
        disabled={children.disabled}
        startIcon={children.startIcon}
        endIcon={children.endIcon}
        className={children.className}
      >
        {children.title}
      </Button>
    </Stack>
  );
}
