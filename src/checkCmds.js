'use strict'
const SlashCmd = require('src/cmds/updateslashcmds/cmd.json')
const CheckCmd = async()=>{
  try{
    const globalCmds = await MSG.GetGlobalCmds()
    //console.log(globalCmds)
    if(process.env.PRIVATE_BOT){
      if(globalCmds?.filter(x=>x.name == 'updateslashcmds').length == 0){
        console.log('update cmd missing adding it now ...')
        const guildStatus = await MSG.AddGlobalCmd(SlashCmd.cmd, 'POST')
      }
    }else{
      if(botSettings.botSID){
        const guildCmds = await MSG.GetGuildCmds(botSettings.botSID)
        //console.log(guildCmds)
        if(guildCmds?.filter(x=>x.name == 'updateslashcmds').length == 0){
          console.log('update cmd missing adding it now ...')
          const guildStatus = await MSG.AddGuildCmd(botSettings.botSID, SlashCmd.cmd, 'POST')
        }
      }
    }
    if(process.env.IS_TEST_BOT && globalCmds?.length > 0){
       console.log('This is the test bot and there should be no global cmds. Removing them')
       const globalStatus = await MSG.AddGlobalCmd([], 'PUT')
       console.log(globalStatus)
    }
  }catch(e){
    console.error(e);
  }
}
CheckCmd()
