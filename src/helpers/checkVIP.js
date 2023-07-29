'use strict'
module.exports = async(obj, level = 1)=>{
  try{
    let auth = 0
    /*
    const sAdmin = await HP.CheckSuperAdmin(obj)
    if(sAdmin > 0) auth++;
    */
    if(auth == 0){
      const vip = (await mongo.find('vip', {_id: obj.member.user.id}))[0]
      if(vip && vip.status && vip.level >= level) auth++;
    }
    return auth
  }catch(e){
    console.error(e)
  }
}
