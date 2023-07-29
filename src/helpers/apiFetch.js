'use strict'
const got = require('got')
module.exports = async(url)=>{
  try{
    return await got(url, {
      method: 'GET',
      headers: {
        cookie: 'over18=1'
      },
      decompress: true,
      responseType: 'json',
      resolveBodyOnly: true
    })
  }catch(e){
    if(e.response && e.response.body){
      if(e.response.body.message){
        console.log(e.response.body.message)
      }else{
        e.response.body
      }
    }
  }
}
