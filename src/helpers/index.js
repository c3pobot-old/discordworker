'use strict'
const Cmds = require('discordhelper')
Cmds.AddBasicSlashCmds = require('./addBasicSlashCmds')
Cmds.apiFetch = require('./apiFetch')
Cmds.AdminNotAuth = require('./adminNotAuth')
Cmds.BotRequest = require('botrequest')
Cmds.CheckServerAdmin = require('./checkServerAdmin')
Cmds.CheckSuperAdmin = require('./checkSuperAdmin')
Cmds.CheckVIP = require('./checkVIP')
module.exports = Cmds
