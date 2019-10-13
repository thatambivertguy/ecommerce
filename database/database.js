const sequelize=require('sequelize');

const db=new sequelize({
    dialect:'sqlite',
    storage:'shop.db',
})


const users=db.define('users',{
    id:{
        type:sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    username:{
        type:sequelize.STRING,
        allowNull:false,
    },
    password:{
        type:sequelize.STRING,
    },
    phone:{
        type:sequelize.STRING,
        
    },
    googletoken:{
        type:sequelize.STRING,
    },
    facebooktoken:{
        type:sequelize.STRING,
    },
    usertype:{
        type:sequelize.STRING,
    }
})


const products=db.define('products',{
    id:{
        type:sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
    },
    name:{
        type:sequelize.STRING,
        allowNull:false,
    },
    type:{
        type:sequelize.STRING,
        allowNull:false,
    },
    subtype:{
        type:sequelize.STRING,
        allowNull:false,
    },
    price:{
        type:sequelize.INTEGER,
        allowNull:false,
    },
    manufacturer:{
        type:sequelize.STRING,
        allowNull:false,
    },
    image:{
        type:sequelize.STRING,
    },
    stock:{
        type:sequelize.INTEGER,
    },
    vendor:{
        type:sequelize.STRING,
    },
    description:{
        type:sequelize.STRING,
    }
    

})

const carts=db.define('carts',{
    productname:{
        type:sequelize.STRING,
    },
    productid:{
        type:sequelize.INTEGER,
    },
    username:{
        type:sequelize.STRING,
    },
    price:{
        type:sequelize.INTEGER,
    },
    quantity:{
        type:sequelize.INTEGER,
    },
    vendor:{
        type:sequelize.STRING,
    },
    image:{
        type :sequelize.STRING,
    },
    
})

const orders=db.define('orders',{
    id:{
        type:sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    time:{
        type:sequelize.STRING,
    },
    status:{
        type:sequelize.STRING,
    },
    paymentmethod:{
        type:sequelize.STRING,
    },
    productname:{
        type:sequelize.STRING,
    },
    productid:{
        type:sequelize.INTEGER,
    },
    username:{
        type:sequelize.STRING,
    },
    price:{
        type:sequelize.INTEGER,
    },
    quantity:{
        type:sequelize.INTEGER,
    },
    vendor:{
        type:sequelize.STRING,
    }

    



})

const wishlist=db.define('wishlist',{
    productname:{
        type:sequelize.STRING,
    },
    productid:{
        type:sequelize.INTEGER,
    },
    username:{
        type:sequelize.STRING,
    },
    price:{
        type:sequelize.INTEGER,
    },
    quantity:{
        type:sequelize.INTEGER,
    },
    vendor:{
        type:sequelize.STRING,
    },
    image:{
        type:sequelize.STRING,
    },

})

db.sync().then(()=>{
    console.log('shop.db created');
})

module.exports={
    db,users,products,carts,orders,wishlist
}