import axios from "axios";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

const api = () => {
  const defaultOptions = {
    baseURL:
      process.env.REACT_APP_DEPLOY_ENV === "local"
        ? `http://localhost:8001/api`
        : `https://housing-society404.herokuapp.com/api`,
    method: "get",
    crossDomain: true,
    headers: {
      common: {
        Authorization: `Bearer ${cookies.get("token") || ""}`
      }
    }
  };

  return axios.create(defaultOptions);
};

export default api();
