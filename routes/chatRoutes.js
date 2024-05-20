const express = require('express')
const router = express.Router()
const chatController = require('../controller/chatController')
const { fileViewer  , joinRoom  ,publicRoom , namespaceses} =  require('../controller/fileviewer')

module.exports = (io) => {
    chatController(io)
    router.get('/joinroom' , joinRoom)
    router.get('/publicroom',  publicRoom)
    

    return router
}
