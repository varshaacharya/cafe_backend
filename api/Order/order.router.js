const { create, getById , get, update, deleteById,getStud,getStudDet,getBookings} = require("./order.controller");
const router = require("express").Router();


router.post("/add", create)
        .post("/:id/added", getById)
        .get("/", get)
        // .get("/:barcode_number",getStud)//to display student detail and token number
        .post("/getBarcodeItems",getStudDet)//to display item,qty,price,total
        .post("/:id/update", update)
        .post("/getBookings",getBookings)
        .delete("/:id/delete", deleteById);

module.exports = router;