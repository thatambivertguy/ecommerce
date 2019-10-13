const express = require('express');
const app = express();
const { db, users, products, carts, orders, wishlist } = require('./database/database');
const session=require('express-session')

const {passport}=require('./passportsetup/setupmypassport');
const userroute = require('./routes/user');
const vendorroute=require('./routes/vendor');

app.set('view engine','hbs');
app.use(express.json())
app.use(express.urlencoded(({ extended: true })))
app.use(session({
    secret:'abcd efgh ijkl',
    resave:false,
    saveUninitialized:true,
    cookie:{
        maxAge:1000*60*60*60,
    }
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(express.static('/public'))
app.use('/',express.static(__dirname+'/public'))


app.get('/',function(req,res){
    res.render('userhome');
})


app.use('/user', userroute);
app.use('/vendor',vendorroute);




















//login page
app.get('/login',(req,res)=>{
    res.render('login')
})


//authenitcate the person
app.post('/login',passport.authenticate('local',{failureRedirect:'/login'}),function(req,res){
    console.log(req.user)
    if(req.user.usertype=='user')
    res.redirect('/user');
    else 
    {
        res.redirect('/vendor');
    }
})

//facebook signin
app.get('/login/fb', passport.authenticate('facebook'))
app.get('/login/fb/callback', passport.authenticate('facebook', {
  successRedirect: '/user',
  failureRedirect: '/login'
}))

//google signin
app.get('/login/google', passport.authenticate('google',{ scope:
    [ 'email', 'profile' ] }
    ))
  
  app.get('/login/google/callback', passport.authenticate('google', {
    successRedirect: '/user',
    failureRedirect: '/login'
  }))

//signup
app.post('/signup',(req,res)=>{
    users.create(
        {
            username:req.body.username,
            password:req.body.password,
            usertype:req.body.usertype,
            // phone:req.body.phone
        })
        .then((user)=>{
           // console.log(user)
            res.redirect('/login')
        })
        .catch((err)=>{
            console.log(err)
            res.redirect('/signup')
        })
})


//signup page
app.get('/signup',(req,res)=>{
    res.render('signup')
})






app.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('/user/')
})



app.listen(4000, () => {
    console.log("http://localhost:4000");
})