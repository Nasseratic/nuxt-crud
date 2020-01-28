import Notification from "./notifiaction"
import Request from "./requests"
import Delete from "./actions/delete"
import PaginationResponse from "./objects/paginateResponse"

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
        setIds: this.SetIds,
      }
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
      search: {},
      /////default actions
      moduleName: "",
      editAction: {
        name: "id",
        sort: false,
        title: "Edit",
        render: {
          type: "html",
          action: (val) => {
            return `<span><i class="fa fa-edit" ></i> </span>`
          },
        },
        click: (val) => {
          this.$router.push(this.moduleName + "/" + val.id)
        }
      },
      deleteAction: {
        name: "id",
        sort: false,
        title: "Delete",
        render: {
          type: "html",
          action: (val) => {
            return `<span><i class="fa fa-trash" ></i> </span>`
          },
        },
        click: (row, header, indexOfRow) => {
          this.$buefy.dialog.confirm({
            title: 'Are You Sure you want to delete !',
            message: 'are you sure you want to delete ?  you can not restore this action',
            confirmText: 'Delete',
            type: 'is-danger',
            hasIcon: true,
            onConfirm: () => {
              let options = {
                id: row.id,
                index: indexOfRow,
                list: this.response.payload.records
              };
              this.deleteRow(options);
            }
          })
        }
      },
      ///index
      headers: [],
      ids: [],
      customFilter: [],
    }
  },
  methods: {
    index() {
      return new Promise((resolve, reject) => {
        let options = {
          url: this.adminUrl + "/" + this.moduleName
        };
        options.url += "?sort=" + this.tableOption.sortKey + "|" + this.tableOption.sortValue;
        options.url += "&page=" + this.response.payload.page;
        options.url += "&limit=" + this.response.payload.limit;
        if (_.size(this.search) > 0) {
          options.url += this.appendSearchToUrl()
        }
        this.get(options).then((res) => {
          this.response = res;
          resolve(res)
        }).catch((res) => {
          this.response = res;
          reject(res)
        });
      });
    },
    sorting(keyName) {
      if (this.tableOption.sortKey === keyName) {
        this.tableOption.sortValue = (this.tableOption.sortValue === "desc" ? "asc" : "desc");
      } else {
        this.tableOption.sortValue = "desc";
      }
      this.response.payload.page = 1;
      this.tableOption.sortKey = keyName;
      this.index();
    },
    changePage(page) {
      this.response.payload.page = page;
      this.index();
    },
    appendSearchToUrl() {
      let searchText = "";
      _.forIn(this.search, function (value, key) {
        if (value && value !== "") {
          searchText += "&" + key + "=" + value
        }
      });
      return searchText
    },
    filter(key, val) {
      this.search[key] = val;
      this.response.payload.page = 1;
      this.index();
    },
    SetIds(ids) {
      this.ids = ids;
    }
  }
}
