import { useState } from "react";
import "./App.css";

// importing Material Icons :-
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import CircleIcon from "@mui/icons-material/Circle";

// importing components :-
import HeaderComponent from "./Features/Menu/components/Header";
import Sections from "./Features/Menu/components/Sections";
import Projects from "./Features/Menu/components/Projects";
import AlertUI from "./UI/Alert";
import { toast, ToastContainer } from "react-toastify";
import TextFieldUI from "./UI/TextField";
import Header from "./Features/Tasks/components/Header";
import Tasks from "./Features/Tasks/components/Tasks";
import TasksSection from "./Features/Tasks/components/Tasks";
import BasicModal from "./utils/Modal";
import { useGlobalStore } from "./store/Global";

function App() {


  const ModalContent = useGlobalStore((state) => state.Modal)
  const handleModal = useGlobalStore((state) => state.handleModal)

  return (
    <>
      <ToastContainer />
                  {/* Globalized Backdrop Creation Form Portal Sheet Wrapper */}
            <BasicModal
              title={ModalContent.title}
              context={ModalContent.content}
              OnClose={handleModal}
            />
      <div className="w-full h-full flex flex-row">
        <main className="w-[75%] h-full py-4 px-10">
 <Header />
 <TasksSection />
        </main>
        <aside className="flex flex-col w-[25%] min-h-screen h-full py-3 px-5  bg-brand-secondary">
          <HeaderComponent />
          <Sections />
          <Projects />
        </aside>
      </div>
    </>
  );
}

export default App;
