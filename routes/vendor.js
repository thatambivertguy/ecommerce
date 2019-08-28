const express=require("express")
const route=express.Router();
const {db,users,products,cart,wishlist,order}=require('../db')
route.get('/',(req,res)=>{
    res.render('index')
})
module.exports={route}