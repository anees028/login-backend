const express = require('express')
const app = express()

const requestTime = function (req, res, next) {
  req.requestTime = Date.now()
  next()
}

const validateUser = function(req, res, next){
    let name = req.body.name;
    if(name === "Anees"){
        req.name;
        next()
    }
    else{
        console.log("Error")
        next()
    }
}



module.exports = {
    requestTime,
    validateUser
}

