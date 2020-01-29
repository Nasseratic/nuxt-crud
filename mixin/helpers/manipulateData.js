export default {
  methods: {
    transformDataType(object) {
      let newObject = {};
      _.forEach(object, function(value) {
        if (value.submitStore) {
          let val = value.vModel;
          if (value.storeType !== undefined) {
            switch (value.storeType) {
              case "integer":
                val = parseInt(val);
                break;
            }
          }
          newObject[value.name] = val;
        }
      });
      return newObject;
    },
    setValuesToObject(object, values) {
      _.forEach(object, function(value) {
        if (values[value.name]) {
          value.vModel = values[value.name];
        }
      });
    },
    clearObjectValue(object) {
      _.forEach(object, function(value) {
        switch (value.storeType) {
          case "integer":
            value.vModel = 0;
            break;
          case "string":
            value.vModel = "";
            break;
        }
      });
    }
  }
};
