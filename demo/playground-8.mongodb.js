use("restaurants")
//db.restau.find().limit(5)
// db.restau.find({outcode : "W6"})
// db.restau.find({postcode : {$not : {$eq : "8NX"}}})

// va fonctionner comme un find de rating : 5
//db.restau.aggregate([{$match : {rating : 5}}])

// va compter combien de restaurants ont un rating : 5
//db.restau.aggregate([{$match : {rating : 5}}, {$count : "comptage"}])

// Trouve tous les restaurants qui ont une note de 5, et affiche uniquement leur nom et leur URL (en plus de l'identifiant par défaut).
// db.restau.aggregate([{$match : {rating : 5}}, {$project : {URL : 1, name : 1}}])

// Regroupe tous les restaurants par type de cuisine (italien, chinois, etc.) et compte combien il y en a dans chaque catégorie.
// db.restau.aggregate([{$group : {_id : "$type_of_food", count : {$sum : 1}}}])

// Regroupe les restaurants par type de cuisine et compte-les, mais n'affiche que les catégories qui contiennent plus de 10 restaurants.
//db.restau.aggregate([{$group : {_id : "$type_of_food", count : {$sum : 1}}}, {$match : {count : {$gt : 10}}}])

// idem que précédent mais rangé par ordre décroissant
//db.restau.aggregate([{$group : {_id : "$type_of_food", count : {$sum : 1}}}, {$match : {count : {$gt : 10}}}, {$sort : {count : -1}}])

//db.restau.aggregate([{$group : {_id : "$postcode", nombre_de_restaurants : {$sum : 1}}}])

//db.restau.aggregate([{$match: {type_of_food: "Thai", rating: {$gt: 4}}}]);

// Trouve les restaurants qui ont une note de 6, affiche uniquement leur nom, leur type de cuisine et leur note (en cachant l'ID), et arrête-toi après avoir trouvé les 3 premiers.
//db.restau.aggregate([{$match : {rating : 6}}, {$project : {_id : 0, name : 1, type_of_food : 1, rating : 1}}, {$limit : 3}])

//db.restau.aggregate([{$match : {type_of_food : "Caribbean"}}, {$count : "no_of_restaurants_with_caribbean_food"}])

//db.restau.aggregate([{$group: {_id: "$type_of_food", note_moyenne: {$avg: "$rating"}}}, {$sort: {note_moyenne: -1}}]);

//Calcule les statistiques de notes (somme, moyenne, maximum et minimum) pour chaque type de cuisine, en ignorant les restaurants qui n'ont pas encore été notés.
//db.restau.aggregate([{$match : {rating : {$ne : "Not yet rated"}}}, {$group : {_id : "$type_of_food", 
    // total_rating : {$sum : "$rating"} , 
    // avg_rating : {$avg : "$rating"}, 
    // max_rating : {$max : "$rating"},
    // min_rating : {$min : "$rating"}}}