'use strict'
const log = require('logger')
const CLIENT_ID = process.env.DISCORD_CLIENT_ID
const { v4: uuidv4 } = require('uuid')
const checkCmds = async()=>{
  try{
    let count = 0, shard = 0, guild = 0
    let obj = await mongo.find('commandUpdates', {botId: CLIENT_ID})
    if(!obj || obj?.length === 0) return
    for(let i in obj){
      if(!obj[i].data) continue
      let status = await addCommands(obj[i])
      if(status){
        ++count
        if(obj[i].type === 'shard') ++shard
        if(obj[i].type === 'guild') ++guild
      }
    }
    if(count === +obj.length && obj[0].sId && obj[0].chId && obj[0].dId){
      let msg2send = '<@'+obj[0].dId+'> added '+guild+' guild commands and '+shard+' shard commands...'
      await mongo.set('adminMessages', {_id: uuidv4()}, {botId: CLIENT_ID, sId: obj[0].sId, chId: obj[0].chId, content: {content: msg2send} })
    }
  }catch(e){
    throw(e)
  }
}
const addCommands = async(obj = {})=>{
  try{
    let status = await MSG.AddGuildCmd(obj._id, obj.data, 'PUT')
    if(status?.length === obj.data.length && status[0]?.guild_id === obj._id){
      await mongo.del('commandUpdates', {_id: obj._id})
      return true
    }else{
      console.error('error updating guild '+obj._id)
      console.error(JSON.stringify(status))
    }
  }catch(e){
    throw(e)
  }
}
const syncUpdates = async()=>{
  try{
    if(!CLIENT_ID) throw('discord client id not provided...')
    await checkCmds()
    await syncMessages()
    setTimeout(syncUpdates, 30000)
  }catch(e){
    console.error(e)
    setTimeout(syncUpdates, 5000)
  }
}
const syncMessages = async()=>{
  try{
    let obj = await mongo.find('adminMessages', {botId: CLIENT_ID})
    if(!obj || obj?.length === 0) return
    for(let i in obj){
      let status = await HP.BotRequest('sendMsg', obj[i])
      if(status?.id) await mongo.del('adminMessages', {_id: obj[i]._id})
    }
  }catch(e){
    throw(e)
  }
}
const Start = ()=>{
  try{
    let status = mongo.status()
    if(status){
      syncUpdates()
      return
    }
    setTimeout(Start, 5000)
  }catch(e){
    log.error(e)
    setTimeout(Start, 5000)
  }
}
Start()
