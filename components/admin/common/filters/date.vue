<template>
  <div>
    <template v-if="header.filter.action === undefined">
      <b-datepicker
        :max-date="new Date()"
        v-model="header.filter.vModel"
        :first-day-of-week="1"
        placeholder="Click to select..."
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
    </template>
    <template v-else>
      <b-datepicker
        :max-date="new Date()"
        v-model="header.filter.vModel"
        :first-day-of-week="1"
        placeholder="Click to select..."
        @input="changeValue"
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
    </template>
  </div>
</template>
<script>
import moment from "moment";

export default {
  props: ["header"],
  mounted() {
    if (this.$route.query[this.header.name] !== undefined) {
      this.header.filter.vModel = this.$route.query[this.header.name];
    }
  },
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
