'use strict'
module.exports = async(obj)=>{
  try{
    let auth = 0
    if(obj.member.user.id == process.env.BOT_OWNER_ID) auth++
    if(auth == 0 && botSettings?.superAdmin?.filter(x=>x == obj.member.user.id).length > 0) auth++
    return auth
  }catch(e){
    console.error(e)
  }
}
