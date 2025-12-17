use("tp5")
//db.sportif.find()
//db.gymnase.find()
// 1. Quels sont les sportifs (identifiant, nom et prénom) qui ont un
// âge entre 20 et 30 ans ?
// db.sportif.aggregate(
//     [{$match : 
//         {Age : {$gte : 20, $lte : 30}}
//     },
//     {$project : 
//         {_id : 0,
//         "IdSportif" : 1,
//         "Nom" : 1,
//         "Prenom" : 1}
//     }])


// 2. Quels sont les gymnases de ville “Villetaneuse” ou de
// “Sarcelles” qui ont une surface de plus de 400 m2 ?
// db.gymnase.aggregate([
//     {$match : { 
//         "Ville" : {$in : ["VILLETANEUSE", "SARCELLES"]}, 
//         "Surface" : {$gt : 400} 
//     }}
// ])


// 3. Quels sont les sportifs (identifiant et nom) qui pratiquent du
// handball ?
// db.sportif.aggregate(
//     [{$match : 
//         {"Sports.Jouer" : "Hand ball"}
//     },
//     {$project : 
//         {_id : 0,
//         "IdSportif" : 1,
//         "Nom" : 1}
//     }])


// 4. Quels sportifs (identifiant et nom) ne pratiquent aucun sport ?
db.sportif.aggregate(
    [{$match : 
        {"Sports.Jouer" : { $exists: false }}
    },
    {$project : 
        {_id : 0,
        "IdSportif" : 1,
        "Nom" : 1}
    }])


// 5. Quels gymnases n’ont pas de séances le dimanche ?
// db.gymnase.aggregate([
//     { 
//         $match : { 
//             "Seances.Jour": { $nin: ["dimanche", "Dimanche"] } 
//         } 
//     }
// ])

// 6. Quels gymnases ne proposent que des séances de basket
// ball ou de volley ball ?
// db.gymnase.aggregate([
//     {
//         $match: {
//             "Seances": {$exists: true, $not: {$size: 0}},
//             $expr: {
//                 $eq: [
//                     {$size: {$setDifference: ["$Seances.Libelle", ["Basket ball", "Volley ball"]]}},
//                     0
//                 ]
//             }
//         }
//     }
// ])

// 7. Quels sont les entraîneurs qui sont aussi joueurs ?
// db.sportif.aggregate(
//     [{$match : { 
//         "Sports.Jouer": {$exists: true, $not: {$size: 0}},
//         "Sports.Entrainer": {$exists: true, $not: {$size: 0}}
//         }}])

// // 8. Pour le sportif “Kervadec” quel est le nom de son conseiller ?
// db.sportif.aggregate([
//     {$match : {
//         "Nom" : "KERVADEC"
//     }},
//     { $lookup: {
//         from: "sportif",             
//         localField: "IdSportifConseiller",
//         foreignField: "IdSportif",   
//         as: "infos_conseiller"       
//     }},
//     { $project: {
//         _id: 0,
//         Nom_Sportif: "$Nom",
//         Nom_Conseiller: { $arrayElemAt: ["$infos_conseiller.Nom", 0] }
//     }}
// ])

// // 9. Quelle est la moyenne d’âge des sportives qui pratiquent du
// // basket ball ?
// db.sportif.aggregate([
//     {$match : {
//         "Sports.Jouer" : "Basket ball"
//     }},
//     { $group : { 
//         _id: null,                        
//         age_moyen: {$avg: "$Age"}        
//     }}
// ])

// 10.Quels entraîneurs n’entraînent que du hand ball ou du basket
// ball ?
// 11. Pour chaque sportif donner le nombre de sports qu’il arbitre ?