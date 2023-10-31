const { create, getById , get, update, deleteById} = require("./student.controller");
const router = require("express").Router();


router.post("/add", create)
        .post("/:id/added", getById)
        .get("/", get)
        .post("/:id/update", update)
        .delete("/:id/delete", deleteById);

module.exports = router;