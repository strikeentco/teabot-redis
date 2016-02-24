teabot-redis  [![License](https://img.shields.io/github/license/strikeentco/teabot-redis.svg)](https://github.com/strikeentco/teabot-redis/blob/master/LICENSE) [![npm](https://img.shields.io/npm/v/teabot-redis.svg)](https://www.npmjs.com/package/teabot-redis) [![npm](https://img.shields.io/badge/teabot-plugin-blue.svg)](https://github.com/strikeentco/teabot/tree/master/docs/PLUGINS.md)
==========
[![Build Status](https://travis-ci.org/strikeentco/teabot-redis.svg)](https://travis-ci.org/strikeentco/teabot-redis) [![node](https://img.shields.io/node/v/teabot-redis.svg)](https://www.npmjs.com/package/teabot-redis) [![Test Coverage](https://codeclimate.com/github/strikeentco/teabot-redis/badges/coverage.svg)](https://codeclimate.com/github/strikeentco/teabot-redis/coverage) [![bitHound Score](https://www.bithound.io/github/strikeentco/teabot-redis/badges/score.svg)](https://www.bithound.io/github/strikeentco/teabot-redis)

`teabot-redis` a Redis db [plugin](https://github.com/strikeentco/teabot/tree/master/docs/PLUGINS.md) for [TeaBot](https://github.com/strikeentco/teabot).

By default, all data is stored in memory, but for synchronization between servers or nodes, you can use this plugin.

# Usage

```sh
$ npm install teabot-redis --save
```

You also should install [TeaBot](https://github.com/strikeentco/teabot) and Redis [client](https://github.com/NodeRedis/node_redis).

```js
var TeaBot = require('teabot')('TELEGRAM_BOT_TOKEN', 'TELEGRAM_BOT_NAME');
var redis = require('redis');
var client = redis.createClient();

TeaBot.use('db', require('teabot-redis')(client));

TeaBot.defineCommand(function(dialog, message) {
  dialog.setUserData('some data', 'data'); // data will be stored at Redis db
  dialog.sendMessage('Echo: ' + message.text);
});

TeaBot.startPolling();
```

# License

The MIT License (MIT)<br/>
Copyright (c) 2016 Alexey Bystrov
