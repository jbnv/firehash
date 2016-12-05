function _set(key,value) {
  if (!key) return;
  if (value === undefined) value = true;
  if (/boolean|number|string/.test(typeof key)) {
    this[key] = value;
    return;
  };
  if (typeof key == "function") {
    key.bind(this)(value);
    return;
  }
  if (Array.isArray(key)) {
    for (var index in key) {
      var subkey = key[index];
      this[subkey] = value;
    }
    return;
  }
  for (var subkey in key) {
    this[subkey] = key[subkey] || value;
  }
}

// scalar: get one field
// function: ?
// array: get more than one field
// object: ?
function _get(key) {
  if (!key) return this;
  if (/boolean|number|string/.test(typeof key)) {
    return this[key];
  };
  if (typeof key == "function") {
    return key.bind(this)(value);
  }
  if (Array.isArray(key)) {
    var outbound = {};
    for (var index in key) {
      var subkey = key[index];
      outbound[subkey] = this[subkey];
    }
    return outbound;
  }
  var outbound = {};
  for (var subkey in key) {
    outbound[subkey] = this[subkey] || key[subkey];
  }
  return outbound;
}

// scalar: get one field
// function: ?
// array: get more than one field
// object: ?
function _delete(key) {
  if (!key) return this;
  if (/boolean|number|string/.test(typeof key)) {
    delete this[key];
    return this;
  };
  if (typeof key == "function") {
    return _delete.call(this,key(this));
  }
  if (Array.isArray(key)) {
    for (var index in key) {
      var subkey = key[index];
      delete this[subkey];
    }
    return this;
  }
  for (var subkey in key) {
    if (key[subkey]) delete this[subkey];
  }
  return this;
}

// scalar: get one field
// function: ?
// array: get more than one field
// object: ?
function _has(key) {

  function __defined(variable) { return typeof variable !== 'undefined'; }

  var outbound = true;
  if (!key) return true;
  if (/boolean|number|string/.test(typeof key)) {
    return __defined(this[key]);
  };
  if (typeof key == "function") {
    return __defined(key.bind(this)(value));
  }
  if (Array.isArray(key)) {
    for (var index in key) {
      outbound = outbound && __defined(this[key[index]]);
    }
    return outbound;
  }
  for (var subkey in key) {
    outbound = outbound && (!key[subkey] || __defined(this[subkey]));
  }
  return outbound;
}

function _log(data) {
  if (this.__debug) this.__messages[new Date().getTime()] = data;
}

function _push(level1,level2,entity) {

  if (!level1 || !level2 || !entity) return;

  if (!this.__data[level1]) this.__data[level1] = {};
  _set.call(this.__data[level1],level2,entity);
  _log.call(this,{
    method: "push",
    level1: level1,
    level2: level2,
    entity: entity
  })
}

function _forEach(callback) {
  for (var key in this) callback(key,this[key]);
}

function _map(callback) {
  var outbound = {};
  for (var key in this) outbound[key] = callback(key,this[key]);
  return outbound;
}

function _reduce(callback,seed) {
  var outbound = seed;
  for (var key in this) { outbound = callback(key,this[key],outbound) };
  return outbound;
}

////////////////////////////////////////////////////////////////////////////////

function _importMessages() {
  var _messages = this.__messages;
  Array.from(arguments).forEach(function(data) {
    if (/boolean|number|string/.test(typeof data)) {
      _messages[data] = true;
      return;
    };
    if (typeof data == "function") {
      data(_messages,true);
      return;
    }
    if (Array.isArray(data)) {
      data.forEach(function(datum) { _messages[datum] = true; })
      return;
    }
    for (var key in data) {
      _messages[key] = data[key];
    }
  });
}

////////////////////////////////////////////////////////////////////////////////

function Firehash(data,name,debug) {
  this.__data = {};
  this.__messages = {};
  this.__name = name || null;
  this.__debug = debug || false;
  _set.call(this.__data,data);
}

// path: Either a key to a value or an array of nested keys.
Firehash.prototype.get = function(path) {
  return _get.call(this.__data,path);
}

Firehash.prototype.set = function(path,value) {
  _set.call(this.__data,path,value);
}

Firehash.prototype.delete = function(path) {
  _delete.call(this.__data,path);
}

Firehash.prototype.has = function(path) {
  return _has.call(this.__data,path);
}

// Set the field to the given value only if it is not already set.
Firehash.prototype.setDefault = function(path,value) {
  if (!path) return null;
  if (!_get.call(this.__data,path)) _set.call(this.__data,path,value);
}

Firehash.prototype.count = function() {
  return Object.keys(this.__data).length;
}

Firehash.prototype.keys = function() {
  return Object.keys(this.__data);
}

Firehash.prototype.values = function() {
  return _reduce.call(this.__data,function(key,value,seed) {
    seed.push(value); return seed;
  },[]);
}

Firehash.prototype.push = _push;

Firehash.prototype.fix = function(singular,plural) {

  var singularValue = this.__data[singular], pluralValue = this.__data[plural];

  if (singularValue && !pluralValue) {
    this.__data[plural] = {};
    this.__data[plural][singularValue] = true;
    return;
  }

  if (!pluralValue) {
    this.__data[plural] = {};
    return;
  }

  if (/boolean|number|string/.test(typeof pluralValue)) {
    this.__data[plural] = {};
    this.__data[plural][pluralValue] = true;
  };

}

Firehash.prototype.expand =  function(fieldSlug,source,transformFn) {
  if (!fieldSlug) return null;
  if (!source) return null;
  if (!transformFn) transformFn = function(x) { return x; };
  for (var key in _get.call(this.__data,fieldSlug)) {
    _push.call(this,fieldSlug,key,transformFn(source[key]) || true);
  }
}

// Browse a collection and extract all data from a certain field.
Firehash.prototype.extract = function(fieldSlug,collection,transformFn) {

  if (!fieldSlug) return null;
  if (!collection) return null;

  for (var collectionKey in collection) {

    var entity = collection[collectionKey];
    var field = entity[fieldSlug];
    if (!field) continue;
    var entityTransformed = transformFn ? transformFn(entity) : entity;

    if (/boolean|string|number/.test(typeof field)) {
      _push.call(this,field,collectionKey,entityTransformed);
      continue;
    }

    if (Array.isArray(field)) {
      field.forEach(function(fieldKey) {
        _push.call(this,fieldKey,collectionKey,entityTransformed);
      })
    }

    for (var fieldKey in field || {}) {
      _push.call(this,fieldKey,collectionKey,entityTransformed);
    }

  }

}

////////////////////////////////////////////////////////////////////////////////
// Collection functions.

// callback: function(key,value)
Firehash.prototype.forEach = function(callback) {
  _forEach.call(this.__data,callback);
}

Firehash.prototype.map = function(callback) {
  return _map.call(this.__data,callback);
}

Firehash.prototype.reduce = function(callback,seed) {
  return _reduce.call(this.__data,callback,seed);
}

////////////////////////////////////////////////////////////////////////////////
// messages

Firehash.prototype.messages = function() {
  return this.__messages;
}

Firehash.prototype.addMessage = _importMessages;

////////////////////////////////////////////////////////////////////////////////
// Data fields

Firehash.prototype.name =  function() {
  return this.__name;
}

Firehash.prototype.title =  function() {
  return this.__data.title || "UNTITLED";
}

////////////////////////////////////////////////////////////////////////////////

module.exports = Firehash;
