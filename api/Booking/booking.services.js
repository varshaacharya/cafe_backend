const res = require("express/lib/response");
const { callbackPromise } = require("nodemailer/lib/shared");
const pool = require("../../config/dbconfig");
const {genSaltSync,hashSync}=require("bcrypt");

module.exports  = {
     creates:(data, callBack) => {
        const serve = data.serve;
        const token = Math.floor(Math.random() * (999999999999 - 111111111111) + 111111111111);
        const student_id = data.student_id;
        pool.query(
            'SELECT * FROM student WHERE student_id = ?', 
            [student_id],
            (error,results)=>{
        

      if (results.length > 0) {

        const cartItems = data.cart_item;
        const insertData = cartItems.map((item) => {
          return [token, item.productId, item.productQuantity];
        });
        pool.query(
                        `INSERT INTO temp(token_number,item_id,quantity) VALUES (?)`,
                        [insertData],
                         (err,results) =>{
                             if(err){
                                return callBack(err);   
                             }
                             else{
                                   var date=new Date();
                                   
                                   
                                   pool.query(
                                    'INSERT INTO booking (student_id, barcode_number, serving_time, booking_status, booking_date) VALUES (?, ?, ?, ?,?)',
                                    [student_id, token, serve, 'Order Placed',date],
                                    
                                    (error,results)=> {
                                        if(error){
                                            return callBack(error);
                                        }else{
                                            
                                            return callBack(null,results);
                                        }
                                    } 
                                   ); 
                                };
                            }                                  
                                );
                        }
                        else{
                            error="data not found";
                            return callBack(error);
                        }
                                
            
                         }
                     
                
            
         ); 
                  
     },
     getsById : (id, newbalance, callBack) => {
        pool.query(
            `SELECT balance FROM student WHERE id = ?`,
            [id],
            (err, results, fields) => {
                if (err) {
                    return callBack(err);
                } else if (results.length === 0) {
                    err = "Data not found";
                    return callBack(err);
                } else {
                    const currentBalance = parseInt(results[0].balance);
                    const updatedBalance = parseInt(currentBalance) + parseInt(newbalance);
    
                    pool.query(
                        `UPDATE student SET balance = ? WHERE id = ?`,
                        [updatedBalance, id],
                        (updateErr, updateResults) => {
                            if (updateErr) {
                                return callBack(updateErr);
                            }
                            return callBack(null, updatedBalance);
                        }
                    );
                }
            }
        );
    },
     //getting the products data
     gets:(callBack) => {
         pool.query(
            `select * from student`,
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
            `select * from student where  id = ?`,
            [
                
                id
            ],
            (err,results) =>{
                if(results == ""){
                    pool.query(
                        `UPDATE student SET student_name=?,student_email=?,student_contact=?,student_image=?,balance=?,student_status=? WHERE  id = ?`,
                         [
                            data.student_name,
                            data.student_email,
                            data.student_contact,
                            data.student_image,
                            data.balance,
                            data.student_status,
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
        pool.query(`delete from student where id=?`,
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
