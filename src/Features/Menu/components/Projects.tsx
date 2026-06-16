import { type ProjectType } from "@/Types/Projects";
import { type JSX } from "react";
import { Add, Work } from "@mui/icons-material";
import { useProjectStore } from "@/store/Projects";
import { colors } from "../../../UI/color";
import { iconsList } from "../constants/SideMenu";
import { ProjectModalContext } from "../Layout/ProjectModal";
import { useGlobalStore } from "@/store/Global";
import { useTaskStore } from "@/store/Tasks";

/**
 * Projects Navigation Component.
 * Renders the custom dynamically generated projects subsection within the SideMenu layout.
 * Controls modal popups for project generation and maps individual persistent items with contextual styles.
 * * @component
 */
function Projects(): JSX.Element {
  /** @type {function} Store action to mutate the persistent state visibility flag of the modal container */
  const handleModal = useGlobalStore((state) => state.handleModal);

  /** @type {ProjectType[]} Target array tracking actively synchronized, user-defined project data entries */
  const ProjectsList = useProjectStore((state) => state.Projects);

  const TaskList = useTaskStore((state) => state.Tasks);

  return (
    <>
      <hr className="text-gray-300 my-1" />

      {/* Header Panel for Custom Projects Registry Section */}
      <div className="w-full px-3 mt-3 flex flex-row-reverse justify-between items-center">
        <h4 className={`font-bold`} style={{ color: colors.text_main }}>
          المشاريع
        </h4>
        {/* Interactive Trigger Button to launch creation wizard view */}
        <button
          onClick={() => handleModal(true, ProjectModalContext)}
          className={`hover:bg-[${colors.text_main} p]-1 rounded-full transition-colors`}
        >
          <Add
            sx={{
              fontSize: "35px",
              cursor: "pointer",
              color: colors.text_main,
              transition: "0.3s",
              ":hover": {
                color: colors.text_secondry,
              },
            }}
          />
        </button>
      </div>

      {/* Scrollable Container Group tracking user generated database queues */}
      <div className="w-full flex flex-col gap-1 my-5 overflow-auto max-h-48 scrollbar-hide">
        {ProjectsList.map((Project: ProjectType) => {
          /** * Structural Database Query Lookup.
           * Traverses the hardcoded icons schema directory referencing the item's stored ID key.
           */
          const getIcon = iconsList.find(
            (icon: any) => icon.id == Project.icon.iconID,
          );
          /** @type {React.ComponentType | undefined} Evaluated constructor value for specific vector layout rendering */
          const IconComponent = getIcon?.name;

          return (
            <div
              key={Project.id}
              className="group w-full flex flex-row-reverse justify-between items-center px-3 py-2 cursor-pointer transition-all duration-300 hover:bg-brand-primary rounded-xl"
              style={{ color: colors.text_main }}
            >
              <div className="flex flex-row-reverse items-center gap-3">
                <div className="flex items-center justify-center">
                  {/* Dynamic Polymorphic Component Node Builder */}
                  {IconComponent ? (
                    <IconComponent
                      className="rounded-md p-1"
                      sx={{ background: Project.icon.color, fontSize: "35px" }}
                    />
                  ) : (
                    /* Fallback vector node used if standard index evaluation maps empty values */
                    <Work
                      className="rounded-md p-1"
                      sx={{ background: Project.icon.color, fontSize: "35px" }}
                    />
                  )}
                </div>
                <h3
                  className="font-medium transition-colors"
                  style={{ color: colors.text_main }}
                >
                  {Project.name}
                </h3>
              </div>

              {/* Numerical Badge Counter showing task load statistics */}
              <span className="text-xs font-bold px-2 py-1 rounded-lg bg-brand-primary text-brand-white group-hover:bg-[#E8E5DA] group-hover:text-brand-secondary transition-all">
                {
                  TaskList.filter((task) =>
                    task.RelatedProjects?.includes(Project.id),
                  ).length
                }
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Projects;
