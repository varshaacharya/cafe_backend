const { create, getById , get, update, deleteById} = require("./userregister.controller");
const router = require("express").Router();


router.post("/add", create)
        .get("/:id", getById)
        .get("/", get)
        .post("/:id/update", update)
        .delete("/:id/delete", deleteById);

module.exports = router;