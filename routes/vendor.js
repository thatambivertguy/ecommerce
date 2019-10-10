const express = require('express');
const route = express.Router();
const { db, users, products, carts, orders, wishlist } = require('../database/database');
const {passport}=require('./../passportsetup/setupmypassport');
const multer=require('multer');
const path=require('path');
//public folder
route.use(express.static('../public'));
//set the storage engine
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb){
      cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });

var upload = multer({ storage: storage });






function checkLoggedIn(req, res, next) {
    if (req.user) {
        if(req.user.usertype=='vendor')
        {
        console.log(req.user);
        console.log("req.user "+req.user.username)
        return next()
        }
    }
    res.redirect('/login')
  }



//add a product to database
route.post('/addaproduct',upload.single("prod_image") ,(req, res) => {
    console.log(req.file);
    console.log(req.file.filename)
    products.create({
        id: req.body.id,
        name: req.body.name,
        type: req.body.type,
        subtype: req.body.subtype,
        price: req.body.price,
        manufacturer: req.body.manufacturer,
        image: req.file.filename,
        stock: req.body.stock,
        vendor: req.user.username,
        description:req.body.description,
    }).then(allproducts=>{
        res.send(allproducts)
    })
})



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
// route.post('/delete', (req, res) => {
//     carts.destroy({ where: { productname: req.body.productname } }).then(cart.findAll().then((allproducts) => { res.send(allproducts) }))
// })

//delete from vendor list
route.post('/delete', (req, res) => {
    products.destroy({ where: { name: req.body.name } }).then(products.findAll().then((allproducts) => {// res.send(allproducts) 
    res.redirect('/vendor/productdetailspage')}))
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

//get the quantity of a product
route.post('/stockstatus',(req,res)=>{
    console.log(req.body.name)
   const product_name =req.body.name
   products.findOne({where:{name :product_name}}).then((data)=>{
       console.log(data.dataValues)
       res.json(data.dataValues)
   })
    // res.send("hello")
})

//update the stock of a product
route.post('/updatestock',(req,res)=>{
    products.update({stock:req.body.stock,price:req.body.price,description:req.body.description},{where:{name:req.body.productname}}).then(()=>{
        res.send('done')
    })
})

//update the cost and description
route.post('/updatecostanddescription',(req,res)=>{
    products.findOne({where:{name:req.body.name}}).then((products)=>{
        res.send(products);
    })
})

//order list to the admin
route.get('/orderlist',(req,res)=>{
    orders.findAll().then((allorders)=>{
        res.send(allorders);
    })
})

//change the status of an order from pending to delivered or shipping
route.post('/orderlist',(req,res)=>{
    orders.update({status:req.body.status},{where:{productname:req.body.productname}}).then(()=>{
        res.sendStatus(200);
    })
})












//homepage for the vendor
route.get('/',checkLoggedIn,(req,res)=>{
    res.render('vendorhome')
})

//add a product page
route.get('/productpage',checkLoggedIn,(req,res)=>{
    res.render('vendorproductpage')
})

//updatestock page
route.get('/updatestockpage',checkLoggedIn,(req,res)=>{
    res.render('vendorstockpage')
})

//product details
route.get('/productdetailspage',checkLoggedIn,(req,res)=>{
    res.render('vendorproductdetails')
})

//get all orders
route.get('/orderspage',checkLoggedIn,(req,res)=>{
    res.render('vendororders')
})



module.exports = route
