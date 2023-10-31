const { fetchuser,creates, changepwd,gets, getsById, updates, deletesById } = require("./auth.services");
const { genSaltSync, hashSync} = require("bcrypt");
const { get } = require("express/lib/response");
var nodemailer = require('nodemailer');

module.exports = {
    login:(req,res) =>{
        const body = req.body;
       
        fetchuser(body, (err, results) => {
            if(err){
                // console.log(err);
                return res.status(500).json( {
                    success:0,
                    status:500,
                    error:err           
                }); 
            }
            else{
                return res.status(200).json({
                    success:1,
                    data:{
                        userToken:results.token,
                        user_type:results.user_type,
                        user_email:results.user_email,
                        user_name:results.user_name,
                    },
                    status:200
                });
            }            
        });
    },
     
     create:(req,res) => {
        const bodyData = req.body;
        creates(bodyData, (err, results) => {
            if(err){
                return res.status(500).json({
                    success:0,
                    data:err
                });
            }else{
                return res.status(200).json({
                    sucsess:1,
                    data:results
                });
            }
        });
     },
     changePassword:(req,res) => {
        const bodyData = req.body;

        changepwd(bodyData,(err,results) => {
            if(err){
                return res.status(500).json( {
                    success:0,
                    status:500,
                    error:err
                });
            }else if(results){
                return res.status(200).json( {
                    success:1,
                    status:200,
                    message:results
                });
            }
        });
      
        
    },
     getById:(req,res) => {
        const id = req.params.id;
        getsById(id, (err, results) => {
            if(err){
                return res.status(500).json({
                    success:0,
                    data:err
                });
            }else{
                return res.status(200).json({
                    sucsess:1,
                    data:results
                });
            }
        });
     },
     get:(req,res) => {        
        gets((err, results) => {
            if(err){
                return res.status(500).json({
                    success:0,
                    data:err
                });
            }else{
                return res.status(200).json({
                    sucsess:1,
                    data:results
                });
            }
        });
     },
     update:(req,res) => {
        const body = req.body;
        const id = req.params.id;
        updates(body, id, (err, results) => {
            if(err){
                return res.status(500).json({
                    success:0,
                    message:err
                });
            }else{
                return res.status(200).json({
                    sucsess:1,
                    message:results
                });
            }
        });
     },
     deleteById:(req,res) => {
        const id = req.params.id;
        deletesById(id, (err, results) => {
            if(err){
                return res.status(500).json({
                    success:0,
                    error:err,
                    status:500
                });
            }else{
                return res.status(200).json({
                    sucsess:1,
                    data:results
                });
            }
        });
     },
     verifyToken:(req, res, next) => {
        //get the auth header value
        const bearerHeader = req.headers['authorization'];
        if(typeof bearerHeader !== "undefined"){
            const bearer = bearerHeader.split(":");
            const bearerToken = bearer[1];
            req.token = bearerToken;
            jwt.verify(req.token, 'secretkey', (err, authData) => {
                if(err){
                    res.status(403).json({
                        success:0,
                        status:500,
                        error:err
                    });
                }
                else{   
                    req.authData = authData;                
                    next();
                    // res.status(403).json({
                    //     authData,
                    //     status:200
                    // });
                }
            });

            
           
        }else{
            res.status(403).json({
                error:"unauthenticated",
                status:403
            });
        }
    },

    
};

