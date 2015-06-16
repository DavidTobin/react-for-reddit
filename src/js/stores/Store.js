import {EventEmitter} from 'events';
import _ from 'lodash';

class Store extends EventEmitter {
  constructor() {
    super();

    this.CHANGE_EVENT = 'change';

    this.data         = [];
    this.meta         = {};
    this.dataType     = 'basic';
    this.refresh      = null;
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
    return this.data || [];
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

  setMeta(meta, item) {
    if (item) {
      this.meta[item] = meta;
    } else {
      this.meta = meta || {};
    }
  }

  getMeta(item) {
    if (item) {
      return this.meta[item] || false;
    } else {
      return this.meta;
    }
  }

  setDataType(type) {
    this.dataType = type;
  }

  appendData(data) {
    this.data.push(data);

    this.data = _.uniq(this.data);
  }

  removeData() {
    this.data = [];
  }

  setRefresh(func, args) {
    this.refresh = (() => {
      func.apply(this, args);

      this.emitChange();
    });
  }

  refresh() {
    if (this.refresh) {
      this.refresh();
    }
  }
}

export default Store;
