import api from "./Base";

export default class Auth {
  static login(email, password) {
    return new Promise((resolve, reject) => {
      api
        .post("/auth/login", {
          email,
          password
        })
        .then(response => resolve(response))
        .catch(error => reject(error.response));
    });
  }

  static register(data) {
    return new Promise((resolve, reject) => {
      api
        .post("/auth/register", data)
        .then(response => resolve(response))
        .catch(error => reject(error.response));
    });
  }

  static logout() {
    return new Promise((resolve, reject) => {
      api
        .post("/auth/logout/")
        .then(response => resolve(response))
        .catch(error => reject(error.response));
    });
  }
}
