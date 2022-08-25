// const sequelize = require("../sequelize/sequelize");




async function getUsers(req, res){
    console.log("Get User api hit successfully.")
    res.send({status: 200, message: "Api hit successfully"})
}

module.exports = {
    getUsers,
}

