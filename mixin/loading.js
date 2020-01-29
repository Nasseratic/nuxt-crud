export default {
  data() {
    return {
      isLoading: true,
      loadingComponent: null
    };
  },
  methods: {
    startLoading() {
      this.loadingComponent = this.$buefy.loading.open();
    },
    stopLoading() {
      this.loadingComponent.close();
    }
  }
};
