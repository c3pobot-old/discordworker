'use strict'
module.exports = async(sId)=>{
  try{
    const slashCmds = await mongo.find('slashCmds', {})
    const guild = (await mongo.find('payoutServers', {sId: sId, status: 1}))[0]
    let cmds = []
    for(let i in slashCmds){
      const tempCmds = slashCmds[i].cmds.filter(x=>x.type == 'private' && !x.hidden).map(x=>x.cmd)
      if(tempCmds?.length > 0) cmds = cmds.concat(tempCmds)
      if(guild?.status == 1){
        const poCmds = slashCmds[i].cmds.filter(x=>x.type == 'shard' && !x.hidden).map(x=>x.cmd)
        if(poCmds?.length > 0) cmds = cmds.concat(poCmds)
      }
    }
    return await MSG.AddGuildCmd(sId, cmds, 'PUT')
  }catch(e){
    console.error(e);
  }
}
