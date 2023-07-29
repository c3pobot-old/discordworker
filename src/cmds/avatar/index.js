'use strict'
module.exports = async(obj)=>{
  try{
    let avatarURL, msgName, footerText, dId = obj.member.user.id, sId, msg2Send = {content: 'Error getting avatar'}, username = (obj.member.nick ? obj.member.nick:obj.member.user.username)
    if(obj.data.options){
      if(obj.data.options.find(x=>x.name == 'user')){
        dId = obj.data.options.find(x=>x.name == 'user').value
        if(obj.data.resolved && obj.data.resolved.members && obj.data.resolved.users && obj.data.resolved.users[dId]){
          username = (obj.data.resolved.members[dId] && obj.data.resolved.members[dId].nick ? obj.data.resolved.members[dId].nick:obj.data.resolved.users[dId].username)
        }
      }
      if(obj.data.options.find(x=>x.name == 'server')){
        sId = obj.guild_id
        if(+obj.data.options.find(x=>x.name == 'server').value > 999999) sId = obj.data.options.find(x=>x.name == 'server').value
      }
    }
    if(sId){
      const guild = await HP.BotRequest('getGuild', {sId: sId})
      if(guild && guild.iconURL){
        avatarURL = guild.iconURL
        msgName = guild.name
        footerText = sId
      }
    }else{
      avatarURL = await HP.BotRequest('getAvatar', {dId: dId, sId: obj.guild_id} )
      msgName = '@'+username
      footerText = dId
    }
    if(avatarURL){
      const embedMsg = {
        author: {
          name: msgName,
          icon_url: avatarURL
        },
        color: 15844367,
        image: {
          url: avatarURL
        },
        footer: {
          text: 'ID: '+footerText
        },
        timestamp: new Date()
      }
      msg2Send.content = null
      msg2Send.embeds = [embedMsg]
    }
    HP.ReplyMsg(obj, msg2Send)
  }catch(e){
    console.log(e)
    HP.ReplyError(obj)
  }
}
