const express = require('express');
const route = express.Router();
const { db, users, products, carts, orders, wishlist } = require('../database/database');
const {passport}=require('./../passportsetup/setupmypassport');

function checkLoggedIn(req, res, next) {
    if (req.user) {
        if(req.user.usertype=='user')
        {
        console.log(req.user);
        console.log("req.user "+req.user.username)
        return next()
        }
    }
    res.redirect('/login')
  }
//get all products from database
route.get('/getallproducts', (req, res) => {
    products.findAll().then(allproducts => {
        res.send(allproducts)
    })
})


//get all products from cart table 
route.get('/getallfromcart', (req, res) => [
    carts.findAll().then((allproducts) => {
        res.send(allproducts);
    })
])

//add a product to cart
route.post('/addtocart', (req, res) => {
    carts.create({
        productname:req.body.productname,
        productid:req.body.productid,
        username:req.body.username,
        price:req.body.price,
        quantity:req.body.quantity,
        vendor:req.body.vendor,
    }).then(allproducts=>{
        res.send(allproducts);
    })
})

//delete a product from cart
route.post('/delete', (req, res) => {
    carts.destroy({ where: { productname: req.body.productname } }).then(cart.findAll().then((allproducts) => { res.send(allproducts) }))
})

//decrement the quantity of a product from cart
route.post('/decrementcartproduct', (req, res) => {
    carts.findOne({ where: { productname: req.body.productname } })
        .then((item) => {

            carts.decrement('quantity',{where:{productname:item.dataValues.productname}}).then(()=>{
                if(item.dataValues.quantity<=1)
                {
                    carts.destroy({ where: { productname: req.body.productname } }).then(()=>{ res.sendStatus(200)})
                }
                res.sendStatus(200)
            })
        })
})

//increment the quantity of a product from cart
route.post('/incrementcartproduct', (req, res) => {
    carts.findOne({ where: { productname: req.body.productname } })
        .then(item => {
            carts.increment('quantity',{where:{productname:item.dataValues.productname}})
        }).then(()=>{
            res.sendStatus(200);
        })
})

//get allproducts of wishlist
route.get('/getwishlist', (req, res) => {
    wishlist.findAll().then(allproducts => {
        res.send(allproducts);
    })
})
//add a product to wishlist
route.post('/addtowishlist', (req, res) => {
    wishlist.create({
        productid: req.body.productid,
        productname: req.body.productname,
        price: req.body.price,
        quantity: req.body.quantity,
        username: req.body.username,
        vendor: req.body.vendor,
    }).then((allproducts)=>{
        res.send(allproducts);
    })
})

//delete a product from wishlist
route.post('/deletefromwishlist',(req,res)=>{
    wishlist.destroy({where:{productname:req.body.productname}}).then(()=>{
        res.sendStatus(200);
    })
})



//place an order 
route.post('/placeorder',(req,res)=>{
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    orders.create({
        time:date+"--"+time,
        status:'pending',
        paymentmethod:req.body.paymentmethod,
        productid: req.body.productid,
        productname: req.body.productname,
        price: req.body.price,
        quantity: req.body.quantity,
        username: req.body.username,
        vendor: req.body.vendor,

    }).then((allproducts)=>{
        res.send(allproducts);
    })
})
//get all the order placed by a user
route.get('/allorders',(req,res)=>{
    orders.findAll({where:{username:req.query.username}}).then(allproducts=>{
        res.send(allproducts);
    })
})








//homepage for the user
route.get('/',checkLoggedIn,(req,res)=>{
    res.render('userhome')
})

//cart page
route.get('/cart',checkLoggedIn,(req,res)=>{
    res.render('usercart');
})

route.get('/products',(req,res)=>{
    res.render('userproduct')
})
module.exports = route
