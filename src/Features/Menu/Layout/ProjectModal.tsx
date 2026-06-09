import { type ProjectType } from "@/Types/Projects";
import { useProjectStore } from "@/store/Projects";
import TextFieldUI from "../../../UI/TextField";
import TypoGraphy from "../../../UI/TypoGraphy";
import ButtonUI from "../../../UI/ButtonUI";
import { useProjectsState } from "../hooks/Projects";
import { iconColors, iconsList } from "../constants/SideMenu";
import Project_iconTheme from "../Layout/Project_iconTheme";
import { useGlobalStore } from "@/store/Global";

/**
 * ProjectModalContext Component.
 * Renders the creation form interface for new projects inside a modal dialog container.
 * Manages form state fields locally and synchronizes unified data structures into the global store.
 * * @component
 */
export const ProjectModalContext = () => {
  /** * Destructured state primitives and setters extracted from the specialized isolated custom state hook.
   * Enforces immediate data sync across the form context.
   */
  const { project, setProject, loading, setLoading } = useProjectsState();

  /** @type {function} Action from global Zustand store to mutate modal open/close binary state */
  const handleModal = useGlobalStore((state) => state.handleModal);

  /** @type {function} Async action from global Zustand store to append verified project records to persistent arrays */
  const AddProject = useProjectStore((state) => state.AddProject);

  /**
   * Orchestrates the loading interface cycle during project generation.
   * Invokes global registry mutations and safeguards the state pipeline against simultaneous double submissions.
   * * @param {ProjectType} project - The un-serialized draft project data snapshot from the active form state.
   */
  const handleAddProject = (project: ProjectType) => {
    setLoading(true);
    AddProject(project);
    handleModal(false)
    setLoading(false);
  };

  return (
    <div className="w-full flex flex-col">
      {/* Form Fields Header & Input Controls Group */}
      <div>
        <TypoGraphy
          title="إضافة مشروع"
          variant={"h6"}
          sx={{ textAlign: "right" }}
        />

        {/* Project Name Input Handler */}
        <TextFieldUI
          Onchange={(value) => {
            setProject({
              ...project,
              name: value,
            });
          }}
          label="اسم المشروع"
          variant="standard"
          sx={{
            display: "flex",
            justifyContent: "right",
            margin: "10px 0",
            "& label": {
              left: "auto",
              right: 0,
              transformOrigin: "right",
            },
            "& .MuiInput-root": {
              textAlign: "right",
              direction: "rtl",
            },
            // تحريك الخط السفلي ليبدأ من اليمين
            "& .MuiInput-underline:after": {
              transformOrigin: "right",
            },
          }}
        />

        {/* Project Optional Description Input Handler */}
        <TextFieldUI
          Onchange={(value) => setProject({ ...project, description: value })}
          label="وصف المشروع (إختياري)"
          multiline={true}
          variant="standard"
          sx={{
            display: "flex",
            justifyContent: "right",
            margin: "10px 0",
            "& label": {
              left: "auto",
              right: 0,
              transformOrigin: "right",
            },
            "& .MuiInput-root": {
              textAlign: "right",
              direction: "rtl",
            },
            // تحريك الخط السفلي ليبدأ من اليمين
            "& .MuiInput-underline:after": {
              transformOrigin: "right",
            },
          }}
        />
      </div>

      {/* Aesthetic Customization Context (Theme, Icons & Colors Grid) */}
      <div className="my-3">
        <TypoGraphy
          title="مظهر المشروع"
          variant={"h6"}
          sx={{ textAlign: "right", margin: "20px 0" }}
        />

        {/* Flexible Render Layout Blocks.
          Implements the "Lifting State Up" design pattern by injecting a centralized 'project' state 
          and its respective 'setProject' dispatcher downward into isomorphic list layout engine nodes.
        */}
        <div className="w-full flex flex-row-reverse justify-between gap-2">
          {/* Icon Registry Selector Node */}
          <Project_iconTheme
            title="الأيقونة"
            list={iconsList}
            project={project}
            setProject={setProject}
          />
          {/* Theme Dynamic Hex Color Picker Node */}
          <Project_iconTheme
            title="لون الأيقونة"
            list={iconColors}
            project={project}
            setProject={setProject}
          />
        </div>
      </div>

      {/* Actions Button Submission Dock */}
      <div className="w-full flex flex-row my-2 gap-3 ">
        {/* Form Commit Trigger */}
        <ButtonUI
          onClick={() => handleAddProject(project)}
          disabled={loading}
          variant="contained"
          title="حفظ"
        />

        {/* Cancel/Abortion Control View Trigger */}
        <ButtonUI
          onClick={() => handleModal(false)}
          disabled={loading}
          variant="text"
          title="الغاء"
        />
      </div>
    </div>
  );
};
