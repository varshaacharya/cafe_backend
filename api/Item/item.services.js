const res = require("express/lib/response");
const { callbackPromise } = require("nodemailer/lib/shared");
const pool = require("../../config/dbconfig");

module.exports  = {
     create:(data, callBack) => {
        pool.query(
            `select * from item where id = ?`,
            [data.id],
            (err,results) =>{
                var date=new Date();
                if(results == ""){
                    pool.query(
                        `INSERT INTO item(category_id,item_name,image,item_date,item_status,item_price,item_description) VALUES (?,?,?,?,?,?,?)`,
                         [
                            data.category_id,
                            data.item_name,
                            data.image,
                            date,
                            data.item_status,
                            data.item_price,
                            data.item_description
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
     getProductById:(id,callBack) => {
        pool.query(
            `select * from item where id = ?`,
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
     getProducts:(callBack) => {
         pool.query(
            `SELECT item.id,category.category_name as catname, item.item_name as name, item.price, item.item_description as p_desc, item.image as img,  item.item_date, item.item_status
            FROM item
            INNER JOIN category ON item.category_id = category.id`,
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
     updateProduct:(data, id, callBack) => {
        pool.query(
            `select * from item where id = ?`,
            [
                
                id
            ],
            (err,results) =>{
                if(results == ""){
                    pool.query(
                        `UPDATE item SET category_id=?,item_name=?,item_image=?,item_status=?,item_price=?,item_description=? WHERE  id = ?`,
                         [
                            data.category_id,
                            data.item_name,
                            data.item_image,
                            data.item_status,
                            data.item_price,
                            data.item_description,
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
     deleteProductById:(id,callBack) => {
        pool.query(`delete from item where id=?`,
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
