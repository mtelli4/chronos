function heureComp(heure1, heure2) {
    // Convertir les chaînes d'heure en objets Date
    const date1 = new Date('1970-01-01T' + heure1.replace("h", ":") + 'Z');
    const date2 = new Date('1970-01-01T' + heure2.replace("h", ":") + 'Z');

    // Comparer les heures
    return date1 <= date2;
}

// Renvoie l'heure la plus tot et l'heure la plus tard d'une semaine
export function trouverHeuresExtremes(semaine) {
    // Initialiser les heures extrêmes
    let heureDebutPlusTot = '23h59';
    let heureFinPlusTard = '00h00';
    let dureeFinPlusTard = 0;

    // Parcourir les jours de la semaine
    semaine.forEach(jour => {
        // Parcourir les cours de chaque jour
        jour.classes.forEach(cours => {
            // Convertir les heures au format "8h15" en minutes
            const dureeFin = cours.duration;
            const heureActuelle = cours.startHour;
            // Mettre à jour l'heure de début la plus tôt
            if (heureComp(heureActuelle, heureDebutPlusTot)) {
                console.log("plustot");
                heureDebutPlusTot = heureActuelle;
            }
            
            console.log("-------------");
            console.log({heureActuelle});
            console.log(ajouterDuree(heureFinPlusTard, dureeFinPlusTard));
            console.log(ajouterDuree(heureActuelle, dureeFin));
            console.log({heureFinPlusTard});
            console.log(dureeFinPlusTard);
            // Mettre à jour l'heure de fin la plus tard
            if (heureComp(ajouterDuree(heureFinPlusTard, dureeFinPlusTard), ajouterDuree(heureActuelle, dureeFin))) {
                console.log("plustard");
                heureFinPlusTard = heureActuelle;
                dureeFinPlusTard = dureeFin;
            }
        });
    });

    return {
        heureDebutPlusTot,
        heureFinPlusTard,
        dureeFinPlusTard
    };
}

// Renvoie une liste des jours de la semaine présent dans l'obj en param
export function createDaysLst(schedule) {
    // Vérifiez si l'argument passé est un tableau et s'il n'est pas vide
    if (!Array.isArray(schedule) || schedule.length === 0) {
        return [];
    }

    // Utilisez la méthode map pour extraire les jours de chaque élément du tableau
    const daysList = schedule.map(day => day.day);

    return daysList;
};

// Ajoute la durée à l'heure et arrondis à l'heure pile supérieure
function ajouterDuree(heureString, dureeEnHeures) {
    // Convertir la chaîne d'heure en objet Date
    let heureFormat;
    if (heureString.split("h")[1] != "00") {
        heureFormat = (parseInt(heureString.split("h")[0]) + dureeEnHeures + 1).toString() + "h00";
    } else {
        heureFormat = (parseInt(heureString.split("h")[0]) + dureeEnHeures).toString() + "h" + heureString.split("h")[1];
    }

    if (heureFormat.split("h")[0].length == 1) {
        heureFormat = "0" + heureFormat;
    }

    return heureFormat;
}


export function createHoursLst(heure1, heure2, duree) {
    const heures = [heure1];
    let heureActuelle = heure1;

    let heureFinale = ajouterDuree(heure2, duree);
    let heureEnMinutes;
    while (heureActuelle.split("h")[0] !== heureFinale.split("h")[0]) {
        console.log(heureFinale);
        console.log(heureActuelle);
        // Convertir l'heure actuelle au format "8h00" en minutes
        const [heure, minute] = heureActuelle.split('h').map(Number);
        heureEnMinutes = heure * 60 + minute;

        // Ajouter une heure à l'heure actuelle
        heureEnMinutes += 60;

        // Convertir l'heure en format "8h00"
        const nouvelleHeure = Math.floor(heureEnMinutes / 60).toString().padStart(2, '0') +
            'h' +
            (heureEnMinutes % 60).toString().padStart(2, '0');

        const nouvelleHeure2 = (parseInt(heureActuelle.split("h")[0]) + 1).toString() + "h" + heureActuelle.split("h")[1];

        // Ajouter l'heure à la liste
        heures.push(nouvelleHeure);

        // Mettre à jour l'heure actuelle
        heureActuelle = nouvelleHeure;
    }

    console.log(heures);
    return heures;
};