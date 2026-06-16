import "./App.css";

// importing components :-
import HeaderComponent from "./Features/Menu/components/Header";
import Sections from "./Features/Menu/components/Sections";
import Projects from "./Features/Menu/components/Projects";
import { ToastContainer } from "react-toastify";
import Header from "./Features/Tasks/components/Header";
import TasksSection from "./Features/Tasks/components/Tasks";
import BasicModal from "./utils/Modal";
import { useGlobalStore } from "./store/Global";
// import { Route, Routes } from "react-router-dom";

function App() {
  const ModalContent = useGlobalStore((state) => state.Modal);
  const handleModal = useGlobalStore((state) => state.handleModal);

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

// Route-based code splitting and lazy loading can be implemented here in the future when the app grows larger and more complex.
{
  /* <Routes>
  <Route path="/home" element={<App />} />
  <Route path="/tasks/all" element={<App />} />
  <Route path="/tasks/completed" element={<App />} />
  <Route path="/tasks/today" element={<App />} />
  <Route path="/tasks/scheduled" element={<App />} />
</Routes>; */
}

export default App;
