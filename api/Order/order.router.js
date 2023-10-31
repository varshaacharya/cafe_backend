const { create, getById , get, update, deleteById,getStud,getStudDet} = require("./order.controller");
const router = require("express").Router();


router.post("/add", create)
        .post("/:id/added", getById)
        .get("/", get)
        // .get("/:barcode_number",getStud)//to display student detail and token number
        .post("/:id/:barcode_number",getStudDet)//to display item,qty,price,total
        .post("/:id/update", update)
        .delete("/:id/delete", deleteById);

module.exports = router;