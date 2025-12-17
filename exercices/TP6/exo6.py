from pymongo import MongoClient
from datetime import datetime


if __name__ == "__main__":

    uri = "mongodb://admin:password@localhost:27017/?authSource=admin"
    client = MongoClient(uri)

    db = client["tp6"]

    collection = db["etudiants"]

    # Affichez le premier document de la collection
    user1 = collection.find_one()
    print(user1)

    
    #Comptez le nombre total d'étudiants
    compteur = 0
    for student in collection.find() :
        compteur += 1
    #print(f"Il y a {compteur} étudiants !")

    print(collection.count_documents({}))



    #Trouvez et affichez l'étudiant nommé "Aurelia Menendez".
    student = collection.find_one({"name": "Aurelia Menendez"})

    if student:
        print("Étudiant trouvé :")
        print(student)
    else:
        print("Aucun étudiant trouvé avec ce nom.")


    #Trouvez l'étudiant avec _id = 50
    student_id = collection.find_one({"_id": 50})

    if student_id:
        print("Étudiant trouvé :")
        print(student_id)
    else:
        print("Aucun étudiant trouvé avec cet id.")


    #Trouvez tous les étudiants qui n'ont pas de nom (name vide)
    query = {"name": {"$in": ["", None]}}
    name_empty = list(collection.find(query))
    print(name_empty)


    #Affichez uniquement les noms des 10 premiers étudiants (sans les _id)
    projection = {"_id": 0}
    ten_students = collection.find({}, projection).limit(10)

    for student in ten_students:
        print(student)


    #Affichez les 5 premiers étudiants triés par ordre alphabétique
    five_students = collection.find().limit(5).sort("name", 1)

    for student in five_students:
        print(student)


    #Pour l'étudiant avec _id = 0, extrayez et affichez sa note d'examen
    # Un seul bloc de recherche
    student_id = 0
    student = collection.find_one({"_id": student_id})

    if student:
        for s in student["scores"]:
            if s["type"] == "exam":
                print(f"La note d'examen de l'étudiant {student_id} est : {round(s['score'],2)}")
                break 
    else:
        print(f"Étudiant avec _id {student_id} non trouvé.")


    #Calculez la moyenne des 3 notes de l'étudiant avec_id = 1
    student = collection.find_one({"_id": 1})

    if student:
        all_scores = [s["score"] for s in student["scores"]]

        if all_scores:
            moyenne = sum(all_scores) / len(all_scores)
            print(f"Moyenne de l'étudiant {student['name']} : {round(moyenne, 2)}")
    else:
        print("Étudiant avec _id 1 non trouvé.")


    #Utilisez $unwind pour déplier le tableau scores et afficher les 5 premiers résultats
    pipeline = [
    {"$unwind": "$scores"},
    {"$limit": 5}
    ]

    results = collection.aggregate(pipeline)

    for doc in results:
        nom = doc.get("name", "Inconnu")
        score_info = doc["scores"] 
        print(f"Nom: {nom} | Type: {score_info['type']} | Note: {round(score_info['score'],2)}")


    #Calculez la moyenne générale de chaque étudiant et affichez le top 10
    pipeline = [
    {
        "$project": {
            "_id": 0,
            "name": 1,
            "moyenne_generale": {"$avg": "$scores.score"}
        }
    },
    {"$sort": {"moyenne_generale": -1}},
    {"$limit": 10}
    ]

    top_10 = collection.aggregate(pipeline)

    for i, student in enumerate(top_10, 1):
        nom = student.get("name", "Inconnu")
        moyenne = student.get("moyenne_generale", 0)
        print(f"{i}. {nom} - Moyenne: {round(moyenne, 2)}")


    #Calculez la moyenne de tous les étudiants pour chaque type d'évaluation (exam, quiz, homework)
    pipeline = [
    {"$unwind": "$scores"},
    {"$group": {
        "_id": "$scores.type",
        "moyenne_classe": {"$avg": "$scores.score"}
    }},
    {"$sort": { "_id": 1 }}
    ]

    resultats = collection.aggregate(pipeline)

    print("--- MOYENNES PAR TYPE D'ÉVALUATION ---")
    for res in resultats:
        print(f"Type: {res['_id']:10} | Moyenne: {round(res['moyenne_classe'], 2)}")

    
    #Pour chaque type d'évaluation, trouvez qui a eu la meilleure note
    pipeline = [
    {"$unwind": "$scores"},
    {"$sort": {"scores.score": -1}},
    {"$group": {
        "_id": "$scores.type",
        "meilleure_note": {"$first": "$scores.score"},
        "nom_etudiant": {"$first": "$name"} 
    }},
    
    {"$sort": {"_id": 1}}
    ]

    records = collection.aggregate(pipeline)

    print("--- MAJORS PAR TYPE D'ÉVALUATION ---")
    for rec in records:
        print(f"Type: {rec['_id']:10} | Note: {round(rec['meilleure_note'], 2):5} | Étudiant: {rec['nom_etudiant']}")

    
    # Pour chaque étudiant, calculez le minimum, maximum et moyenne de ses notes
    pipeline = [
    {
        "$project": {
            "_id": 0,
            "name": 1,
            "stats": {
                "minimum": { "$min": "$scores.score" },
                "maximum": { "$max": "$scores.score" },
                "moyenne": { "$avg": "$scores.score" }
            }
        }
    },
    ]

    resultats = collection.aggregate(pipeline)

    for res in resultats:
        nom = res.get("name", "")
        s = res.get("stats", {})
        print(f"{nom[:20]:<20} | {s['minimum']:<6.2f} | {s['maximum']:<6.2f} | {s['moyenne']:<6.2f}")

    
    # Comptez combien d'étudiants ont une moyenne générale supérieure à 70
    pipeline = [
    {
        "$project": 
        {"moyenne": { "$avg": "$scores.score" }}
    },
    {
        "$match": { "moyenne": { "$gt": 70 } }
    },
    {
        "$count": "total_etudiants_reussite"
    }
    ]

    resultat = list(collection.aggregate(pipeline))

    if resultat:
        nombre = resultat[0]["total_etudiants_reussite"]
        print(f"Nombre d'étudiants ayant une moyenne > 70 : {nombre}")
    else:
        print("Aucun étudiant n'a une moyenne supérieure à 70.")


    # Ajoutez un champ moyenne à tous les documents contenant la moyenne des 3 notes
    result = collection.update_many(
        {}, # Filtre vide pour cibler tous les documents
        [
            {
                "$set": {
                    "moyenne": { "$avg": "$scores.score" }
                }}])
    print(f"Nombre de documents mis à jour : {result.modified_count}")


    # Ajoutez un champ niveau selon la moyenne : Excellent(≥80),Bien(≥60), Passable(≥40), Insuffisant(<40)
    result = collection.update_many(
        {}, # pour cibler tout le monde
        [{"$set": {
            "niveau": {
                "$switch": {
                    "branches": [
                        { "case": { "$gte": ["$moyenne", 80] }, "then": "Excellent" },
                        { "case": { "$gte": ["$moyenne", 60] }, "then": "Bien" },
                        { "case": { "$gte": ["$moyenne", 40] }, "then": "Passable" }
                    ],
                    "default": "Insuffisant"
                }}}}])

    print(f"Mise à jour terminée. {result.modified_count} étudiants ont reçu un niveau.")