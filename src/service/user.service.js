// const sequelize = require("../sequelize/sequelize");


async function getUsers(req, res){
    console.log("Get User api hit successfully.")
    res.send({status: 200, message: "Api hit successfully"})
}

async function getUserByMiddleware(req,res){
    console.log("Get User api hit successfully.")
    res.send({status: 200, message: "Api hit with middleware function", data:{
        time : new Date(req.requestTime)
    }})
}

async function postNameByMiddleware(req,res){
    console.log("Get User api hit successfully.")
    res.send({status: 200, message: "Api hit with middleware function", data:{
        name: req.name,
    }})
}

module.exports = {
    getUsers,
    getUserByMiddleware,
    postNameByMiddleware
}

