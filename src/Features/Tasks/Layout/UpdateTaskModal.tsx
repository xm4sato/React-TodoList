import { type ProjectType } from "@/Types/Projects";
import TextFieldUI from "../../../UI/TextField";
import TypoGraphy from "../../../UI/TypoGraphy";
import ButtonUI from "../../../UI/ButtonUI";
import { useGlobalStore } from "@/store/Global";
import DatePicker from "@/helpers/DateTimePicker";
import { colors } from "@/UI/color";
import { useProjectStore } from "@/store/Projects";
import { useTaskStore } from "@/store/Tasks";
import { useState } from "react";
import type { TaskType } from "@/Types/Tasks";

/**
 * UpdateTaskModalContext Component
 * Implements the isolated "Draft State Pattern" (Sandbox) for updating existing tasks.
 * Captures an initial snapshot of the targeted task into a local buffer state,
 * shielding the core global store records from dirty mutations during form interactions.
 */
export const UpdateTaskModalContext = () => {
  /** Global UI state dispatcher to handle modal view states */
  const handleModal = useGlobalStore((state) => state.handleModal);

  /** Contextual data hooks and action dispatchers extracted from cache store partitions */
  const Projects = useProjectStore((state) => state.Projects);
  const TaskID = useTaskStore((state) => state.TaskID);
  const Tasks = useTaskStore((state) => state.Tasks);
  const updateTask = useTaskStore((state) => state.UpdateTask);

  /** Evaluates and captures the target un-mutated master task reference from the store array */
  const SelectedTask = Tasks.find((t) => t.id === TaskID);

  /**
   * STEP 1: Sandbox Local State Instantiation
   * Seeds the local transactional component state using values derived from the active task.
   * Strictly typed to match the core standard `TaskType` model contract.
   */
  const [taskDraft, setTaskDraft] = useState<TaskType>({
    id: SelectedTask?.id || 0,
    title: SelectedTask?.title || "",
    description: SelectedTask?.description || "",
    date: SelectedTask?.date || null,
    RelatedProjects: SelectedTask?.RelatedProjects || [],
    completed: SelectedTask?.completed || false, // Included to preserve the completion state flag
  });

  /**
   * STEP 2: Structural Local State Field Mutator Closure
   * Updates explicit object properties safely inside the local sandboxed state.
   * @param {keyof TaskType} key - The target property key identifier within the schema structure.
   * @param {any} value - The incoming primitive or composite update value node.
   */
  const updateDraftField = (key: keyof TaskType, value: any) => {
    setTaskDraft((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  /**
   * Toggles the presence of associated project relationship integers inside the sandboxed state arrays.
   * @param {ProjectType} project - The targeted project entity record evaluated from the tag collection loop.
   */
  const handleRelatedProjectUpdate = (project: ProjectType) => {
    const isSelected = taskDraft.RelatedProjects?.includes(project.id);
    const updatedProjects = isSelected
      ? taskDraft.RelatedProjects?.filter((id) => id !== project.id)
      : [...(taskDraft.RelatedProjects || []), project.id];

    updateDraftField("RelatedProjects", updatedProjects);
  };

  return (
    <div className="w-full flex flex-col">
      {/* Form Fields Header & Input Controls Group */}
      <div>
        <TypoGraphy
          title="تعديل مهمة"
          variant={"h6"}
          sx={{ textAlign: "right" }}
        />

        {/* Task Title Form Input (Bound completely to the sandbox draft frame) */}
        <TextFieldUI
          value={taskDraft.title}
          Onchange={(value) => updateDraftField("title", value)}
          label="اسم المهمة"
          variant="standard"
          sx={{
            display: "flex",
            justifyContent: "right",
            margin: "10px 0",
            "& label": { left: "auto", right: 0, transformOrigin: "right" },
            "& .MuiInput-root": { textAlign: "right", direction: "rtl" },
            "& .MuiInput-underline:after": { transformOrigin: "right" },
          }}
        />

        {/* Task Optional Description Form Input (Bound completely to the sandbox draft frame) */}
        <TextFieldUI
          value={taskDraft.description}
          Onchange={(value) => updateDraftField("description", value)}
          label="وصف المهمة (إختياري)"
          multiline={true}
          variant="standard"
          sx={{
            display: "flex",
            justifyContent: "right",
            margin: "10px 0",
            "& label": { left: "auto", right: 0, transformOrigin: "right" },
            "& .MuiInput-root": { textAlign: "right", direction: "rtl" },
            "& .MuiInput-underline:after": { transformOrigin: "right" },
          }}
        />
      </div>

      <div className="my-3">
        <TypoGraphy
          title="تخصيص المهمة"
          variant={"h6"}
          sx={{ textAlign: "right", fontSize: "1.25rem" }}
        />

        {/* DatePicker updating chronological ISO parameters inside the sandbox schema */}
        <DatePicker
          CurrentDate={taskDraft.date}
          setTime={(value: string | null) => updateDraftField("date", value)}
        />

        <TypoGraphy
          title=" -: إضافة الى المشروع (إختياري)"
          variant={"h6"}
          sx={{
            textAlign: "right",
            margin: "20px 0",
            fontSize: "0.80rem",
            color: "#000",
            opacity: 0.8,
          }}
        />

        {/* Associated Project Relationships Selection Grid Container */}
        <div className="flex flex-row flex-wrap gap-2 justify-end items-start w-full max-h-21.5 overflow-y-auto scrollbar-thumb-brand-secondary scrollbar-track-gray-100 scrollbar-gutter-stable">
          {Projects.length <= 0 && <p>لا توجد مشاريع متاحة</p>}
          {Projects.length > 0 &&
            Projects.map((project) => (
              <div key={project.id}>
                <ButtonUI
                  title={project.name}
                  onClick={() => handleRelatedProjectUpdate(project)}
                  sx={{
                    textAlign: "right",
                    color: colors.text_main,
                    // Highlights conditional node layouts by inspecting the sandboxed state arrays
                    background: taskDraft.RelatedProjects?.includes(project.id)
                      ? colors.brand_primary
                      : colors.brand_secondary,
                    border: taskDraft.RelatedProjects?.includes(project.id)
                      ? `1.5px solid ${colors.success}`
                      : `none`,
                    borderRadius: "5px",
                    padding: "5px 10px",
                    cursor: "pointer",
                    transition: "0.3s all",
                    ":hover": {
                      background: colors.brand_primary,
                      color: colors.text_secondry,
                    },
                  }}
                />
              </div>
            ))}
        </div>
      </div>

      {/* Actions Button Submission Control Dock */}
      <div className="w-full flex flex-row my-2 gap-3 ">
        {/* Form Commit Control: Packs the transactional sandbox properties and dispatches updates upstream */}
        <ButtonUI
          onClick={() => {
            updateTask(TaskID, taskDraft);
            handleModal(false); // Graceful modal execution shutdown
          }}
          variant="contained"
          title="حفظ"
        />

        {/* Abortion Control Trigger: Safely purges and destroys sandbox changes without mutating application caches */}
        <ButtonUI
          onClick={() => handleModal(false)}
          variant="text"
          title="الغاء"
        />
      </div>
    </div>
  );
};
