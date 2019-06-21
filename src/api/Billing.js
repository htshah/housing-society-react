import api from "./Base";

export default class billing {
  static getAll() {
    return new Promise((resolve, reject) => {
      api
        .get("/billing/all")
        .then(response => resolve(response.data))
        .catch(error => reject(error.response));
    });
  }

  static getUserBills() {
    return new Promise((resolve, reject) => {
      api
        .get(`/billing`)
        .then(response => resolve(response.data))
        .catch(error => reject(error.response));
    });
  }
  static get(id) {
    return new Promise((resolve, reject) => {
      api
        .get(`/billing/${id}`)
        .then(response => resolve(response.data))
        .catch(error => reject(error.response));
    });
  }
  static pay(id) {
    return new Promise((resolve, reject) => {
      api
        .get(`/billing/${id}/pay`)
        .then(response => resolve(response.data))
        .catch(error => reject(error.response));
    });
  }

  static update(id, data) {
    return new Promise((resolve, reject) => {
      api
        .post(`/billing/${id}/update`, data)
        .then(response => resolve(response.data))
        .catch(error => reject(error.response));
    });
  }

  static create(data) {
    return new Promise((resolve, reject) => {
      api
        .post(`/billing/new`, data)
        .then(response => resolve(response.data))
        .catch(error => reject(error.response));
    });
  }
}
