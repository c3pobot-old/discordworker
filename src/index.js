'use strict'
const log = require('logger')
require('src/globals')
require('./botUpdates')

const CmdQue = require('./cmdQue')
const SaveSlashCmds = require('cmd2array')
const UpdateBotSettings = require('./services/updateBotSettings')
const CreateCmdMap = require('./services/createCmdMap')

const CheckRedis = async()=>{
  try{
    let status = redis.status()
    if(status){
      CheckMongo()
      return
    }
    setTimeout(CheckRedis, 5000)
  }catch(e){
    setTimeout(CheckRedis, 5000)
  }
}
//
const CheckMongo = ()=>{
  try{
    let status = mongo.status()
    if(status){
      CheckCmdMap()
      return
    }
    setTimeout(CheckMongo, 5000)
  }catch(e){
    log.error(e)
    setTimeout(CheckMongo, 5000)
  }
}
const CheckCmdMap = async()=>{
  try{
    if(process.env.POD_NAME?.toString().endsWith("0") && !process.env.PRIVATE_BOT){
      await SaveSlashCmds(baseDir+'/src/cmds', 'discord')
      await require('./checkCmds')
    }
    let status = await CreateCmdMap()
    if(status){
      await UpdateBotSettings()
      CmdQue.start()
      return
    }
    setTimeout(CheckCmdMap, 5000)
  }catch(e){
    log.error(e)
    setTimeout(CheckCmdMap, 5000)
  }
}
CheckRedis()
