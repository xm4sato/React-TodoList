# 📝 React TodoList - Advanced Task & Project Manager

An advanced task and project management dashboard application built using **React** and a modern, minimalist UI/UX design language. This system implements atomic state updates, local data persistence, and a strict decoupled form sandbox architecture to ensure high performance and zero desynchronization issues.

---

## 🚀 Tech Stack

* **Core Framework:** React 18+ (Powered by Vite for ultra-fast compilation and HMR).
* **State Management:** Zustand (Atomically structured using decoupled store slices).
* **UI Component Ecosystem:** Material UI (MUI) & specialized custom architectural wrappers.
* **Styling Framework:** Tailwind CSS & contextual design tokens.
* **Notification System:** React Toastify (For asynchronous runtime feedback).
* **Persistence Layer:** Client-side LocalStorage API.

---

## 🏗️ Architectural & Design Patterns

This repository avoids common frontend state leakage pitfalls by adhering to production-grade engineering principles:

1. **Isolated Sandbox Pattern (Draft State):** Form interaction contexts (such as Adding or Updating tasks) bind text mutations strictly to a local `useState` transactional framework (`taskDraft`). This guarantees that user modifications are completely dropped upon cancellation, shielding the global store arrays from dirty, uncommitted records.
2. **Atomic Commits & Storage Synchronization:** Mutation lifecycles inside the Zustand store follow an atomic layout. Updates are injected into reactive memory slices and flushed to the hardware `localStorage` device synchronously within the same execution block, eliminating desynchronization bugs.
3. **Chronological Indexing Maintenance:** Array updates utilize strategic `.map()` mapping wrappers that patch exact matched object references, maintaining elements inside their original positions and preventing unpredictable UI item jumping.

---

## 🛠️ Installation & Local Setup

To deploy and run this workspace locally on your system (fully optimized for Linux/Arch Linux environments):

1. **Clone the Repository:**
   ```bash
   git clone [https://github.com/xm4sato/React-TodoList.git](https://github.com/xm4sato/React-TodoList.git)
   cd React-TodoList
