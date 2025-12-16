// En vous basant sur le fichier json : users.json, et mongo shell, effectuer les
// requêtes suivantes :

// 1 -   Créer un élément
// Ajouter l'utilisateur dans la collection users:
// ● Chuck Norris
// ● 77 ans
// ● hobbies : ["Karate", "Kung-fu", "Ruling the world"]

use("tp2")
// db.users.find()
// db.users.insertOne(
//     {
//         "name" : "Chuck Norris",
//         "age" : 77,
//         "hobbies" : [
//             "Karate", 
//             "Kung-fu", 
//             "Ruling the world"
//         ]
//     }
// )

// 2 - Lecture d'un élément
// ● Afficher Chuck Norris (si il le permet).
//db.users.find({"name" : "Chuck Norris"})

// ● Afficher Chuck sans le champs _id.
//db.users.find({"name": "Chuck Norris"}, {"_id": 0})

// ● Afficher les utilisateurs qui ont entre 20 et 25 ans.
//db.users.find({$and : [{"age" : {$gte : 20}}, {"age" : {$lte : 25}}]})


// ● Afficher uniquement les hommes entre 30 et 40 ans.
//db.users.find({$and : [{"gender" : "male"}, {"age" : {$gte : 20}}, {"age" : {$lte : 25}}]})

// ● Afficher les utilisateurs habitant l'état de Louisianne (Louisiana)
//db.users.find({"address.state" : "Louisiana"})

// ● Afficher les 20 premiers utilisateurs triés par ordre décroissant d'age.
//db.users.find({"address.state": "Louisiana"}).sort({"age": -1}).limit(20)

// ● Combien y'a-t-il de femmes agées de 30 ans?
//db.users.countDocuments({$and : [{"gender" : "female"}, {"age" : 30}]})


// 3 - Modifier/Supprimer un élément
// ● Nos juristes nous ont dit que nous ne pouvions plus garder les numéro de
// téléphones de nos utilisateurs : supprimer le champ phone de tous les
// enregistrements.
//db.users.updateMany({},{ $unset: { "phone": "" }})

// ● Chuck Norris est venu nous dire que le temps ne marquait pas Chuck Norris,
// mais que Chuck Norris marquait le temps : changer l'age de Chuck Norris à
// infinity
//db.users.updateOne({"name" : "Chuck Norris"}, {$set : {"age" : "infinity"}})

// ● Ajoutons un hobby à tous nos utilisateurs de plus de 50 ans : jardinage
db.users.updateMany({ "age": { $gt: 50 } },{ $push: { "hobbies": "jardinage" }})