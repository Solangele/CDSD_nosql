use("restau")
//db.resto.find()

// 1. Afficher la liste des restaurants mais limitez l’affichage à 10.
db.resto.find().limit(10)

// 2. Afficher la liste des 10 premiers restaurants mais en trier cette liste par ordre
// alphabétique.
db.resto.aggregate([{$limit : 10},{$sort : {name : 1}}])

// 3. Afficher la liste des 10 premiers restaurants mais en tri, mais uniquement ceux sur
// “Brooklyn” (champs : borough), et cette liste par ordre alphabétique.
db.resto.aggregate([{$match : {borough : "Brooklyn"}},{$limit : 10}, {$sort : {name : 1}}])


// 4. Afficher la liste des 10 premiers restaurants mais on affiche que le nom du restaurant
// et son quartier.
db.resto.aggregate([{$limit : 10}, {$project: {
  "name" : 1,
  "borough" : 1
}}])

// 5. Afficher la liste des 10 premiers restaurants mais on affiche tout sauf adresse et le
// grade.
db.resto.aggregate([{$limit : 10}, {$project: {
  "address" : 0,
  "borough" : 0,
  "grade" : 0
}}])

// 6. Afficher la liste des 10 premiers restaurants avec un nouveau champ qui va afficher
// le nombre d’avis (grades) par restaurant.
db.resto.aggregate([
    { $limit : 10 },
    { $project : {
        name: 1,
        borough: 1,
        nombre_avis: { $size: "$grades" }
    }}
])

// 7. Afficher la liste des 10 premiers  restaurants avec un nouveau champ qui va afficher
// le nombre d’avis (grades) par restaurant et il faudra faire le tri par le nombre d’avis.
db.resto.aggregate([
    { $limit : 10 },
    { $project : {
        name: 1,
        borough: 1,
        nombre_avis: { $size: "$grades" }
    }},
    {$sort : {nombre_avis : -1}}
])

// 8. On souhaite toujours afficher la liste des 10 premiers restaurants en affichant le nom
// du restaurant en majuscule et le quartier du restaurant.
db.resto.aggregate([
    { $limit : 10 },
    { $project : {
        _id: 0,                          
        name: { $toUpper: "$name" },     
        borough: 1                        
    }}
])

// 9. On souhaite toujours afficher la liste des 10 premiers restaurants en affichant le nom
// du restaurant en majuscule et les 3 premières lettres du quartier.
db.resto.aggregate([
    { $limit : 10 },
    { $project : {
        _id: 0,
        name: { $toUpper: "$name" },
        quartier_court: { $substrCP: ["$borough", 0, 3] }
    }}
])

// 10. On souhaite avoir le nombre total de restaurants toujours avec agrégation.
db.resto.aggregate({$count : "total_restaurants"})


