export default {
  methods: {
    objectHas(object, path) {
      return _.has(object, path);
    },
    issetAndNotNull(object, path) {
      return this.objectHas(object, path) && object[path] !== null
    },
    issetAndNotEmptyString(object, path) {
      return this.objectHas(object, path) && object[path] !== ""
    },
    issetAndNotEmptyArray(object, path) {
      return this.objectHas(object, path) && object[path].length > 0
    },
    isset(arg){
      return arg !== undefined
    }
  }
}
