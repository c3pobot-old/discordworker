'use strict'
const PORT = process.env.HEALTH_PORT || 3001
const express = require('express')
const app = express()
app.get('/healthz', (req, res)=>{
  res.json({status: 'ok'}).status(200)
})
app.use('/readyz', (req, res)=>{
  res.json({status: 'ok'}).status(200)
})
const server = app.listen(PORT, ()=>{
  console.log('Listening on ', server.address().port)
})
