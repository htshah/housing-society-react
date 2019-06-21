import api from "./Base";

export default class Profile {
  static getAll() {
    return new Promise((resolve, reject) => {
      api
        .get("/user")
        .then(response => resolve(response.data))
        .catch(error => reject(error.response));
    });
  }

  static get(id) {
    return new Promise((resolve, reject) => {
      api
        .get(`/user/${id}`)
        .then(response => resolve(response.data))
        .catch(error => reject(error.response));
    });
  }
  static activateUser(id) {
    return new Promise((resolve, reject) => {
      api
        .get(`/user/${id}/activate`)
        .then(response => resolve(response.data))
        .catch(error => reject(error.response));
    });
  }

  static deactivateUser(id) {
    return new Promise((resolve, reject) => {
      api
        .get(`/user/${id}/deactivate`)
        .then(response => resolve(response.data))
        .catch(error => reject(error.response));
    });
  }

  static getCurrentUser() {
    return new Promise((resolve, reject) => {
      api
        .get(`/user/me`)
        .then(response => resolve(response.data))
        .catch(error => reject(error.response));
    });
  }

  static update(data) {
    return new Promise((resolve, reject) => {
      api
        .post(`/user/me/update`, data)
        .then(response => resolve(response.data))
        .catch(error => reject(error.response));
    });
  }
}
