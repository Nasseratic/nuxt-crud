export default {
  methods: {
    get(url) {
      return new Promise((resolve, reject) => {
        this.startLoading();
        this.$axios.get(url).then((res) => {
          this.stopLoading();
          resolve(res.data);
        }).catch((res) => {
          this.stopLoading();
          this.handelResponseError(res);
          reject(res);
        });
      });
    },
    post(url, data) {
      return new Promise((resolve, reject) => {
        this.$axios.post(url, data).then((res) => {
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
    put(url, data) {
      return new Promise((resolve, reject) => {
        this.$axios.put(url, data).then((res) => {
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
    delete(url) {
      return new Promise((resolve, reject) => {
        this.$axios.delete(url).then((res) => {
          this.stopLoading();
          this.success(res.data.message);
          resolve(res.data);
        }).catch((res) => {
          this.stopLoading();
          this.handelResponseError(res);
          reject(res);
        });
      });
    }
  }
}
