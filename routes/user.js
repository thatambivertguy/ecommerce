const express = require('express');
const route = express.Router();
const { db, users, products, carts, orders, wishlist } = require('../database/database');
const {passport}=require('./../passportsetup/setupmypassport');
const sequelize=require('sequelize');
const op=sequelize.Op;
function checkLoggedIn(req, res, next) {
    if (req.user) {
        // if(req.user.usertype=='user')
        {
        console.log(req.user);
        console.log("req.user "+req.user.username)
        return next()
        }
    }
    res.redirect('/login')
  }
route.use(express.static('/public'))

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
    carts.findOne({where:{username:req.user.username,productname:req.body.productname}}).then((t)=>{
        
        if(t==null){
        carts.create({
            productname:req.body.productname,
            productid:req.body.productid,
            username:req.user.username,
            price:req.body.price,
            quantity:1,
            vendor:req.body.vendor,
            image:req.body.imageat,
        }).then(allproducts=>{
            res.send(allproducts);
        })
        }
        else{ 
        carts.increment('quantity',{where:{username:req.user.username,productname:req.body.productname}})}
        res.send("done") })
   

})

//delete a product from cart
route.post('/delete', (req, res) => {
   // console.log('control transfeered')
    carts.destroy({ where: { productid: req.body.id,username:req.user.username } }).then(carts.findAll().then((allproducts) => { res.send(allproducts) }))
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
        quantity: 1,
        username: req.user.username,
        vendor: req.body.vendor,
        image:req.body.imageat,
    }).then((allproducts)=>{
        res.send(allproducts);
    })
})

//delete a product from wishlist
route.post('/deletefromwishlist', (req, res) => {
    // console.log('control transfeered')
     wishlist.destroy({ where: { productid: req.body.id,username:req.user.username } }).then(wishlist.findAll().then((allproducts) => { res.send(allproducts) }))
 })

//order to cancel
route.post('/orderupdate',(req,res)=>{
    orders.update({status:'Cancelled'},{where:{id:req.body.id}}).then(()=>{
        res.sendStatus(200);
    })
})

//wishlist to addtocart
route.post('/wishtocart',(req,res)=>{
    wishlist.findOne({ where: { productid:req.body.id,username:req.user.username } }).then((item)=>{
        console.log(item.dataValues)
        carts.create({       
            productname:item.dataValues.productname,
            productid:item.dataValues.productid,
            username:item.dataValues.username,
            price:item.dataValues.price,
            quantity:1,
            vendor:item.dataValues.vendor,
            image:item.dataValues.image,

        }).then(()=>{
            wishlist.destroy({ where: { productid: req.body.id,username:req.user.username } }).then(wishlist.findAll().then((allproducts) => { res.send(allproducts) }))            
        })
       

    })
})


//payment page loading 
route.get('/payment',checkLoggedIn,(req,res)=>{res.render('payment')})


//place an order 
route.post('/payment',checkLoggedIn,(req,res)=>{
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    console.log('here')
    carts.findAll({where:{username:req.user.username}}).then((data)=>{
        for(var i=0; i<data.length;i++){
       const  id=data[i].dataValues.productid
        const user=data[i].dataValues.username
            // console.log(data[i].dataValues)
        orders.create({
        time:date+"--"+time,
        status:'pending',
        paymentmethod:'card_testing',
        productid: data[i].dataValues.productid,
        productname: data[i].dataValues.productname,
        price: data[i].dataValues.price,
        quantity: data[i].dataValues.quantity,
        username: data[i].dataValues.username,
        vendor: data[i].dataValues.vendor,

    }).then(()=>{
        console.log('created order')
        carts.destroy({ where: { productid: id,username:user } }).then((()=>{console.log('destruction done')}))
    })
}    

res.send('okay')
})
})

//get all the order placed by a user
route.get('/allorders',(req,res)=>{
    orders.findAll({where:{username:req.user.username}}).then(allproducts=>{
        res.send(allproducts);
    })
})

route.post('/search',(req,res)=>{
    products.findAll({where:{name:{[op.like]:'%'+req.body.term+'%'}}})
    .then(data=>{
        res.send(data);
    })
})

//get filtered product
route.post('/filterprod',(req,res)=>{
 if(req.body.type && req.body.subtype &&req.body.price){
    var condition={where:{
     type:req.body.type,
     subtype:req.body.subtype,
     price:{[op.gt]: req.body.price}

  }    
}}
else if(req.body.type && req.body.subtype){
    var condition={where:{
     type:req.body.type,
     subtype:req.body.subtype,
     }    
}}
else if(req.body.subtype &&req.body.price){
    var condition={where:{
     subtype:req.body.subtype,
     price:{[op.gt]: req.body.price}

  }    
}}
else if(req.body.type&&req.body.price){
    var condition={where:{
     type:req.body.type,
    price:{[op.gt]: req.body.price}

  }    
}}
else if( req.body.subtype){
    var condition={where:{
     subtype:req.body.subtype,}    
}}
else if(req.body.type){
    var condition={where:{
     type:req.body.type}    
}}
else if(req.body.price){
    var condition={where:{
  price:{[op.gt]: req.body.price}}    
}}



products.findAll(condition).then(data=>{
        console.log(data)
        res.send(data)})

})




//single product view
route.get('/singleproduct',(req,res)=>{
    //var idd=req.query.id;
    //console.log(idd);
    console.log("oh yeah" +req.query.id);
    //const idd=req.body.id;
    products.findOne({where:{id:req.query.id}}).then(pro=>{
        console.log(pro)
        res.send(pro)

    })
    //res.render('singleproduct')
})


//order page for user
route.get('/orders',checkLoggedIn,(req,res)=>{res.render('userorder')})
//homepage for the user
route.get('/',checkLoggedIn,(req,res)=>{
    res.render('userhome')
})

//cart page
route.get('/cart',checkLoggedIn,(req,res)=>{
    res.render('usercart');
})

//wishlist page
route.get('/wishlist',checkLoggedIn,(req,res)=>{
    res.render('userwishlist');
})

route.get('/products',checkLoggedIn,(req,res)=>{
    res.render('userproduct')
})
module.exports = route
