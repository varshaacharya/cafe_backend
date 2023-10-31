const res = require("express/lib/response");
const { callbackPromise } = require("nodemailer/lib/shared");
const pool = require("../../config/dbconfig");
const {genSaltSync,hashSync}=require("bcrypt");
const jwt =require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports  = {
   
    fetchuser:(data,callBack) => {
        pool.query(
            `SELECT  * FROM login_master WHERE user_email = ?`,
            [data.user_email],
            (error, results, fields) => {
                if(error){
                    return callBack(error); 
                }else if(results == ""){
                    err = "EmailId is not registered";
                    return callBack(err);
                }else{
                   
                     
        pool.query(
            `select user_name,user_email,user_password,user_type from login_master where user_email = ?`,         
            [
                data.user_email,               
            ],     
            (error, results, fields) => {
                const queryData = results;
                if(error){
                    return callBack(error);
                }else if(results == ""){
                    err = "EmailId is not registered";
                    return callBack(err);
                }
                else
                {                  
                                const user = {
                                    id:queryData[0].id,
                                    user_name:queryData[0].user_name,
                                    user_email:queryData[0].user_email   

                                };
                                const token = jwt.sign({user}, 'secretkey', { expiresIn: 60 * 60 });
                                const message = {
                                    token:token,
                                    user_type:queryData[0].user_type,
                                    user_email:queryData[0].user_email,
                                    user_name:queryData[0].user_name
                                };
                                return callBack(null,message); 
                                                             
                            
                        
                        
                    }                               
                }      
            );
        
    }
}
);

},  
   
create:(data, callBack) => {
    pool.query(
        `select * from login_master where user_email = ?`,
        [data.user_email],
        (err,results) =>{
            var date=new Date();
            var password = "Admin123";
            if(results == ""){
                pool.query(
                    `INSERT INTO login_master(user_name,user_email,user_type) VALUES (?,?)`,
                     [
                        data.user_name,
                        data.user_email,
                        data.user_type,
                        password,
                        date
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
changepwd:(bodyData,callBack) => {
    if(bodyData.newPassword == bodyData.confirmPassword){
        var user_email = bodyData.user_email;
        var bOldPassword =  bodyData.oldPassword;  
        var newPassword = bodyData.newPassword;         

        pool.query(
            `select user_password from login_master where user_email = ?`,
            [user_email],
            (err,results)=>{
                var queryData = results;
                if(err){
                    return callBack(err); 
                }else if(queryData.length == 0){
                    return callBack("Unable to update your passord..!",null);  
                }else if(bOldPassword != queryData[0].password){
                    return callBack("Invalid current password..!",null);
                }else{
                    pool.query(
                        `update login_master set user_password = ? where user_email = ? `,
                        [newPassword,user_email],
                        (err,results)=>{
                            if(err){
                                return callBack(err);
                            }else if(results){
                                return callBack(null,"Password updated successfully..!")
                            }else{
                                return callBack("Unable to update your pasword..!")
                            }
                        }
                    );
                }
            }
        );           
    }else{
       return callBack("Passwords dont match..!",null);
    }
},

             
        
   
                         
     getsById:(id,callBack) => {
        pool.query(
            `select * from login_master where id = ?`,
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
            `select * from login_master`,
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
            `select * from login_master where  id = ?`,
            [
                
                id
            ],
            (err,results) =>{
                if(results == ""){
                    pool.query(
                        `UPDATE employee SET first_name=?,last_name=?,email=?,contact=?,address=?,designation=?,date=?,status=? WHERE  id = ?`,
                         [
                            data.first_name,
                            data.last_name,
                            data.email,
                            data.contact,
                            data.address,
                            data.designation,
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
        pool.query(`delete from login_master where id=?`,
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
