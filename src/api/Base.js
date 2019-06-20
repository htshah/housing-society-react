import axios from "axios";

const api = () => {
  const defaultOptions = {
    baseURL:
      process.env.REACT_APP_DEPLOY_ENV === "local"
        ? `http://localhost:8001/api`
        : `https://housing-society404.herokuapp.com/api`,
    method: "get"
  };

  return axios.create(defaultOptions);
};

export default api();
