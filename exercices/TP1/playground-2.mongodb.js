// Créer une bdd hospital qui se compose d'une collection patient en utilisant un SGBD noSQL mongoDB
use("hospital");


// Insérer 3 dossiers patients avec au moins 1 historique par patient
// db.patients.insertMany([
//     {
//         "id" : 1,
//         "firstname" : "Angele",
//         "lastname" : "Devos",
//         "age" : 37,
//         "history" : [
//             {
//                 "desease" : "rhume",
//                 "treatment" : "paracetamol"
//             },
//             {
//                 "desease" : "angine",
//                 "treatment" : "antibiotique"
//             }
//         ]
//     },
//     {
//         "id" : 2,
//         "firstname" : "Solange",
//         "lastname" : "Desain",
//         "age" : 22,
//         "history" : [
//             {
//                 "desease" : "bronchite",
//                 "treatment" : "antibio"
//             }
//         ]
//     },
//     {
//         "id" : 3,
//         "firstname" : "Francine",
//         "lastname" : "Lemoine",
//         "age" : 77,
//         "history" : [
//             {
//                 "desease" : "covid",
//                 "treatment" : "paracetamol"
//             },
//             {
//                 "desease" : "arthrose",
//                 "treatment" : "anti-inflammatoire"
//             }
//         ]
//     }
// ]);


// Mettre à jour les données d'un patient avec un nouvel âge, un nouveau nom et un nouvel historique medical
// db.patients.updateOne({id:3}, {$set: {
//     "age" : 78, 
//     "lastname" : "Gemoine", 
//     "history" : [
//             {
//                 "desease" : "covid-19",
//                 "treatment" : "paracetamol"
//             },
//             {
//                 "desease" : "arthrite",
//                 "treatment" : "anti-inflammatoire"
//             }
//         ]}});


// Trouver tous les patients qui ont un âge suppérieur à 29 ans
// db.patients.find({"age": {$gt : 29}})


// Supprimer tous les patients qui ont attrapé un rhume comme maladie
// db.patients.deleteMany({"history.desease" : "rhume"})
db.patients.find()