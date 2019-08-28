const express=require("express")
const route=express.Router();
const {db,users,products,cart,wishlist,order}=require('../db')
route.get('/',(req,res)=>{
    res.render('index')
})

route.get('/product',(req,res)=>{
    products.findAll().then((all)=>{res.send(all)})
})

route.get('/cart',(req,res)=>{
    cart.findAll({where:{user:req.user}}).then((all)=>{res.send(all)})
})

route.get('/wishlist',(req,res)=>{
    wishlist.findAll().then((all)=>{res.send(all)})
})
route.get('/order',(req,res)=>{
    order.findAll().then((all)=>{res.send(all)})
})
route.post('/delcart',(req,res)=>{
    cart.destroy({where : {name :req.body.name}}).then(t=>{
        console.log(t)
        res.sendStatus(200)
    })
})
route.post('/delwishlist',(req,res)=>{
    wishlist.destroy({where : {name :req.body.name}}).then(t=>{
        console.log(t)
        res.sendStatus(200)
    })
})
route.post('/delorder',(req,res)=>{
    order.destroy({where : {name :req.body.name}}).then(t=>{
        console.log(t)
        res.sendStatus(200)
    })
})
route.post('/decquant',(req,res)=>{
cart.decrement('quantity',w)
})

module.exports={route}