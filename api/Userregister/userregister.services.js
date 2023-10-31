const res = require("express/lib/response");
const { callbackPromise } = require("nodemailer/lib/shared");
const pool = require("../../config/dbconfig");
const {genSaltSync,hashSync}=require("bcrypt");

module.exports  = {
     creates:(data, callBack) => {
         
              
        pool.query(
            `select * from userregister where email = ?`,
            [data.email],
            (err,results) =>{
                var date=new Date();
                var status="active";
                if(results == ""){
                    pool.query(
                        `INSERT INTO userregister(firstname,lastname,email,contact,address,date,status) VALUES (?,?,?,?,?,?,?)`,
                         [
                            data.firstname,
                            data.lastname,
                            data.email,
                            data.contact,
                            data.address,
                            date,
                            status
                         ],
                         (err,results) =>{
                             if(err){
                                return callBack(err);   
                             }
                             else{
                                var chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                                var passwordLength = 8;
                                var password = "";
                                for (var i = 0; i <= passwordLength; i++) {
                                    var randomNumber = Math.floor(Math.random() * chars.length);
                                    password += chars.substring(randomNumber, randomNumber +1);
                                   }
                                   var userRole = "user";
                                //    const salt = genSaltSync(10);
                                //    var pwd = hashSync(password, salt);
                                   var rand = "USER" + Math.floor(Math.random() * 90000 + 10000);
                                pool.query(
                                    `INSERT INTO users(first_name, last_name, email, contact, address, designation,date,status,password,username,userRole) VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
                                    [
                                        data.first_name,
                                        data.last_name,
                                        data.email,
                                        data.contact,
                                        data.address,
                                        data.designation,
                                        data.date,
                                        data.status,
                                        password,
                                        rand,
                                        userRole
                                        
                                    ],
                                    (error)=> {
                                        if(error){
                                            return callBack(error);
                                        }else{
                                            message = {
                                                email:data.email,
                                                password:password
                                            };
                                            return callBack(null,message);
                                        }
                                    }                                    
                                );
                                
                            }

                         }
                     );
                }else if(err){
                    return callBack(err);
                }else{
                    err = "Data Found Duplicate";
                    return callBack(err);
                }
            }
         ); 
                  
     },
     getsById:(id,callBack) => {
        pool.query(
            `select * from userregister where id = ?`,
            [id],
            (err,results,fields) => {
                if(err){
                    return callBack(err);
                }
                else if(results == ""){
                    err = "Data not found";
                    return callBack(err)
                }else{
                    return callBack(null, results);
                }
                
            }
        );
     },
     //getting the products data
     gets:(callBack) => {
         pool.query(
            `select * from userregister`,
            (err,results) => {
                if(err){
                    return callBack(err);
                }else if(results == ""){
                    err = "Data Not Found";
                    return callBack(err);
                }else{
                    return callBack(null, results);
                }

            }
         );
     },
     updates:(data, id, callBack) => {
        pool.query(
            `select * from userregister where  id = ?`,
            [
                
                id
            ],
            (err,results) =>{
                if(results == ""){
                    pool.query(
                        `UPDATE userregister SET firstname=?,lastname=?,email=?,contact=?,address=?,date=?,status=? WHERE  id = ?`,
                         [
                            data.firstname,
                            data.lastname,
                            data.email,
                            data.contact,
                            data.address,
                            data.date,
                            data.status,
                            id
                         ],
                         (err,results) =>{
                             if(err){
                                return callBack(err);   
                             }
                             else{
                                 return callBack(null, results);
                             }
                         }
                     );
                }else if(err){
                    return callBack(err);
                }else{
                    err = "Data Found Duplicate";
                    return callBack(err);
                }
            }
         );         
     },
     deletesById:(id,callBack) => {
        pool.query(`delete from userregister where id=?`,
            [ 
                id
            ],        
            (err,results) => {
                if(err){
                    return callBack(err);
                }else if(results == ""){                    
                    return callBack("Data not found");
                }else{  
                    message = "Data deleted successfully";
                    return callBack(null, message);
                }
            }
    );
     },
     
     
    
     
};
