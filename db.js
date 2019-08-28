const sequelize=require('sequelize')

const db=new sequelize({
    dialect:'sqlite',
    storage:'ecommerce.db'
})

const products=db.define('products',{
    id:{
        type:sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    name:{
        type:sequelize.STRING,
        allowNull:false,
    },
    manufacturer:{
        type:sequelize.STRING,
    },
    price:{
        type:sequelize.FLOAT,
        allowNull:false,
        defaultValue:0.0,
    },
    type:{
        type:sequelize.STRING
    },
    subtype:{
        type:sequelize.STRING
    },
    vendor:{
        type:sequelize.STRING
    },
    image:{
        type:sequelize.STRING
    },
    quantity:{
        type:sequelize.INTEGER
    },
    


})


const users=db.define('users',{
    id:{
        type:sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
        
    usertype:{
        type:sequelize.STRING,
        allowNull:false,
    },
    username:{
        type:sequelize.STRING,
        allowNull:false,
    },
        
    email:{
        type:sequelize.STRING,
        allowNull:true,
    },
        
    password:{
        type:sequelize.STRING,
        allowNull:false,
    },
        
    gtoken:{
        type:sequelize.STRING,
        allowNull:true,
    },
    fbtoken:{
        type:sequelize.STRING,
        allowNull:true,
    },
    secques:{
        type:sequelize.STRING,
        allowNull:true,
    },

})


const cart=db.define('cart',{
    user:{
        type:sequelize.STRING
    },
    prodname:{
         type:sequelize.STRING,
    },
    prodid:{
        type:sequelize.STRING,
    },
    price:{
        type:sequelize.FLOAT,
        allowNull:false,
        defaultValue:0.0,
    },
    vendor:{
        type:sequelize.STRING
    },
    Image:{
        type:sequelize.STRING
    },
    quantity:{
        type:sequelize.FLOAT,
        allowNull:false,
        defaultValue:1,
    },

})

const wishlist=db.define('wishlist',{
    username:{
        type:sequelize.STRING
    },
    prodname:{
         type:sequelize.STRING,
    },
    prodid:{
        type:sequelize.STRING,
    },
    price:{
        type:sequelize.FLOAT,
        allowNull:false,
        defaultValue:0.0,
    },
    vendor:{
        type:sequelize.STRING
    },
    Image:{
        type:sequelize.STRING
    },
    quantity:{
        type:sequelize.FLOAT,
        allowNull:false,
        defaultValue:1,
    },

})

const order=db.define('orders',{
    username:{
        type:sequelize.STRING
    },
    prodname:{
         type:sequelize.STRING,
    },
    prodid:{
        type:sequelize.STRING,
    },
    price:{
        type:sequelize.FLOAT,
        allowNull:false,
        defaultValue:0.0,
    },
    vendor:{
        type:sequelize.STRING
    },
    Image:{
        type:sequelize.STRING
    },
    quantity:{
        type:sequelize.FLOAT,
        allowNull:false,
        defaultValue:1,
    },
    orderid:{
        type:sequelize.STRING,
    },
    ordertime:{
        type:sequelize.STRING,
    },
    orderstatus:{
        type:sequelize.STRING,
    },
    payment:{
        type:sequelize.STRING,
    }


})



module.exports={
    db,users,products,cart,wishlist,order
}