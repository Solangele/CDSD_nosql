// Créer une nouvelle base de données nommée info et vérifiez qu'elle est
// sélectionnée.
use("info")
// b. Créer une nouvelle collection nommée produits et y insérer le document suivant
//db.createCollection("produits")
// db.produits.insertMany([
//     {
//         id : 1,
//         "nom" : "Macbook Pro",
//         "fabriquant" : "Apple",
//         "prix" : 11435.99,
//         "options" : [
//             "Intel Core i5", 
//             "Retina Display", 
//             "Long life battery"
//         ]
//     },
//     {
//         id : 2,
//         "nom" : "Macbook Air",
//         "fabriquant" : "Apple",
//         "prix" : 125794.73,
//         "ultrabook" : "true",
//         "options" : [
//             "Intel Core i7", 
//             "SSD", 
//             "Long life battery"
//         ]
//     },
//     {
//         id : 3,
//         "nom" : "Thinkpad X230",
//         "fabriquant" : "Lenovo",
//         "prix" : 114358.74,
//         "ultrabook" : "true",
//         "options" : [
//             "Intel Core i5", 
//             "SSD", 
//             "Long life battery"
//         ]
//     }
// ])

// A. Récupérer tous les produits
//db.produits.find()

// B.- Récupérer le premier produit
//db.produits.find().limit(1)

// C.- Trouver l’id du Thinkpad et faites la requête pour récupérer ce produit avec son id.
//db.produits.find({nom : "Thinkpad X230"}, {_id : 1})

// D.- Récupérer les produits dont le prix est supérieur à 13723 DA
//db.produits.find({prix : {$gte : 13723}})

// E.- Récupérer le premier produit ayant le champ ultrabook à true
//db.produits.findOne({"ultrabook" : "true"})

// F.- Récupérer le premier produit dont le nom contient Macbook
//db.produits.findOne({"nom" : {$regex : "Macbook", $options : "i"}})

// G.- Récupérer les produits dont le nom commence par Macbook
//db.produits.find({"nom" : {$regex : "^Macbook", $options : "i"}})

// H.- Supprimer les deux produits dont le fabricant est Apple.
//db.produits.deleteMany({fabriquant : "Apple"})

// I.- Supprimer le Lenovo X230 en utilisant uniquement son id
// db.produits.deleteOne({_id: ObjectId("6940340bda87621915e7aaf9")})