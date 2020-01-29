<template>
  <div>
    <b-datepicker
      :max-date="new Date()"
      v-model="header.filter.vModel"
      :first-day-of-week="1"
      placeholder="Click to select..."
      @input="changeValue"
      :name="input.name"
    >
      <button
        class="button is-primary"
        @click="header.filter.vModel = new Date()"
      >
        <b-icon icon="calendar-today"></b-icon>
        <span>Today</span>
      </button>
      <button class="button is-danger" @click="clearDate">
        <b-icon icon="close"></b-icon>
        <span>Clear</span>
      </button>
    </b-datepicker>
  </div>
</template>
<script>
import moment from "moment";

export default {
  props: ["header"],
  methods: {
    changeValue() {
      if (this.header.filter.vModel !== null) {
        let formatVal = moment(this.header.filter.vModel).format("YYYY-MM-DD");
        this.header.filter.action(formatVal);
      } else {
        this.header.filter.action(null);
      }
    },
    clearDate() {
      this.header.filter.vModel = null;
      this.header.filter.action(null);
    }
  }
};
</script>
