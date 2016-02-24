'use strict';

var should = require('should/as-function');

function client() {
  return {
    get: function (key, cb) {
      if (key === 'app:teabot:0') {
        cb(null, JSON.stringify({ status: 'Ok' }));
      } else {
        cb(new Error('Oops'));
      }
    },

    set: function (key, data, cb) {
      if (key === 'app:teabot:0') {
        cb(null);
      } else {
        cb(new Error('Oops'));
      }
    }
  };
}

var botan = require('../main')(client());

describe('teabot-botan()', function () {
  describe('._getType()', function () {
    it('should be equal db', function () {
      should(botan._getType()).be.eql('db');
    });
  });

  describe('._getData()', function () {
    it('should be eql app:teabot', function () {
      should(botan._getData('SET')).be.eql('app:teabot');
    });

    it('should be false', function () {
      should(botan._getData()).be.false();
    });
  });

  describe('._get()', function () {
    it('should be eql Ok', function () {
      return botan._get(0).then(function (res) {
        should(res).be.eql({ status: 'Ok' });
      });
    });

    it('should throw Error', function () {
      return botan._get(1).catch(function (res) {
        should(res.message).be.eql('Oops');
      });
    });
  });

  describe('._put()', function () {
    it('should be true', function () {
      return botan._put(0).then(function (res) {
        should(res).be.true();
      });
    });

    it('should throw Error', function () {
      return botan._put(1).catch(function (res) {
        should(res.message).be.eql('Oops');
      });
    });
  });
});
