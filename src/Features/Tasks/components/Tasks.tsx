import { getRelativeTime } from "@/helpers/Date";
import { useGlobalStore } from "@/store/Global";
import { useTaskStore } from "@/store/Tasks";
import type { TaskType } from "@/Types/Tasks";
import ButtonUI from "@/UI/ButtonUI";
import TypoGraphy from "@/UI/TypoGraphy";
import { Check, Delete, Edit, RestartAltOutlined } from "@mui/icons-material";
import { ButtonGroup } from "@mui/material";
import { ConfirmModalContext } from "../Layout/ConfirmModal";
import { UpdateTaskModalContext } from "../Layout/UpdateTaskModal";
import { colors } from "@/UI/color";

/**
 * TasksSection Component
 * Renders an isolated, chronologically sorted viewport layout of active and completed tasks.
 * Implements defensive sorting mechanics and synchronizes UI context states with global stores.
 */
export default function TasksSection() {
  /** Reactive stream reading the raw immutable tasks array directly from the Zustand partition */
  const TaskList: TaskType[] = useTaskStore((state) => state.Tasks);

  /**
   * Defensive Chronological Sorting Operation
   * Creates an un-mutated shallow copy array pipeline to compute order priorities.
   * Tasks missing a valid timestamp (null/undefined) are dynamically grouped and sank to the viewport bottom.
   */
  const sortedTasks = [...TaskList].sort((a, b) => {
    // STEP 1: If both tasks lack scheduled metadata, preserve their existing index positioning
    if (!a.date && !b.date) return 0;

    // STEP 2: If leading pointer (a) is nullified, push it downstream to the layout bottom
    if (!a.date) return 1;

    // STEP 3: If trailing pointer (b) is nullified, shift it downstream to the layout bottom
    if (!b.date) return -1;

    /**
     * STEP 4: Safe Chronological Evaluation
     * Explicit guard clauses guarantee that execution layers only handle confirmed ISO strings.
     */
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  /** Destructured action dispatchers extracted from global state management architectures */
  const setTaskID = useTaskStore((state) => state.setTaskID);
  const handleModal = useGlobalStore((state) => state.handleModal);
  const completeTask = useTaskStore((state) => state.completeTask);
  const repeatTask = useTaskStore((state) => state.repeatTask);

  /**
   * Commits an atomic execution update marking a targeted task as completed.
   * @param {number} taskID - The unique database integer identifier of the target task.
   */
  const handleComplete = (taskID: number) => {
    completeTask(taskID);
  };

  /**
   * Reverses a completed state flag, cycling the targeted task node back into active status records.
   * @param {number} taskID - The unique database integer identifier of the target task.
   */
  const handleRepeat = (taskID: number) => {
    repeatTask(taskID);
  };

  /**
   * Locks the global target ID into state buffers and dynamically injects the Delete Confirmation view into the active portal wrapper.
   * @param {number} taskID - The unique database integer identifier of the target task.
   */
  const handleDelete = (taskID: number) => {
    setTaskID(taskID);
    handleModal(true, ConfirmModalContext);
  };

  /**
   * Locks the global target ID into state buffers and dynamically injects the Task Modification form component into the active portal wrapper.
   * @param {number} taskID - The unique database integer identifier of the target task.
   */
  const handleEdit = (taskID: number) => {
    setTaskID(taskID);
    handleModal(true, UpdateTaskModalContext);
  };

  return (
    <>
      {/* Scrollable Viewport Wrapper Node */}
      <ul className="overflow-y-auto h-full my-5 max-h-105 scrollbar-thumb-brand-secondary scrollbar-track-gray-100 scrollbar-gutter-stable">
        {/* Conditional Blank Slate Empty State Handler */}
        {sortedTasks.length <= 0 && (
          <p className="text-center text-gray-500 mt-10">لا توجد مهام حالياً</p>
        )}

        {/* Iterative Rendering Loop Engine */}
        {sortedTasks.map((task) => (
          <li
            key={task.id}
            className="flex flex-row-reverse gap-3 my-5 text-brand-primary bg-white px-5 py-3 rounded-md shadow-xl"
          >
            {/* Context Text Box Sub-Container (RTL Typography Layout) */}
            <div className="flex flex-col justify-start items-end w-full">
              <TypoGraphy
                title={task.title}
                variant="h6"
                sx={{ textAlign: "right" }}
              />
              <TypoGraphy
                title={task.description}
                variant="h6"
                sx={{
                  textAlign: "right",
                  fontSize: "0.875rem",
                  maxWidth: "100%",
                }}
              />
            </div>

            {/* Action Group Interactions Sub-Container (LTR Controller Layout) */}
            <div className="flex flex-col justify-end items-start w-full">
              <ButtonGroup>
                {/* Scenario A: Conditional View Rendering for Finished Tasks */}
                {task.completed && (
                  <>
                    <ButtonUI
                      title="إعادة"
                      variant="contained"
                      startIcon={
                        <RestartAltOutlined
                          sx={{
                            ":hover": {
                              transform: "rotate(360deg)",
                              transition: "transform 0.5s ease",
                            },
                          }}
                        />
                      }
                      sx={{ background: colors.info }}
                      onClick={() => handleRepeat(task.id)}
                    />
                    {/* Local Status Committing Controller Node */}
                    <ButtonUI
                      title={"مكتملة"}
                      variant="contained"
                      startIcon={!task.completed && <Check />}
                      sx={{ background: colors.text_gray }}
                      disabled={task.completed}
                      onClick={() => handleComplete(task.id)}
                    />
                  </>
                )}

                {/* Scenario B: Conditional View Rendering for Pending Active Tasks */}
                {!task.completed && (
                  <>
                    <ButtonUI
                      title="حذف"
                      variant="contained"
                      startIcon={<Delete />}
                      sx={{ background: "#fc3553" }}
                      onClick={() => handleDelete(task.id)}
                    />

                    <ButtonUI
                      title="تعديل"
                      variant="contained"
                      startIcon={<Edit />}
                      onClick={() => handleEdit(task.id)}
                    />
                    {/* Global Status Committing Controller Node */}
                    <ButtonUI
                      title={"إكمال"}
                      variant="contained"
                      startIcon={!task.completed && <Check />}
                      sx={{ background: "#219c42", opacity: 0.7 }}
                      disabled={task.completed}
                      onClick={() => handleComplete(task.id)}
                    />
                  </>
                )}
              </ButtonGroup>

              {/* Localized Distance Metadata View Node */}
              <div className="flex flex-row text-sm mt-4 ">
                {getRelativeTime(task.date)}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
