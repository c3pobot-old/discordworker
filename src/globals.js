'use strict'
global.debugMsg = +process.env.DEBUG || 0
global.botSettings = {}
global.CmdMap = {}
global.gameDataReady = 1
//global.mongo = require('./mongo')

global.mongo = require('mongoclient')

global.redis = require('redisclient')
global.numeral = require('numeral')
global.sorter = require('json-array-sorter')
global.MSG = require('discordmsg')
global.HP = require('./helpers')
