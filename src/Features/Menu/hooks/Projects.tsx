import { useState, useEffect } from "react";
import { generateShortId } from "@/helpers/id_generator";
import { type ProjectType } from "@/Types/Projects";

/**
 * Custom hook to manage isolated local state parameters for drafting new projects.
 * Orchestrates inputs, internal loading markers, and date formatting transformations.
 * * @returns An object containing the current project payload state, setters, and date synchronization state.
 */
export const useProjectsState = () => {
 
  /** @type {ProjectType} Central object container holding real-time project setup parameters */
  const [project, setProject] = useState<ProjectType>({
    id: generateShortId(),
    name: "",
    description: "",
    createDate: "",
    lastUpdate: "",
    icon: { iconID: 1, color: "#ff4040" },
  });

  /** @type {boolean} Flag signaling ongoing submissions to lock interactive interface components */
  const [loading, setLoading] = useState(false);

  /** @type {{year: number, month: number, day: number}} Composite structure tracking selected chronological boundaries */
  const [time, setTime] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  });

  /**
   * Side-effect synchronization hook.
   * Intercepts mutations on separate discrete date segments (year, month, day),
   * synthesizes a unified JS Date structure, and commits it as a serialized string 
   * into the main project payload.
   */
  useEffect(() => {
    const completeTime = new Date(time.year, time.month - 1, time.day).toDateString();
    setProject((prev) => ({ ...prev, CompleteDate: completeTime }));
  }, [time]);

  return {
    project,
    setProject,
    loading,
    setLoading,
    time,
    setTime,
  };
};