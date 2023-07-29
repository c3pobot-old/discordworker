'use strict'
require('src/globals')
require('src/expressServer')
const QueWrapper = require('quewrapper')
const SaveSlashCmds = require('cmd2array')
require('./botUpdates')

const cmdQueOpts = {
  queName: process.env.CMD_QUE_NAME || 'discord',
  numJobs: +process.env.NUM_JOBS || 1,
  queOptions: {
    redis: {
      host: process.env.REDIS_SERVER,
  		port: +process.env.REDIS_PORT,
  		password: process.env.REDIS_PASS
    }
  },
  localQue: redis,
  localQueKey: process.env.LOCAL_QUE_KEY
}
if(process.env.PRIVATE_WORKER) cmdQueOpts.queName += 'Private'
const CmdQue = new QueWrapper(cmdQueOpts)

const InitRedis = async()=>{
  try{
    await redis.init()
    const redisStatus = await redis.ping()
    if(redisStatus == 'PONG'){
      console.log('redis connection successful...')
      StartServices()
    }else{
      console.log('redis connection error. Will try again in 5 seconds...')
      setTimeout(InitRedis, 5000)
    }
  }catch(e){
    console.error('redis connection error. Will try again in 5 seconds...')
    setTimeout(InitRedis, 5000)
  }
}
//
const StartServices = async()=>{
  try{
    await UpdateBotSettings()
    if(process.env.POD_NAME?.toString().endsWith("0")){
      if(!process.env.PRIVATE_BOT) await SaveSlashCmds(baseDir+'/src/cmds', 'discord')
      await require('./checkCmds')
    }
    await CreateCmdMap()
    StartQue()
  }catch(e){
    console.error(e);
    setTimeout(StartServices, 5000)
  }
}

const CreateCmdMap = async()=>{
  try{
    const obj = (await mongo.find('slashCmds', {_id: 'discord'}))[0]
    if(obj?.cmdMap) CmdMap = obj.cmdMap
    setTimeout(CreateCmdMap, 60000)
  }catch(e){
    console.error(e);
    setTimeout(CreateCmdMap, 5000)
  }
}
const UpdateBotSettings = async()=>{
  try{
    const obj = (await mongo.find('botSettings', {_id: "1"}))[0]
    if(obj) botSettings = obj
    setTimeout(UpdateBotSettings, 60000)
  }catch(e){
    setTimeout(UpdateBotSettings, 5000)
    console.error(e)
  }
}
const StartQue = ()=>{
  try{
    if(CmdMap){
      CmdQue.start()
    }else{
      setTimeout(StartQue, 5000)
    }
  }catch(e){
    console.error(e);
    setTimeout(StartQue, 5000)
  }
}
InitRedis()
