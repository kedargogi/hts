const userModel= require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const saltRounds = 10;
var cookieParser = require('cookie-parser');
const configs = require("../config/config");



const register= async(req,res)=>{
    try{
        let {first_name,last_name,email,password}=req.body;
        let dupEntry = await userModel.findOne({email: req.body.email});
        if(dupEntry){
            return res.status(409).send("User with this email already exists");
        }
        let hash = await bcrypt.hash(password, saltRounds)
        req.body.password = hash;

        let newUser = await userModel.create(req.body)

        res.status(201).send({ data: newUser })

    }
    catch(error){
        console.log(error);
        res.send({ error: error })

    }
}

const login =async(req,res)=>{
    try{
        let { email, password } = req.body;
        //console.log("inside login",req.body)

        let user = await userModel.findOne({ email: req.body.email });
        //console.log(user)

        if (!user) {
            return res.status(404).send("User not registered");
        }
        const passwordIsValid = await bcrypt.compare(req.body.password, user.password)
            .then((resp) => {
                //console.log(resp)
                
                if (!resp) {
                    return res.status(401).send("Invalid Credentials")
                }
                const token =jwt.sign({ email: user.email, _id: user._id}, process.env.JWT_SECRET || configs.JWT_SECRET, { expiresIn: "24h" });
                //console.log(token)
                res.cookie("jwt", token, {
                    httpOnly: true,
                });
                return res.status(200).send(token);
            })
            .catch((err)=>{
                console.log(err);
            })

        } 
    catch(error){
        console.log(error)
    }
}

module.exports = {register,login};
