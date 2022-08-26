const sequelize = require("../sequelize/sequelize");
const { QueryTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const { json } = require("express");

async function getUsers(req, res) {
    console.log("Get User api hit successfully.")
    res.send({ status: 200, message: "Api hit successfully" })
}

async function getUserByMiddleware(req, res) {
    console.log("Get User api hit successfully.")
    res.send({
        status: 200, message: "Api hit with middleware function", data: {
            time: new Date(req.requestTime)
        }
    })
}

async function postNameByMiddleware(req, res) {
    console.log("Get User api hit successfully.")
    res.send({
        status: 200, message: "Api hit with middleware function", data: {
            name: req.name,
        }
    })
}


//performing CRUD operation....  for example....

async function insertUser(req, res) {
    let query = 'insert into users (name,password,email) VALUES (?,?,?)'
    req.body.password = await bcrypt.hashSync(req.body.password, 10);
    let data = await sequelize.query(query,
        {
            replacements: [req.body.name, req.body.password, req.body.email],
            type: QueryTypes.INSERT
        })
    res.json(data)
}

async function getUsers(req, res) {
    let query = 'select id, name, email, createdAt from users where isDeleted = false';
    let data = await sequelize.query(query, {
        type: QueryTypes.SELECT
    })
    if (data.length > 0) {
        res.send({
            status: 200, message: "Users fetched successfully", data: {
                users: data
            }
        })
    }
    else {
        res.send({ status: 400, message: "Failed to fetch the data." })
    }
}


async function getUserById(req, res) {
    let query = 'select id,name,email, createdAt from users where isDeleted = false AND id = ?'
    let data = await sequelize.query(query, {
        replacements: [req.params.id],
        type: QueryTypes.SELECT
    })
    if (data.length > 0) {
        res.send({
            status: 200, message: `Data fetch of ${data[0].name}`, data: {
                user: data[0]
            }
        })
    }
    else {
        res.send({ status: 400, message: "Failed to fetch the data." })
    }
}



async function getUserByName(req, res) {
    let query = `select id,name,email, createdAt from users where isDeleted = false AND name LIKE '%sa%'`
    let data = await sequelize.query(query, {
        replacements: [req.params.name],
        type: QueryTypes.SELECT
    })
    if (data.length > 0) {
        res.send({
            status: 200, message: `Data fetch of ${req.params.name}`, data: {
                user: data
            }
        })
    }
    else {
        res.send({ status: 400, message: "Failed to fetch the data." })
    }
}

async function deleteUserById(req, res) {
    let query = 'UPDATE users SET isDeleted = true WHERE id = ?';
    let data = await sequelize.query(query, {
        replacements: [req.params.id],
        type: QueryTypes.UPDATE
    });
    res.send({status: 200, message: `Data deleted successfully of user with ID ${req.params.id}` });    
}





//Resetting Password..
async function resetUserPassword(req, res) {

}



module.exports = {
    getUsers,
    getUserByMiddleware,
    postNameByMiddleware,
    insertUser,
    getUsers,
    getUserById,
    getUserByName,
    deleteUserById,
    resetUserPassword
}

