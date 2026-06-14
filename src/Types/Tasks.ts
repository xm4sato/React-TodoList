/**
 * Interface definition describing the core model properties of a single Task entity node.
 */
export interface TaskType {
  /** Unique integer tracking identifier allocated during run-time generation */
  id: number;

  /** The primary display text title representing the task objective */
  title: string;

  /** Contextual auxiliary specifications or sub-text descriptions (Optional) */
  description: string;

  /** Binary completion state flag determining pending or finalized task lifecycle statuses */
  completed?: boolean;

  /** Optional chronological scheduling timestamp stored as an ISO sequence or null primitive */
  date: string | null;

  /** An array of foreign integer keys mapping explicit relationships to associated parent project models */
  RelatedProjects?: number[] | null;
}

/**
 * Interface definition for the central Zustand task state manager store actions and reactive properties.
 */
export interface TaskStoreType {
  /** Reactive core to detect Filter Name Of the Current Router */
  // TaskFilterName: string;

  /** Reactive core collection collection tracking all loaded task database objects */
  Tasks: TaskType[];

  /** The raw reactive continuous string parameter utilized to govern viewport layout filter algorithms */
  SearchValue: string;

  /** The localized primitive placeholder model used to buffer ongoing active form data bindings */
  Task: TaskType;

  /** Dynamic layout loading flag controlling UI background operations and action disabled views */
  loading: boolean;

  /** Globally buffered application index tracker holding the target ID during update/delete confirmation scopes */
  TaskID: number;

  FilterName: string;

  /**  Mutate the Name of Task Filter into the state space workspace buffers */
  setFilterName: (filterName: string) => void;

  /** Locks a target task integer identifier context into the state space workspace buffers */
  setTaskID: (id: number) => void;

  /** Mutates structural application background execution loader layouts */
  setLoading: (value: boolean) => void;

  /** Orchestrates filtering calculations across application listings using input query strings */
  handleSearchValue: (value: string) => void;

  /** Inline direct setter updating the continuous description payload field inside the baseline buffer object */
  setDescription: (value: string) => void;

  /** Inline direct setter updating the continuous title payload field inside the baseline buffer object */
  setTitle: (value: string) => void;

  /** Direct setter mapping selected chronos timestamps or null boundaries onto the active baseline buffer */
  setDate: (value: string | null) => void;

  /** Evaluates relational existence vectors to assign or isolate parent projects from the active task object */
  handleRelatedProject: (project: any) => void;

  /**
   * Pushes a fully compiled structural task object downstream into production storage structures.
   * @param {TaskType} task - The completed finalized task schema snapshot to append.
   * @param {function} handleModal - State portal action closure callback routine.
   */
  addTask: (task: TaskType, handleModal: (isOpen: boolean) => void) => void;

  /** Commits a static layout value transformation marking a targeted task integer index as completed */
  completeTask: (taskID: number) => void;

  /** Reverts a completed task state flag tracker back to a pending active field configuration */
  repeatTask: (taskID: number) => void;

  /** Resets structural layout single creation buffer objects back to baseline factory layout configurations */
  resetTask: () => void;

  /** Extracts and completely destroys a buffered task element context from operational cache arrays */
  DeleteTask: () => void;

  /**
   * Executes functional object mapping patches to override historical records with incoming input changes.
   * Changed parameter interface contract to Partial<TaskType> to guarantee safe atomic form commits.
   */
  UpdateTask: (TaskID: number, updatedTask: Partial<TaskType>) => void;
}
