import axios from "axios";
import { toast } from "react-toastify";
import logger from "./logService";

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.respones &&
    error.response.status >= 400 &&
    error.respones.status < 500;
  if (!expectedError) {
    logger.log(error);
    toast.error("Something went wrong while deleting a post!");
  }
  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
};
