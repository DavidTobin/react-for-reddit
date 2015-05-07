import {EventEmitter} from 'events';
import _ from 'lodash';

class Store extends EventEmitter {
  constructor() {
    super();

    this.CHANGE_EVENT = 'change';

    this.data         = [];
    this.dataType     = 'basic';
  }

  emitChange() {
    this.emit(this.CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(this.CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(this.CHANGE_EVENT, callback);
  }

  getAll() {
    return this.data;
  }

  getById(id) {
    let data = _.chain(this.data)
      .map((item) => (item.id ? item : (item.data ? item.data : {})))
      .value();

    return _.findWhere(data, {id}) || {};
  }

  getDataType() {
    return this.dataType;
  }

  setData(data) {
    this.data = data || [];
  }

  setDataType(type) {
    this.dataType = type;
  }

  appendData(data) {
    this.data.push(data);

    this.data = _.uniq(this.data);
  }
}

export default Store;
