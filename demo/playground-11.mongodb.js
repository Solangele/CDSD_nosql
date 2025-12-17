use("oneTo");
// db.createCollection("users");
// db.createCollection("address");
// db.users.insertOne({name :"Clement", age: 45});
//db.users.find();
//db.address.insertOne({street: "10 Downing St", number: 15,city: "Halluin", user_id: ObjectId("694167037c7cd22d0bad1e53")})
//db.address.find();
use("oneTo");
db.users.aggregate({$lookup: {from: "address", localField: "_id", foreignField: "user_id", as: "user_address"}});


//use("many")
// use manyToMany
// db.createCollection("orders")
// db.createCollection("products")
// db.products.insertMany([{name : "Clavier", orders : []},{name : "souris",orders : []}])
// db.orders.insertMany([{company : "Apple", products : []},{compagny : "Sony", products : []}])
// db.orders.updateOne({_id : ObjectId("637e865a251d499fa4a82b11")}, {$push : {products : ObjectId("637e85df251d499fa4a82b0f")}})
// db.orders.updateOne({_id : ObjectId("637e865a251d499fa4a82b11")}, {$push : {products : ObjectId("637e85df251d499fa4a82b10")}})
// db.orders.updateOne({_id : ObjectId("637e865a251d499fa4a82b12")}, {$push : {products : ObjectId("637e85df251d499fa4a82b10")}})
// db.orders.updateOne({_id : ObjectId("637e865a251d499fa4a82b12")}, {$push : {products : ObjectId("637e85df251d499fa4a82b0f")}})
// db.products.update({_id : ObjectId("637e85df251d499fa4a82b0f")},{$push :{orders : ObjectId("637e865a251d499fa4a82b12")}})
// db.products.update({_id : ObjectId("637e85df251d499fa4a82b0f")},{$push :{orders : ObjectId("637e865a251d499fa4a82b11")}})
// db.products.update({_id : ObjectId("637e85df251d499fa4a82b10")},{$push :{orders : ObjectId("637e865a251d499fa4a82b12")} })
// db.products.update({_id : ObjectId("637e85df251d499fa4a82b10")},{$push :{orders : ObjectId("637e865a251d499fa4a82b11")} })
// db.products.aggregate({$lookup : {from: "orders",localField : "orders", foreignField : "_id", as: "orders"}})