import Notification from "./notifiaction";
import Request from "./requests";
import Delete from "./actions/delete";
import PaginationResponse from "./objects/paginateResponse";

export default {
  mixins: [Notification, Request, Delete, PaginationResponse],
  computed: {
    defaultProps() {
      return {
        headers: this.headers,
        response: this.response,
        tableOption: this.tableOption,
        sorting: this.sorting,
        changePage: this.changePage,
        setIds: this.SetIds
      };
    }
  },
  data() {
    return {
      adminUrl: process.env.adminUrl,
      //////table
      tableOption: {
        loadingTable: false,
        sortKey: "id",
        sortValue: "desc",
        filterPosition: "inside-table" /// inside-table or outside-table
      },
      /////default actions
      moduleName: "",
      editAction: {
        name: "id",
        sort: false,
        title: "Edit",
        render: {
          type: "html",
          action: val => {
            return `<span><i class="fa fa-edit" ></i> </span>`;
          }
        },
        click: val => {
          this.$router.push(this.moduleName + "/" + val.id);
        }
      },
      deleteAction: {
        name: "id",
        sort: false,
        title: "Delete",
        render: {
          type: "html",
          action: val => {
            return `<span><i class="fa fa-trash" ></i> </span>`;
          }
        },
        click: (row, header, indexOfRow) => {
          this.$buefy.dialog.confirm({
            title: "Are You Sure you want to delete !",
            message:
              "are you sure you want to delete ?  you can not restore this action",
            confirmText: "Delete",
            type: "is-danger",
            hasIcon: true,
            onConfirm: () => {
              let options = {
                id: row.id,
                index: indexOfRow,
                list: this.response.payload.records
              };
              this.deleteRow(options);
            }
          });
        }
      },
      ///index
      headers: [],
      ids: [],
      customFilter: [],
      queries: {}
    };
  },
  methods: {
    setDefaultQueryString() {
      let loadingQuery = this.$route.query;
      let defaultQuery = {
        sort: "id|desc",
        page: 1,
        limit: 30
      };

      let merge = {
        ...defaultQuery,
        ...loadingQuery,
        ...this.queries
      };
      this.queries = merge;
    },
    index() {
      if (this.__timeout) clearTimeout(this.__timeout);
      this.__timeout = setTimeout(() => {
        /// first set the default query string
        this.setDefaultQueryString();
        return new Promise((resolve, reject) => {
          let options = {
            url:
              this.adminUrl +
              "/" +
              this.moduleName +
              "?" +
              this.appendQueryStringToApiCall()
          };
          ///then now append all query strings with filters
          this.$router.push({
            query: this.queries
          });
          ////
          this.get(options)
            .then(res => {
              this.response = res;
              resolve(res);
            })
            .catch(res => {
              this.response = res;
              reject(res);
            });
        });
      }, 400);
    },
    sorting(keyName) {
      if (this.tableOption.sortKey === keyName) {
        this.tableOption.sortValue =
          this.tableOption.sortValue === "desc" ? "asc" : "desc";
      } else {
        this.tableOption.sortValue = "desc";
      }
      this.response.payload.page = 1;
      this.tableOption.sortKey = keyName;
      this.queries.sort =
        this.tableOption.sortKey + "|" + this.tableOption.sortValue;
      this.index();
    },
    changePage(page) {
      // this.response.payload.page = page;
      console.log(page);
      this.queries.page = page;
      this.index();
    },
    appendQueryStringToApiCall() {
      let query = "";
      _.forIn(this.queries, (value, key) => {
        if (value && value !== "") {
          query += key + "=" + value + "&";
        }
      });
      return query;
    },
    filter(key, val) {
      this.queries[key] = val;
      this.response.payload.page = 1;
      this.index();
    },
    SetIds(ids) {
      this.ids = ids;
    }
  }
};
