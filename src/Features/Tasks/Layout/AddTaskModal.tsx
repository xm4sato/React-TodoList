import { type ProjectType } from "@/Types/Projects";
import TextFieldUI from "../../../UI/TextField";
import TypoGraphy from "../../../UI/TypoGraphy";
import ButtonUI from "../../../UI/ButtonUI";
import { useGlobalStore } from "@/store/Global";
import DatePicker from "@/helpers/DateTimePicker";
import { colors } from "@/UI/color";
import { useProjectStore } from "@/store/Projects";
import { useTaskStore } from "@/store/Tasks";
import { useState, useEffect } from "react";

/**
 * TaskModalContext Component
 * Manages the isolated local form sandbox for creating and appending new task nodes.
 * Decouples immediate input text interactions from mutating core global Zustand states prematurely.
 */
export const TaskModalContext = () => {
  /** Global UI state dispatcher to handle modal view toggles */
  const handleModal = useGlobalStore((state) => state.handleModal);

  /** Data fetchers and mutation dispatchers extracted from cache store partitions */
  const Projects = useProjectStore((state) => state.Projects);
  const Tasks = useTaskStore((state) => state.Tasks);
  const addTask = useTaskStore((state) => state.addTask);
  const resetTask = useTaskStore((state) => state.resetTask);

  /**
   * STEP 1: The Isolated Sandbox Local State (Draft State Pattern)
   * Stores form fields safely within the component lifecycle scope.
   * Prevents leaking dirty text inputs into the global store context upon abortion (canceling).
   */
  const [taskDraft, setTaskDraft] = useState({
    title: "",
    description: "",
    date: null as string | null,
    RelatedProjects: [] as number[], // Tracks associated project integer IDs
    completed: false,
  });

  /**
   * STEP 2: Unified Local State Mutator Closure
   * Updates specific key-value properties inside the sandbox state object context.
   */
  const updateDraftField = (key: keyof typeof taskDraft, value: any) => {
    setTaskDraft((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  /**
   * Toggles the presence of a project ID inside the localized sandbox array array
   * @param {ProjectType} project - The selected project data snapshot node.
   */
  const handleProjectToggle = (project: ProjectType) => {
    const isSelected = taskDraft.RelatedProjects.includes(project.id);
    const updatedProjects = isSelected
      ? taskDraft.RelatedProjects.filter((id) => id !== project.id)
      : [...taskDraft.RelatedProjects, project.id];

    updateDraftField("RelatedProjects", updatedProjects);
  };

  useEffect(() => {
    console.log("Tasks array synchronizations logged:", Tasks);
  }, [Tasks]);

  return (
    <div className="w-full flex flex-col">
      {/* Form Fields Header & Input Controls Group */}
      <div>
        <TypoGraphy
          title="إضافة مهمة"
          variant={"h6"}
          sx={{ textAlign: "right" }}
        />

        {/* Task Name Input Handler bound entirely to the sandbox state */}
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

        {/* Task Optional Description Input Handler bound entirely to the sandbox state */}
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

        {/* DatePicker injecting picked ISO strings directly into the local sandbox */}
        <DatePicker
          CurrentDate={taskDraft.date}
          setTime={(value) => updateDraftField("date", value)}
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

        {/* Project Selector Tags Dock Container */}
        <div className="flex flex-row flex-wrap gap-2 justify-end items-start w-full max-h-21.5 overflow-y-auto scrollbar-thumb-brand-secondary scrollbar-track-gray-100 scrollbar-gutter-stable">
          {Projects.length <= 0 && <p>لا توجد مشاريع متاحة</p>}
          {Projects.length > 0 &&
            Projects.map((project) => (
              <div key={project.id}>
                <ButtonUI
                  title={project.name}
                  onClick={() => handleProjectToggle(project)}
                  sx={{
                    textAlign: "right",
                    color: colors.text_main,
                    // Highlights conditionally by reading from the isolated local array
                    background: taskDraft.RelatedProjects.includes(project.id)
                      ? colors.brand_primary
                      : colors.brand_secondary,
                    border: taskDraft.RelatedProjects.includes(project.id)
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

      {/* Actions Button Submission Dock */}
      <div className="w-full flex flex-row my-2 gap-3 ">
        {/* Form Commit Trigger: Commits finalized draft object upstream to core arrays */}
        <ButtonUI
          onClick={() => {
            // Generates a mock numerical ID if your upstream store requires ID assignment inside components
            const finalizedTask = {
              ...taskDraft,
              id: Date.now(), // Unique runtime timestamp fallback ID allocation
            };

            addTask(finalizedTask, handleModal);
            resetTask(); // Safeguards global single primitives resets
          }}
          variant="contained"
          title="حفظ"
        />

        {/* Cancel Trigger: Clean context abortion, drops sandbox data completely */}
        <ButtonUI
          onClick={() => handleModal(false)}
          variant="text"
          title="الغاء"
        />
      </div>
    </div>
  );
};
