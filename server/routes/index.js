const express = require('express');
const router = express.Router();
const UserModel = require('../models/player');
const jwt_decode = require('jwt-decode')

router.post("/create_login", async(req, res) => {
    const token = req.headers["authorization"];
    console.log("token", token)
    try {
        const decoded = jwt_decode(token)
        const user = await UserModel.findOne({email: decoded.email})
        
        if(!user) {
            const createUser = await UserModel.create({
                ...decoded
            })

            return res.json(createUser)
        }

        return res.json(user)
    }catch(err) {
        return res.status(401).json({
            message: "You are not authorized"
        })
    }
}) 

module.exports = router;