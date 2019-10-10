const passport=require('passport')
const localstrategy=require('passport-local').Strategy
const Facebookstrategy=require('passport-facebook')
const googlestrategy=require('passport-google-oauth2')
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
//facebook login strategy
passport.use(
    new Facebookstrategy(
      {
        clientID: 'facebookclientid',
        clientSecret: 'facebookclientsecret',
        callbackURL: 'http://localhost:4000/login/fb/callback',
      },
      (accessToken, refreshToken, profile, done) => {

        users.findOrCreate({where : {username : profile.id},
          defaults :
          {
            username : profile.id,
            facebooktoken: accessToken,
          
        }
        })
          .then((user,created) => {
            done(null, user[0])
          })
          .catch(done)
      },
    ),
  )
//google login strategy
  passport.use(
    new googlestrategy(
      {
        clientID: 'googleclientid',
        clientSecret: 'googleclientsecret',
        callbackURL: 'http://localhost:4000/login/google/callback',
      },
      (accessToken, refreshToken, profile, done) => {
        user.findOrCreate({where : {username : profile.id},
          defaults :
          {
            username : profile.id,
            gAccessToken: accessToken,
          }
        })
          .then((user,created) => {
            done(null, user[0])
          })
          .catch(done)
      },
    ),
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

