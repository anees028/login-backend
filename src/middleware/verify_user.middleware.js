const express = require('express')
const sequelize = require("../sequelize/sequelize");
const { QueryTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const app = express()

const requestTime = function (req, res, next) {
    req.requestTime = Date.now()
    next()
}

const validateUser = async function (req, res, next) {
    let query = `select password from users where isDeleted = false && name = ?`
    let result = await sequelize.query(query, {
        replacements: [req.body.username],
        type: QueryTypes.SELECT
    })
    if (result && result.length > 0) {
        let compare = await bcrypt.compare(req.body.password, result[0].password);
        if (!compare) {
            res.send({ status: 400, message: 'Failed to authenticate...', error: true, success: false });
        } else {
            next();
        }
    }
    else {
        console.log("Failed to authenticate...")
        res.send({ status: 400, message: 'Failed to authenticate...', error: true, success: false })
    }
}


module.exports = {
    requestTime,
    validateUser
}

