'use strict'
const fs = require('fs')
const ReadFile = async(file)=>{
  try{
    const obj = await fs.readFileSync(file)
    if(obj) return JSON.parse(obj)
  }catch(e){
    console.log('Error reading file '+file)
  }
}
const ReadFiles = async()=>{
  return new Promise(resolve=>{
    try{
      fs.readdir(baseDir+'/src/cmds', async(err, filenames)=>{
        let array = []
        if(err) {
          console.log(err)
        }else{
          for(let i in filenames){
            const obj = await ReadFile(baseDir+'/src/cmds/'+filenames[i]+'/cmd.json')
            if(obj && array.filter(x=>x.name === obj.name).length === 0) array.push(obj)
          }
        }
        resolve(array)
      })
    }catch(e){
      console.error(e)
      resolve()
    }
  })
}
const GetCmdArray = async(dbkey)=>{
  try{
    const cmdArray = await ReadFiles
    if(cmdArray?.length > 0){
      await mongo.rep('slashCmds', {_id: dbKey}, {data: cmdArray})
    }else{
      console.log('Did not find any commands. Will try again in 5 seconds')
      setTimeout(()=>GetCmdArray(dbKey), 5000)
    }
  }catch(e){
    console.error(e)
    setTimeout(()=>GetCmdArray(dbKey), 5000)
  }
}
module.exports = GetCmdArray
