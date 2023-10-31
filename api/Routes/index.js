const router =require("express").Router();

const registerRouter=require("../Products/product.router");
const employeeRouter=require("../Employee/employee.router");
const userRegisterRouter=require("../Userregister/userregister.router");
const authRouter=require("../Auth/auth.router");
const studentRouter=require("../Student/student.router");
const categoryRouter=require("../Category/category.router");
const itemRouter=require("../Item/item.router");
const orderRouter=require("../Order/order.router");

// const {verifyToken}=require("../Auth/auth.controller");

router.use("/api/register",registerRouter);
router.use("/api/employee",employeeRouter);
router.use("/api/userRegister",userRegisterRouter);
router.use("/api/auth",authRouter);
router.use("/api/student",studentRouter);
router.use("/api/category",categoryRouter);
router.use("/api/item",itemRouter);
router.use("/api/order",orderRouter);



module.exports=router;