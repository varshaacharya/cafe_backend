const { create , get} = require("./category.controller");
const router = require("express").Router();


router.post("/add", create)
        .get("/", get);
        

module.exports = router;






