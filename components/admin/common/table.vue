<template>
  <div>
    <template v-if="defaultProps.tableOption.filterPosition === 'outside-table'">
        <span v-for="(header , index) in defaultProps.headers" :key="header.name+'_filter_'+index">
          <template v-if="header.filter !== undefined">
            <filters :header="header"/>
          </template>
        </span>
    </template>
    <table>
      <thead>
      <tr>
        <td>
          <b-checkbox v-model="selectAllIds" @input="selectAll"></b-checkbox>
        </td>
        <th v-for="(header , index) in defaultProps.headers" :key="header.name+'_'+index">
          {{ header.title }}
          <template v-if="header.sort">
            <a href="" @click.prevent="defaultProps.sorting(header.name)"
               :class="defaultProps.tableOption.sortKey === header.name ? 'active' : ''">
                <span
                  v-if="defaultProps.tableOption.sortKey === header.name && defaultProps.tableOption.sortValue === 'asc'">
                  <i class="fa fa-arrow-circle-down"></i>
                </span>
              <span v-else>
                  <i class="fa fa-arrow-circle-up"></i>
                </span>
            </a>
          </template>
          <template v-if="header.filter !== undefined && defaultProps.tableOption.filterPosition === 'inside-table'">
            <filters :header="header"/>
          </template>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(column , indexColumn) in defaultProps.response.payload.records" :key="column.id">
        <td>
          <b-checkbox v-model="ids" @input="removeCheck" :native-value="column.id"></b-checkbox>
        </td>
        <td v-for="(header , indexHeader) in defaultProps.headers" :key="header.name+'_'+indexColumn+'_'+indexHeader">
          <template v-if="column[header.name]">
            <template v-if="header.click !== undefined">
              <a href="" @click.prevent="header.click(column , header ,  indexColumn , indexHeader)">
                <render :header="header" :column="column"/>
              </a>
            </template>
            <template v-else>
              <render :header="header" :column="column"/>
            </template>
          </template>
        </td>
      </tr>
      </tbody>
    </table>
    <b-pagination
      v-if="defaultProps.response.payload.total_page > 1"
      :total="defaultProps.response.payload.total_record"
      :current.sync="defaultProps.response.payload.page"
      :range-before="4"
      :range-after="4"
      :rounded="true"
      :per-page="defaultProps.response.payload.limit"
      icon-prev="chevron-left"
      icon-next="chevron-right"
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page"
      @change="defaultProps.changePage()"
    >
    </b-pagination>
  </div>
</template>
<script>
  import Render from "./render"
  import Filters from "./filters"

  export default {
    components: {
      Render,
      Filters
    },
    props: ["defaultProps"],
    data() {
      return {
        selectAllIds: false,
        ids: [],
      }
    },
    watch: {
      ids(val) {
        this.defaultProps.setIds(val);
      }
    },
    methods: {
      removeCheck() {
        if (this.ids.length === 0) {
          this.selectAllIds = false;
        }
      },
      selectAll() {
        this.ids = [];
        if (this.selectAllIds) {
          _.forEach(this.defaultProps.response.payload.records, (value, index) => {
            this.ids[index] = this.defaultProps.response.payload.records[index].id;
          })
        }
      }
    }
  }
</script>
