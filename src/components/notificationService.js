import { ToastContainer, toast } from "react-toastify";

const notice = {
  success(message) {
    toast.success(message);
  },

  error(message) {
    toast.error(message);
  },

  warning(message) {
    toast.error(message);
  },

  info(message) {
    toast.info(message);
  },

  special(message) {
    toast(message);
  },
};

const NoticeContainer = ToastContainer;

export default notice;
export { NoticeContainer };
