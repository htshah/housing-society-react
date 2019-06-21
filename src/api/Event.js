import api from "./Base";

export default class Event {
  static getAll() {
    return new Promise((resolve, reject) => {
      api
        .get("/event")
        .then(response => resolve(response.data))
        .catch(error => reject(error.response));
    });
  }

  static get(id) {
    return new Promise((resolve, reject) => {
      api
        .get(`/event/${id}`)
        .then(response => resolve(response.data))
        .catch(error => reject(error.response));
    });
  }

  static update(id, data) {
    return new Promise((resolve, reject) => {
      api
        .post(`/event/${id}/update`, data)
        .then(response => resolve(response.data))
        .catch(error => reject(error.response));
    });
  }
  static register(id, data) {
    return new Promise((resolve, reject) => {
      api
        .post(`/event/${id}/register`, data)
        .then(response => resolve(response.data))
        .catch(error => reject(error.response));
    });
  }

  static create(data) {
    return new Promise((resolve, reject) => {
      api
        .post(`/event/new`, data)
        .then(response => resolve(response.data))
        .catch(error => reject(error.response));
    });
  }
}
