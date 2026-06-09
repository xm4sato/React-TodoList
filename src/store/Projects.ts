import { create } from "zustand";
import type { ProjectType, ProjectStoreType } from "../Types/Projects";
import { toastSuccess } from "@/UI/Toastify";

/**
 * Zustand global store management for handling projects state,
 * modal visibility, validation errors, and local persistence.
 * * @returns {ProjectStoreType} The reactive state hooks and actions.
 */
export const useProjectStore = create<ProjectStoreType>((set, get) => ({
  /** @type {boolean} Controls the visibility state of the Project creation Modal */
  isModalOpened: false,

  /** * @type {ProjectType[]} Array of project items initialized directly from LocalStorage.
   * Defaults to an empty array `[]` if no data persists.
   */
  Projects: JSON.parse(localStorage.getItem("Projects") || "[]"),

  /** @type {any[]} Holds the list of validation errors extracted from schemas like Zod */
  ErrorsList: [],

  /**
   * Toggles the open/close state of the project creation modal.
   * @param {boolean} isOpened - The desired visibility state.
   */
  /**
   * Asynchronously validates, checks uniqueness, and adds a new project to the store.
   * Automatically triggers persistent storage on success.
   * * @param {ProjectType} project - The raw project object payload submitted from the UI form.
   */
  AddProject: async (project: ProjectType) => {
    // Check for duplicate projects by unique ID or Name to maintain data integrity
    const ProjectExists =
      get().Projects.find((p) => p.id === project.id) ||
      get().Projects.find((p) => p.name === project.name);

    if (ProjectExists) return toastSuccess("المشروع موجود بالفعل جرب اسم اخر");

    // Update the Zustand reactive state safely using immutable patterns
    set((state) => {
      const updatedProjects = [...state.Projects, project];

      // Invoke the internal sync action to mirror state updates into LocalStorage
      get().AddProjectToLocalStorage(updatedProjects);

      toastSuccess("تمت إضافة المشروع بنجاح !");

      return { Projects: updatedProjects };
    });
    
  },

  /**
   * Serializes the reactive projects state array into a JSON string
   * and commits it to the browser's persistent key-value LocalStorage.
   * * @param {ProjectType[]} projects - The updated immutable array of projects.
   */
  AddProjectToLocalStorage: (projects: ProjectType[]) => {
    let ProjectData = "";
    // Transform raw JavaScript array objects into a serialized JSON text stream
    ProjectData = JSON.stringify(projects);
    localStorage.setItem("Projects", ProjectData);
  },
}));
