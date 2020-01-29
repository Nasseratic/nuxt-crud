export default {
  data() {
    return {
      notificationPosition: "is-bottom"
    };
  },
  methods: {
    notification(message, type) {
      this.$buefy.toast.open({
        duration: 2000,
        message: message,
        type: type,
        position: this.notificationPosition
      });
    },
    success(message) {
      this.notification(
        message ? message : "Something happened correctly!",
        "is-success"
      );
    },
    danger(message) {
      this.notification(
        message ? message : "Something's not good, also I'm on bottom",
        "is-danger"
      );
    }
  }
};
