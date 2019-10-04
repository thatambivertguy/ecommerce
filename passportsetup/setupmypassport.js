const passport=require('passport')
const localstrategy=require('passport-local').Strategy
const { db, users, products, carts, orders, wishlist } = require('./../database/database');
passport.use(
    new localstrategy((username,password,done)=>{
        users.findOne({
            where:{
                username,
            },
        }).then((user)=>{
            if(!user)
            return done(new Error('invalid username'))

            if(user.password!=password)
            return done(null,false)

            return done(null,user)
        })
        .catch(done)
    })
)

passport.serializeUser((user,done)=>{
    done(null,user.id)
})

passport.deserializeUser((userid,done)=>{
    users.findOne({
        where:{
            id:userid
        }
    }).then((user)=>{done(null,user)})
        .catch(done)
})


module.exports={passport}

