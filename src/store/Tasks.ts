import { create } from "zustand";
import type { TaskStoreType, TaskType } from "@/Types/Tasks";
import { generateShortId } from "@/helpers/id_generator";
import { toast } from "react-toastify";

/**
 * useTaskStore
 * Global Zustand state engine slice for managing task lifecycles, structural synchronization,
 * client-side LocalStorage persistence, and view-state query tracking parameters.
 */
export const useTaskStore = create<TaskStoreType>((set, get) => ({
  /** Initial synchronization: Hydrates store memory space directly from production client storage */
  Tasks: JSON.parse(localStorage.getItem("Tasks") || "[]"),
  SearchValue: "",

  /** Single baseline task primitive model framework utilized across standard fields creation pipelines */
  Task: {
    id: generateShortId(),
    title: "",
    description: "",
    compeleted: false,
    RelatedProjects: [],
    date: null,
  },
  loading: false,
  TaskID: 0,
  FilterName: "all",
  /** Mutates core operation background execution loader layouts */
  setLoading: (value: boolean) => set({ loading: value }),

  /** Buffers targeted execution record index contexts across global application workflows */
  setTaskID: (id: number) => set({ TaskID: id }),

  /** Mutates the Name of Task Filter into the state space workspace buffers */
  setFilterName: (filterName: string) => set({ FilterName: filterName }),

  /** Upstream state synchronization string setter targeting the base core title field */
  setTitle: (value: string) => set({ Task: { ...get().Task, title: value } }),

  /** Upstream state synchronization string setter targeting the base core description field */
  setDescription: (value: string) =>
    set({ Task: { ...get().Task, description: value } }),

  /** Upstream state synchronization chronos setter mapping selected timestamp strings or null primitives */
  setDate: (value: string | null) =>
    set({ Task: { ...get().Task, date: value } }),

  /** Appends associated structural project IDs into the baseline master creation reference array */
  addRelatedProject: (project: any) =>
    set({
      Task: {
        ...get().Task,
        RelatedProjects: [...(get().Task.RelatedProjects || []), project.id],
      },
    }),

  /**
   * Evaluates project existence parameters within local arrays to toggle associations via appendment or filter routines.
   * @param {any} project - The targeted mapping node containing the matching unique index tracker.
   */
  handleRelatedProject: (project: any) => {
    const isRelated = get().Task.RelatedProjects?.includes(project.id);
    if (isRelated) {
      // إذا كان المشروع مرتبط بالفعل، قم بإزالته من القائمة
      set({
        Task: {
          ...get().Task,
          RelatedProjects:
            get().Task.RelatedProjects?.filter((id) => id !== project.id) || [],
        },
      });
      console.log(get().Task.RelatedProjects);
    } else {
      // إذا لم يكن المشروع مرتبط، قم بإضافته إلى القائمة
      set({
        Task: {
          ...get().Task,
          RelatedProjects: [...(get().Task.RelatedProjects || []), project.id],
        },
      });
    }
  },

  /**
   * Updates state structures to establish validated task instances as chronologically completed across client databases.
   * @param {number} taskID - Target functional execution record identifier tracking parameters.
   */
  completeTask: (taskID: number) => {
    const StrigiedTask = localStorage.getItem("Tasks") || "[]";
    const updatedTasks = JSON.parse(StrigiedTask).map((task: TaskType) =>
      task.id === taskID ? { ...task, completed: true } : task,
    );
    localStorage.setItem("Tasks", JSON.stringify(updatedTasks));
    console.log(get().Tasks);
    toast.success("تم إكمال المهمة بنجاح!");

    set((state) => ({
      Tasks: state.Tasks.map((task) =>
        task.id === taskID ? { ...task, completed: true } : task,
      ),
    }));
  },

  /**
   * Reverses finished records parameter assignments, tracking active completion properties back to falsy fields.
   * @param {number} taskID - Target functional execution record identifier tracking parameters.
   */
  repeatTask: (taskID: number) => {
    const StrigiedTask = localStorage.getItem("Tasks") || "[]";
    const updatedTasks = JSON.parse(StrigiedTask).map((task: TaskType) =>
      task.id === taskID ? { ...task, completed: false } : task,
    );
    localStorage.setItem("Tasks", JSON.stringify(updatedTasks));

    set((state) => ({
      Tasks: state.Tasks.map((task) =>
        task.id === taskID ? { ...task, completed: false } : task,
      ),
    }));

    console.log(get().Tasks);
    toast.success("تم إرجاع المهمة بنجاح!");
  },

  /**
   * Resets creation buffer states cleanly to default initial schemas while supplying clean short hash IDs.
   */
  resetTask: () =>
    set({
      Task: {
        id: generateShortId(),
        title: "",
        description: "",
        RelatedProjects: [],
        date: "",
      },
    }),

  /**
   * Filters the active operational tasks array depending on input token verification values.
   * Performs absolute persistent storage evaluations when parameters yield empty tracking characters.
   * @param {string} value - Continuous stream inputs fetched directly from terminal search nodes.
   */
  handleSearchValue: (value: string) => {
    value.length === 0
      ? set({ Tasks: JSON.parse(localStorage.getItem("Tasks") || "[]") })
      : set({
          Tasks: get().Tasks.filter((task) =>
            task.title.toLowerCase().includes(value.toLowerCase()),
          ),
        });
  },

  /**
   * Appends fresh production task structures into application arrays and persists instances safely down to LocalStorage layers.
   * @param {TaskType} task - Compounded validated data models representing a created task.
   * @param {function} handleModal - Global context handler UI portal closure dispatcher method.
   */
  addTask: (task: TaskType, handleModal: (isOpen: boolean) => void) => {
    const StrigiedTask = localStorage.getItem("Tasks") || "[]";
    const updatedTasks = JSON.parse(StrigiedTask);
    updatedTasks.push(task);
    localStorage.setItem(`Tasks`, JSON.stringify(updatedTasks));

    handleModal(false);
    get().resetTask();
    toast.success("تمت إضافة المهمة بنجاح!");
    return set((state) => ({ Tasks: [...state.Tasks, task] }));
  },

  /**
   * Executes functional map-patching transformations to merge modified target changes over existing tasks layout indices.
   * @param {number} TaskID - Unique tracking pointer capturing the master target ID reference.
   * @param {Partial<TaskType>} updatedTask - Component transaction payload block tracking update specifications.
   */
  UpdateTask: (TaskID: number, updatedTask: Partial<TaskType>) => {
    // STEP 1: Fetch and destabilize the array from the current reactive state layers
    const currentTasks = get().Tasks;

    /**
     * STEP 2: Functional Array Mapping Transformation
     * Iterate through the pipeline. If the ID matches, merge the historical task data with the incoming draft changes.
     * This maintains chronological element indexing (prevents the task from jumping to the bottom of the UI list).
     */
    const mutatedTasks = currentTasks.map((task) =>
      task.id === TaskID ? { ...task, ...updatedTask } : task,
    );

    // STEP 3: Atomic persistence commit into the LocalStorage layer
    localStorage.setItem("Tasks", JSON.stringify(mutatedTasks));

    // STEP 4: Trigger contextual UI toast notifications
    toast.success("تم تحديث المهمة بنجاح!");

    // STEP 5: Reset the active form buffer states safely
    get().resetTask();

    // STEP 6: Hydrate the reactive Zustand store state with the freshly mapped arrays
    return set(() => ({
      Tasks: mutatedTasks,
    }));
  },

  /**
   * Destroys an explicit task node configuration by deploying filter array mutations across memories and physical storages.
   */
  DeleteTask: () => {
    set((state) => ({
      Tasks: state.Tasks.filter((task) => task.id !== get().TaskID),
    }));

    const StrigiedTask = localStorage.getItem("Tasks") || "[]";
    const updatedTasks = JSON.parse(StrigiedTask).filter(
      (task: TaskType) => task.id !== get().TaskID,
    );
    localStorage.setItem(`Tasks`, JSON.stringify(updatedTasks));
    toast.success("تم حذف المهمة بنجاح!");
    get().resetTask();
  },
}));
