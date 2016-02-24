'use strict';

function TeabotRedisPlugin(client, set) {
  if (!(this instanceof TeabotRedisPlugin)) {
    return new TeabotRedisPlugin(client, set);
  }

  this._pluginType = 'db';
  this._pluginData = {
    client: client,
    SET: set || 'app:teabot'
  };
}

TeabotRedisPlugin.prototype._getType = function () {
  return this._pluginType;
};

TeabotRedisPlugin.prototype._getData = function (name) {
  return this._pluginData[name] || false;
};

TeabotRedisPlugin.prototype._get = function (key) {
  return new Promise(function (resolve, reject) {
    this._getData('client').get(this._getData('SET') + ':' + key, function (err, record) {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(record));
      }
    });
  }.bind(this));
};

TeabotRedisPlugin.prototype._put = function (key, data) {
  return new Promise(function (resolve, reject) {
    this._getData('client').set(this._getData('SET') + ':' + key, JSON.stringify(data), function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  }.bind(this));
};

module.exports = TeabotRedisPlugin;
