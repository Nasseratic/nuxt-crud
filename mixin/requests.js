import Loading from "./loading"
import Notification from "./notifiaction"

export default {
  mixins: [Loading, Notification],
  methods: {
    get(request) {
      return new Promise((resolve, reject) => {
        this.startLoading();
        this.$axios.get(request.url, request.headers).then((res) => {
          this.stopLoading();
          resolve(res.data);
        }).catch((res) => {
          this.stopLoading();
          this.handelResponseError(res);
          reject(res);
        });
      });
    },
    post(request) {
      return new Promise((resolve, reject) => {
        this.startLoading();
        this.$axios.post(request.url, request.data, request.headers).then((res) => {
          this.stopLoading();
          this.success(res.data.message);
          resolve(res.data)
        }).catch((res) => {
          this.stopLoading();
          this.handelResponseError(res);
          reject(res)
        });
      });
    },
    put(request) {
      return new Promise((resolve, reject) => {
        this.startLoading();
        this.$axios.put(request.url, request.data, request.headers).then((res) => {
          this.stopLoading();
          this.success(res.data.message);
          resolve(res.data)
        }).catch((res) => {
          this.stopLoading();
          this.handelResponseError(res);
          reject(res)
        });
      });
    },
    delete(request) {
      return new Promise((resolve, reject) => {
        this.startLoading();
        this.$axios.delete(request.url , request.headers).then((res) => {
          this.stopLoading();
          this.success(res.data.message);
          resolve(res.data);
        }).catch((res) => {
          this.stopLoading();
          this.handelResponseError(res);
          reject(res);
        });
      });
    },
    handelResponseError(res) {
      if (res.response && res.response.data) {
        this.response = res.response.data;
        if (this.response.errors === null) {
          this.danger(this.response.message)
        } else if (this.response.errors.length === 0) {
          this.danger(this.response.message)
        }
      }
    },
  }
}
