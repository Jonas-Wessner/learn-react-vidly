import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, (e) => {
  const expectedError =
    e.response && e.response.status >= 400 && e.response.status < 500;

  // handle unexpected error globally
  if (!expectedError) {
    toast.error("Unexpected error occurred");
  }

  // pass control to catch block in code
  return Promise.reject(e);
});

const Http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
};

export default Http;
