import { useEffect, type JSX } from "react";
import type { SectionsType } from "@/Types/Projects";
import { colors } from "../../../UI/color";
import { SectionsList } from "../constants/SideMenu";
import { useTaskStore } from "@/store/Tasks";

/**
 * Sections Component
 * * Renders the primary navigation sidebar for task classification filters.
 * Leverages atomic state updates via Zustand instead of URL router parameters,
 * effectively preventing navigation reference loops and infinite re-render cycles.
 * * @returns {JSX.Element} The rendered navigation menu structure.
 */
function Sections(): JSX.Element {
  /** * Zustand Store Selectors
   * Extract the current active filter slice and its corresponding dispatch state modifier.
   */
  const FilterName = useTaskStore((state) => state.FilterName);
  const setFilterName = useTaskStore((state) => state.setFilterName);

  /**
   * State Synchronization Lifecycle Tracker
   * Monitors and logs the changes of the active filter state for safe debugging and tracking.
   */
  useEffect(() => {
    console.log("Current Filter Name:", FilterName);
  }, [FilterName]);

  return (
    <div className="w-full flex flex-col gap-3 mt-3">
      {/* Structural mapping engine iterating over predefined layout items */}
      {SectionsList.map((section: SectionsType) => {
        /**
         * Pure Evaluation Utility
         * Computes whether the current item matches the globally stored active filter parameter.
         * * @returns {boolean} True if the section path is actively selected.
         */
        const isActive = (): boolean => {
          return FilterName === section.path;
        };

        return (
          <div
            key={section.id}
            onClick={() => {
              setFilterName(section.path);
            }}
            className={`group w-full flex flex-row-reverse px-3 py-2 cursor-pointer transition-all duration-200 rounded-md hover:bg-brand-primary ${
              isActive() ? "bg-brand-primary text-white" : ""
            }`}
          >
            {/* Visual Icon Controller Wrapper Node */}
            <i className="group-hover:text-white transition-colors">
              {section.icon}
            </i>

            {/* Typography Section Title Node with dynamic color state mappings */}
            <h3
              className="mr-2 group-hover:text-white transition-colors"
              style={{ color: isActive() ? "#fff" : colors.text_main }}
            >
              {section.name}
            </h3>
          </div>
        );
      })}
    </div>
  );
}

export default Sections;
