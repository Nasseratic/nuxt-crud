import Notification from "./notifiaction"
import Loading from "./loading"

export default {
  mixins: [Notification, Loading],
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
                this.delete(row.id, indexOfRow);
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
    find() {
      return new Promise((resolve, reject) => {
        this.startLoading();
        let url = this.adminUrl + "/" + this.moduleName + "/" + this.id;
        this.$axios.get(url).then((res) => {
          this.stopLoading();
          resolve(res.data);
        }).catch((res) => {
          this.stopLoading();
          this.handelResponseError(res);
          reject(res);
        });
      })
    },
    changePage(page) {
      this.response.payload.page = page;
      this.index();
    },
    store(data, attrForRow) {
      return new Promise((resolve, reject) => {
        this.startLoading();
        let url = this.adminUrl + "/" + this.moduleName;
        let dataAfterTransformation = this.getValuesFromObject(data);
        if (dataAfterTransformation) {
          this.$axios.post(url, dataAfterTransformation).then((res) => {
            this.stopLoading();
            if (attrForRow !== undefined) {
              this.row = res.data[attrForRow];
            } else {
              this.row = res.data.payload;
            }
            this.success(res.data.message);
            resolve(res.data)
          }).catch((res) => {
            this.stopLoading();
            this.handelResponseError(res);
            reject(res)
          });
        } else {
          this.stopLoading();
        }
      })
    },
    update(data, attrForRow) {
      return new Promise((resolve, reject) => {
        this.startLoading();
        let url = this.adminUrl + "/" + this.moduleName + "/" + this.id;
        let dataAfterTransformation = this.getValuesFromObject(data);
        if (dataAfterTransformation) {
          this.$axios.put(url, dataAfterTransformation).then((res) => {
            this.stopLoading();
            if (attrForRow !== undefined) {
              this.row = res.data[attrForRow];
            } else {
              this.row = res.data.payload;
            }
            this.success(res.data.message);
            resolve(res.data)
          }).catch((res) => {
            this.stopLoading();
            this.handelResponseError(res);
            reject(res)
          });
        } else {
          this.stopLoading();
        }
      })
    },
    delete(id, index) {
      return new Promise((resolve, reject) => {
        this.startLoading();
        let url = this.adminUrl + "/" + this.moduleName + "/" + id;
        this.$axios.delete(url).then((res) => {
          this.stopLoading();
          this.success(res.data.message);
          this.$delete(this.response.payload.records, index);
          resolve(res.data);
        }).catch((res) => {
          this.stopLoading();
          this.handelResponseError(res);
          reject(res);
        });
      })
    },
    index() {
      return new Promise((resolve, reject) => {
        this.startLoading();
        let url = this.adminUrl + "/" + this.moduleName + "?sort=" + this.tableOption.sortKey + "|" + this.tableOption.sortValue;
        url += "&page=" + this.response.payload.page;
        url += "&limit=" + this.response.payload.limit;
        if (_.size(this.search) > 0) {
          url += this.appendSearchToUrl()
        }
        this.$axios.get(url).then((res) => {
          this.stopLoading();
          this.response = res.data;
          resolve(res.data);
        }).catch((res) => {
          this.stopLoading();
          this.response = res;
          reject(res);
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
