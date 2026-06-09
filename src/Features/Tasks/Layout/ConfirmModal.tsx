import TypoGraphy from "../../../UI/TypoGraphy";
import ButtonUI from "../../../UI/ButtonUI";
import { useGlobalStore } from "@/store/Global";
import { useTaskStore } from "@/store/Tasks";
import { colors } from "@/UI/color";

/**
 * ConfirmModalContext Component
 * Renders the structural viewport context for confirming task deletion actions.
 * Extracts the pre-buffered target integer ID from the global state workspace to execute safe filtering mutations.
 */
export function ConfirmModalContext() {
  /** Global UI state dispatcher to handle modal view toggles */
  const handleModal = useGlobalStore((state) => state.handleModal);

  /** Contextual state properties and mutation dispatchers from the task store partition */
  const DeleteTask = useTaskStore((state) => state.DeleteTask);
  const Loading = useTaskStore((state) => state.loading);
  const setLoading = useTaskStore((state) => state.setLoading);

  /**
   * Orchestrates the deletion commitment routine.
   * Leverages a timeout buffer if async operations are simulated, ensuring atomic state synchronization.
   */
  const handleDeleteCommit = () => {
    setLoading(true);

    // Pass the pre-buffered TaskID downstream to the mutation engine
    DeleteTask();

    setLoading(false);
    handleModal(false); // Gracefully terminate modal view portals
  };

  return (
    <div className="w-full flex flex-col">
      {/* Form Fields Header & Input Controls Group */}
      <div>
        <TypoGraphy
          title="حذف المهمة"
          variant={"h6"}
          sx={{ textAlign: "right" }}
        />
      </div>
      <div>
        <TypoGraphy
          title="هل أنت متأكد من حذف هذه المهمة؟"
          variant={"h6"}
          sx={{
            textAlign: "right",
            fontSize: "0.775rem",
            margin: "10px 0",
            opacity: "0.6",
          }}
        />
      </div>

      {/* Action Decision Control Dock */}
      <div className="w-full flex flex-row my-2 gap-3 ">
        {/* Destructive Execution Trigger Node */}
        <ButtonUI
          onClick={handleDeleteCommit}
          sx={{ background: colors.error }}
          disabled={Loading}
          variant="contained"
          title="حذف"
        />

        {/* Abortion Control Trigger Node */}
        <ButtonUI
          onClick={() => handleModal(false)}
          disabled={Loading}
          variant="text"
          title="الغاء"
        />
      </div>
    </div>
  );
}
