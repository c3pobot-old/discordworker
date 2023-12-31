'use strict'
const log = require('logger')
let CMD_QUE_NAME = process.env.CMD_QUE_NAME || 'discord'
if(process.env.PRIVATE_WORKER) CMD_QUE_NAME += 'Private'
const cmdProcessor = require('./cmdProcessor')
const processLocalQue = require('./processLocalQue')

const Queue = require('bull')
const queOpts = {
  redis: {
    host: process.env.REDIS_SERVER,
    port: +process.env.REDIS_PORT,
    password: process.env.REDIS_PASS
  },
  settings: {
    maxStalledCount: 0
  }
}
let que = new Queue(CMD_QUE_NAME, queOpts)
module.exports.start = async()=>{
  try{
    await processLocalQue()
    que.process('*', +process.env.NUM_JOBS || 1, cmdProcessor)
    console.log('starting '+CMD_QUE_NAME+' processing with '+(process.env.NUM_JOBS || 1)+' workers')
  }catch(e){
    throw(e)
  }
}
module.exports.removeJob = async(jobId)=>{
  try{
    let job = await que.getJob(jobId)
    if(job){
      await job.moveToCompleted(null, true, true)
      await job.remove()
    }
  }catch(e){
    return
  }
}
