const express = require('express')
const app=express()
const userrouter=require('./routes/user').route
const vendorrouter=require('./routes/vendor').route
const adminrouter=require('./routes/admin').route
const {db,users,products,cart,wishlist,order}=require('./db')

app.use(express.json())
app.use(express.urlencoded(({extended:true})))

app.set('view engine','hbs')

app.use('/user',userrouter)
app.use('/vendor',vendorrouter)
app.use('/admin',adminrouter)


db.sync().then(()=>{
    app.listen(3000,()=>{
        console.log("Server started at :  http://localhost:3000")
    })
})
