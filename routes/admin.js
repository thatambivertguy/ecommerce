const express=require("express")
const route=express.Router();
const {db,users,products,cart,wishlist,order}=require('../db')
route.get('/',(req,res)=>{
    res.render('index')
})

route.get('/product',(req,res)=>{
    products.findAll().then((all)=>{res.send(all)})
})
// route.get('searched',(req,res)=>{
//     products.findAll({where:{}}).then((selected)=>{
//         res.send(selected)
//     })
// })

module.exports={route}