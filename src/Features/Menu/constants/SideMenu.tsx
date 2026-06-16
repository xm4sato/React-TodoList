import { colors } from "../../../UI/color";
import type { ProjectsListType, SectionsType, SimpleList } from "@/Types/Projects";
import IconGenerator from "@/utils/IconsGenerator";

import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import AirlineSeatIndividualSuiteIcon from "@mui/icons-material/AirlineSeatIndividualSuite";
import BackupTableIcon from "@mui/icons-material/BackupTable";
import WorkIcon from "@mui/icons-material/Work";




export const SectionsList : SectionsType[] = [
{id : 1 , name : "جميع المهام" , icon : <IconGenerator name="List" sx={{color : colors.text_main , "&:hover" : "color:black"}} /> , path : "all"},
{id : 2 , name : "اليوم" , icon : <IconGenerator name="CalendarToday" sx={{color : colors.text_main}} /> , path : "today"},
{id : 3 , name : "القادمة" , icon : <IconGenerator name="CalendarMonth" sx={{color : colors.text_main}} /> , path : "pending"},
{id : 4 , name : "المكتملة" , icon : <IconGenerator name="TaskAlt" sx={{color : colors.text_main}}/> , path : "completed"},
];

/**
 * Array containing the main structural navigation items for the application side menu layout context.
 * Consists of primary tracking matrices like total tasks, scheduled daily/monthly queues, and completed tasks.
 * * @type {ProjectsListType[]}
 */
export const ProjectsList: ProjectsListType[] = [
  {
    id: 1,
    name: "جميع المهام",
    icon: (
      <IconGenerator
        name="List"
        sx={{
          color: colors.text_main,
          background: "#5b24f2", 
          borderRadius: "8px",
          padding: "4px",
          fontSize: "32px",
        }}
      />
    ),
    color: "#5b24f2",
  },
  {
    id: 2,
    name: "اليوم",
    icon: <IconGenerator name="CalendarToday" sx={{ color: "#" }} />,
    color: "#000",
  },
  {
    id: 3,
    name: "القادمة",
    icon: <IconGenerator name="CalendarMonth" sx={{ color: "#787878" }} />,
    color: "#000",
  },
  {
    id: 4,
    name: "المكتملة",
    icon: <IconGenerator name="TaskAlt" sx={{ color: "#787878" }} />,
    color: "#000",
  },
];

/**
 * Global application registry linking specific vector icons with explicit tracking ID markers.
 * Provided inside form builders to let users select custom graphical properties for created projects.
 * * @type {Array<{id: number, name: React.ComponentType}>}
 */
export const iconsList : SimpleList[] = [
  {
    id: 0,
    name: AccountBalanceIcon,
  },
  {
    id: 1,
    name: AccountBoxIcon,
  },
  {
    id: 2,
    name: AccessTimeFilledIcon,
  },
  {
    id: 3,
    name: AgricultureIcon,
  },
  {
    id: 4,
    name: AirlineSeatIndividualSuiteIcon,
  },
  {
    id: 5,
    name: WorkIcon,
  },
  {
    id: 6,
    name: BackupTableIcon,
  },
];

/**
 * Curated palette array of custom HEX code values used to dynamically theme custom layout assets.
 * * @type {Array<{id: number, name: string}>}
 */
export const iconColors : SimpleList[] = [
  { id: 0, name: "#ff4040" },
  { id: 1, name: "#1953ff" },
  { id: 2, name: "#57ff3d" },
  { id: 3, name: "#fa48e8" },
  { id: 4, name: "#faf86e" },
  { id: 5, name: "#5b24f2" } 
];