import Notification from "./notifiaction"
import Loading from "./loading"
import Request from "./requests"

export default {
  mixins: [Notification, Loading, Request],
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
      url: "",
      adminUrl: process.env.adminUrl,
      /////response
      response: {
        payload: {
          records: [],
          total_record: 0,
          total_page: 0,
          offset: 0,
          limit: 30,
          page: 1,
          prev_page: 2,
          next_page: 0,
        },
        code: 200,
        errors: [],
        message: "",
        status: true,
      },
      //////
      //////table
      tableOption: {
        loadingTable: false,
        sortKey: "id",
        sortValue: "desc",
        filterPosition:"inside-table" /// inside-table or outside-table
      },
      search: {},
      /////default actions
      moduleName: "",
      editAction:
        {
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
      deleteAction:
        {
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
                this.deleteRow(row.id, indexOfRow);
              }
            })
          }
        },
      /////store
      row: {},
      ///edit
      id: 0,
      ///index
      headers: [],
      ids: [],
    }
  },
  methods: {
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
    find() {
      return new Promise((resolve, reject) => {
        let url = this.adminUrl + "/" + this.moduleName + "/" + this.id;
        this.get(url).then((res) => {
          resolve(res)
        }).catch((res) => {
          reject(res)
        })
      })
    },
    store(data, attrForRow) {
      return new Promise((resolve, reject) => {
        let url = this.adminUrl + "/" + this.moduleName;
        let dataAfterTransformation = this.getValuesFromObject(data);
        if (dataAfterTransformation) {
          this.post(url, dataAfterTransformation).then((res) => {
            if (attrForRow !== undefined) {
              this.row = res[attrForRow];
            } else {
              this.row = res.payload;
            }
            resolve(res)
          }).catch((res) => {
            reject(res)
          })
        }
      })
    },
    update(data, attrForRow) {
      return new Promise((resolve, reject) => {
        let url = this.adminUrl + "/" + this.moduleName + "/" + this.id;
        let dataAfterTransformation = this.getValuesFromObject(data);
        if (dataAfterTransformation) {
          this.put(url, dataAfterTransformation).then((res) => {
            if (attrForRow !== undefined) {
              this.row = res[attrForRow];
            } else {
              this.row = res.payload;
            }
            resolve(res)
          }).catch((res) => {
            reject(res)
          })
        }
      })
    },
    deleteRow(id, index) {
      return new Promise((resolve, reject) => {
        let url = this.adminUrl + "/" + this.moduleName + "/" + id;
        this.delete(url).then((res) => {
          this.$delete(this.response.payload.records, index);
          resolve(res)
        }).catch((res) => {
          reject(res)
        })
      })
    },
    index() {
      return new Promise((resolve, reject) => {
        let url = this.adminUrl + "/" + this.moduleName + "?sort=" + this.tableOption.sortKey + "|" + this.tableOption.sortValue;
        url += "&page=" + this.response.payload.page;
        url += "&limit=" + this.response.payload.limit;
        if (_.size(this.search) > 0) {
          url += this.appendSearchToUrl()
        }
        this.get(url).then((res) => {
          this.response = res;
          resolve(res)
        }).catch((res) => {
          this.response = res;
          reject(res)
        });
      });
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
    getValuesFromObject(object) {
      let newObject = {};
      _.forEach(object, function (value) {
        if (value.submitStore) {
          let val = value.vModel;
          if (value.storeType !== undefined) {
            switch (value.storeType) {
              case "integer":
                val = parseInt(val);
                break
            }
          }
          newObject[value.name] = val
        }
      });
      return newObject;
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
    setValuesToObject(object, values) {
      _.forEach(object, function (value) {
        if (values[value.name]) {
          value.vModel = values[value.name]
        }
      })
    },
    clearObjectValue(object) {
      _.forEach(object, function (value) {
        switch (value.storeType) {
          case "integer":
            value.vModel = 0;
            break
          case "string":
            value.vModel = "";
            break
        }
      })
    },
    SetIds(ids) {
      this.ids = ids;
    }
  }
}
