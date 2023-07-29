'use strict'
const { RedisWrapper } = require('dbwrapper')

global.debugMsg = +process.env.DEBUG || 0
global.botSettings = {}
global.CmdMap = {}
global.gameDataReady = 1
//global.mongo = require('./mongo')

global.mongo = require('mongoapiclient')

global.redis = new RedisWrapper({
  host: process.env.REDIS_SERVER,
  port: process.env.REDIS_PORT,
  passwd: process.env.REDIS_PASS
})
global.numeral = require('numeral')
global.sorter = require('json-array-sorter')
global.MSG = require('discordmsg')
global.HP = require('./helpers')
