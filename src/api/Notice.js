import api from "./Base";

export default class Notice {
  static getAll() {
    return new Promise((resolve, reject) => {
      api
        .get("/notice")
        .then(response => resolve(response.data))
        .catch(error => reject(error.response));
    });
  }

  static get(id) {
    return new Promise((resolve, reject) => {
      api
        .get(`/notice/${id}`)
        .then(response => resolve(response.data))
        .catch(error => reject(error.response));
    });
  }

  static update(id, data) {
    return new Promise((resolve, reject) => {
      api
        .post(`/notice/${id}/update`, data)
        .then(response => resolve(response.data))
        .catch(error => reject(error.response));
    });
  }

  static create(data) {
    return new Promise((resolve, reject) => {
      api
        .post(`/notice/new`, data)
        .then(response => resolve(response.data))
        .catch(error => reject(error.response));
    });
  }
}
