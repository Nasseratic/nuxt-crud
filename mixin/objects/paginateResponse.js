export default {
  data() {
    return {
      response: {
        payload: {
          records: [],
          total_record: 0,
          total_page: 0,
          offset: 0,
          limit: 30,
          page: 1,
          prev_page: 2,
          next_page: 0
        },
        code: 200,
        errors: [],
        message: "",
        status: true
      }
    };
  }
};
