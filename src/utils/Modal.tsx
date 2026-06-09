import { Box, Modal } from "@mui/material";
import { useGlobalStore } from "@/store/Global";

/**
 * Interface definition for the {@link BasicModal} component props.
 */
interface BasicModalProps {
  /** @type {string} Window title text used primarily for accessibility registries */
  title: string;
  /** @type {React.ComponentType} The internal layout component constructor to be instantiated inside the viewport */
  context: React.ComponentType;
  /** * Callback handler triggered when the backdrop window registers an escape or close event.
   * @param {boolean} state - Binary flag explicitly indicating the next modal visibility state.
   */
  OnClose: (state: boolean) => void;
}

/**
 * BasicModal Component.
 * A reusable container abstraction wrapping Material UI's core Modal system.
 * Subscribes directly to global store properties to manage overlay triggers,
 * and handles localized layout mounting dynamically via context parameters.
 * * @component
 */
export default function BasicModal(children: BasicModalProps) {
  /** @type {boolean} Global reactive binary state checking if this viewport overlay should render visible */
  const ModalState = useGlobalStore((state) => state.Modal);

  return (
    <Modal
      open={ModalState.isOpen}
      onClose={() => children.OnClose(false)}
      aria-labelledby="modal-title"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "white",
          p: 4,
          borderRadius: "15px",
        }}
      >
        {/* Dynamic Context Viewport Renderer Node */}
        <children.context />
      </Box>
    </Modal>
  );
}
