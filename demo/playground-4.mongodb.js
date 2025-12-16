use("livre")

// db.books.find()
// db.books.find().limit(5)
// db.books.find({"authors":{$size:2}})
// db.books.countDocuments({"authors":{$size:2}})
// db.books.find({pageCount : {$gte : 400}}).count()
// db.books.find({_id : {$in : [55,75]}})


// titre : 1 = trier par ordre alphabétique croissant
// _id : -1 trier par id ordre décroissant
//db.books.find({authors : {$size : 2}}).sort({title : 1, _id : -1})


// il faut que l'id soit strictement supérieur à 25 et strictement inférieur à 28
//db.books.find({$and : [{_id : {$gt : 25}}, {_id : {$lt : 28}}]})

//db.books.find( {_id: { $gt: 25 }}, {_id: 1, authors:1});

//db.books.find({_id: {$lte:5}},{authors: {$slice: 1}},{title:1});

//db.books.find({$or: [{_id: 19}, {_id:98745}]});

//db.books.find({longDescription: {$regex: 'Distributed', $options: "i"}});