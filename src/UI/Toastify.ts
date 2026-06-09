import { ToastContainer, toast, type ToastContent } from "react-toastify";

interface ToastChildren {
  content: ToastContent;
}

export function toastSuccess(title: string) {
  return toast.success(title, {
    autoClose: 5000,
  });
}
