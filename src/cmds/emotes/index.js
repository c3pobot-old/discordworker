'use strict'
module.exports = async(obj)=>{
  try{
    let msg2Send = {content: 'Error getting guild info'}, total = 0, animated = 0
    const tempObj = {
      sId: obj.guild_id
    }
    const guild = await HP.BotRequest('getGuild', tempObj)
    if(guild){
      if(guild.emojis.length > 0){
        total = +guild.emojis.length
        animated = +guild.emojis.filter(x=>x.animated == true).length
        const array = []
        for(let i = 0;i<guild.emojis.length;i += 40){
          array.push(guild.emojis.slice(i, +i + 40))
        }
        const embeds = []
        for(let i in array){
          const embedMsg = {
            color: 15844367,
            description: ''
          }
          if(i == 0) embedMsg.title = (total - animated)+' Emoji, '+animated+' Animated ('+total+' Total)'
          let count = 0
          for(let e in array[i]){
            embedMsg.description += '<'
            if(array[i][e].animated) embedMsg.description += 'a'
            embedMsg.description += ':'+array[i][e].name+':'+array[i][e].id+'> ';
            count++;
            if(count > 19){
              embedMsg.description += '\n'
              count = 0
            }
          }
          embeds.push(embedMsg)
        }
        if(embeds.length > 0){
          msg2Send.content = null
          msg2Send.embeds = embeds
        }
      }else{
        msg2Send.content = 'There are no custom server emojis'
      }
    }
    HP.ReplyMsg(obj, msg2Send)
  }catch(e){
    console.log(e)
    HP.ReplyError(obj)
  }
}
