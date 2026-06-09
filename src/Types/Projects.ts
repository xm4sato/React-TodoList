import type { ReactElement } from "react";

/**
 * Represents a main navigation section or category in the application UI.
 */
export type SectionsType = {
  /** @type {number} Unique identifier for the section */
  id: number;
  /** @type {string} Display name of the section (e.g., "Inbox", "Today") */
  name: string;
  /** @type {ReactElement} Pre-rendered React icon element for the sidebar */
  icon: ReactElement;
};

/**
 * Defines a structural representation of a project item tailored for list rendering.
 */
export type ProjectsListType = {
  /** @type {number} Unique identifier for the project list item */
  id: number;
  /** @type {string} Name of the project */
  name: string;
  /** @type {ReactElement | string} Can hold either a static React element or a serialized string lookup key */
  icon: ReactElement | string;
  /** @type {string} Dynamic hex color string associated with this project's theme */
  color: string;
};

/**
 * Base schema definition for custom project themes and styling meta-data.
 */
export type ProjectTheme = {
  /** Holds the configuration for the project's visual identity */
  icon: {
    /** @type {number} Normalized ID reference to map against the global icons database (avoids serialization bugs) */
    iconID: number;
    /** @type {string} Selected hex color code for the icon/theme background */
    color: string;
  };
};

/**
 * Core interface representing a complete Project entity within the application.
 * Inherits structural theme configurations from {@link ProjectTheme}.
 */
export interface ProjectType extends ProjectTheme {
  /** @type {number} Unique cryptographic or short identifier for database/storage indexing */
  id: number;
  /** @type {string} Title or name of the project */
  name: string;
  /** @type {string} Optional detailed notes or description regarding the project scope */
  description?: string;
  /** @type {string | Date} Deadlines or target completion timestamp formatted as a string or native Date object */
  // CompleteDate: string | Date;
  createDate: string | Date;
  lastUpdate: string | Date;
}

/**
 * Interface definition for the central Zustand project state manager store actions and properties.
 */
export interface ProjectStoreType {
  /** @type {boolean} Global flag tracking whether the project modal sheet is visible */
  isModalOpened: boolean;
  /** @type {ProjectType[]} Array of actively managed and synced projects */
  Projects: ProjectType[];
  /** @type {any[]} Registry storing raw or formatted validation failure payloads (e.g., from Zod) */
  ErrorsList: any[];
  /**
   * Action to toggle the visibility state of the modal viewport.
   * @param {boolean} isOpened - Next visibility state flag.
   */
  // handleModal: (isOpened: boolean) => void;
  /**
   * Action to register a validated project into the global memory stack.
   * @param {ProjectType} project - The dynamic project object payload.
   */
  AddProject: (project: ProjectType) => void;
  /**
   * Data persistence layer action that synchronizes memory states into persistent disk storage.
   * @param {ProjectType[]} projects - The snapshot array of projects to commit.
   */
  AddProjectToLocalStorage: (projects: ProjectType[]) => void;
}

/**
 * A generalized, highly reusable polymorphic list item structure.
 */
export type SimpleList = {
  /** @type {number} Item identifier */
  id: number;
  /** @type {any} Dynamic property capable of carrying primitive values, color codes, or icon registry components */
  name: any;
};

/**
 * Detailed entity structure representing a singular atomic task item attached to projects or boards.
 */
export type Task = {
  /** @type {number} Unique identifier for the individual task */
  taskID: number;
  /** @type {string} Task display heading or title */
  taskTitle: string;
  /** @type {string} In-depth instructional content or details regarding the task */
  taskDescription: string;
  /** @type {string} ISO date string specifying when the task must be finished */
  CompleteDate: string;
};

/**
 * Global application enumerations for human-readable validation error string templates.
 * Enforces localized (Arabic) UI messaging constants while maintaining clean code modularity.
 */
// export enum errorText {
//   /** Fallback message triggered when mandatory user input blocks are left completely blank */
//   empty = "لا يمكن ترك هذا الحقل فارغا",
//   /** Triggered when form input inputs fail to meet predefined minimum length bounds */
//   lessCharacter = "عدد الأحرف اقل من العدد المطلوب",
//   /** Global fail-safe fallback string returned during unhandled catch block exceptions */
//   unknownError = "حدث خطأ! ,يرجى إعادة المحاولة",
// }
