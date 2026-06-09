import { useGlobalStore } from "@/store/Global";
import { useTaskStore } from "@/store/Tasks";
import ButtonUI from "@/UI/ButtonUI";
import { colors } from "@/UI/color";
import TextFieldUI from "@/UI/TextField";
import TypoGraphy from "@/UI/TypoGraphy";
import { Add } from "@mui/icons-material";
import { TaskModalContext } from "../Layout/AddTaskModal";

export default function Header() {
  const handleModal = useGlobalStore((state) => state.handleModal);
  const setSearchValue = useTaskStore((state) => state.handleSearchValue);

  return (
    <div className="w-full h-full flex flex-wrap items-center justify-right gap-3 ">
      <div className="w-full flex flex-row-reverse justify-between items-center">
        <TypoGraphy
          title="قائمة المهام"
          variant="h5"
          className="text-brand-secondary font-bold"
          sx={{
            width: "70%",
            fontSize: "26px",
            textAlign: "right",
            fontWeight: "bold",
            marginTop: "10px",
          }}
        />

        <ButtonUI
          title="إضافة مهمة جديدة"
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleModal(true, TaskModalContext)}
          sx={{ background: colors.text_main, color: colors.brand_secondary }}
        />
      </div>

      <div
        className="w-full text-2xl font-bold text-right"
        style={{ color: "#fff" }}
      >
        <TextFieldUI
          Onchange={(value) => setSearchValue(value)}
          label="ابحث عن مهمة"
          multiline={true}
          variant="standard"
          sx={{
            display: "flex",
            justifyContent: "right",
            margin: "2px 0",
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
    </div>
  );
}
