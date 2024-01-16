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
                heureDebutPlusTot = heureActuelle;
            }
            
            // Mettre à jour l'heure de fin la plus tard
            if (heureComp(ajouterDuree(heureFinPlusTard, dureeFinPlusTard), ajouterDuree(heureActuelle, dureeFin))) {
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

// Ajoute la durée à l'heure et arrondis à l'heure pile supérieure si besoin
function ajouterDuree(heureString, dureeEnHeures) {
    // Convertir la chaîne d'heure en objet Date
    let heureFormat = heureString.replace("h", ":")
    const heureActuelle = new Date('1970-01-01T' + heureFormat + 'Z');

    // Ajouter la durée en heures
    const nouvelleHeure = new Date(heureActuelle.getTime() + dureeEnHeures * 60 * 60 * 1000);

    // Arrondir à l'heure supérieure
    nouvelleHeure.setMinutes(0);
    nouvelleHeure.setSeconds(0);
    nouvelleHeure.setMilliseconds(0);

    // Formater l'heure au format HH:mm
    const heureFinale = nouvelleHeure.toTimeString().substring(0, 5);

    return heureFinale.replace(":", "h");
}


export function createHoursLst(heure1, heure2, duree) {
    const heures = [heure1];
    let heureActuelle = heure1;

    let heureFinale = ajouterDuree(heure2, duree);
    let heureEnMinutes;
    while (heureActuelle.split("h")[0] !== heureFinale.split("h")[0]) {
        // Convertir l'heure actuelle au format "8h00" en minutes
        const [heure, minute] = heureActuelle.split('h').map(Number);
        heureEnMinutes = heure * 60 + minute;

        // Ajouter une heure à l'heure actuelle
        heureEnMinutes += 60;

        // Convertir l'heure en format "8h00"
        const nouvelleHeure = Math.floor(heureEnMinutes / 60).toString().padStart(2, '0') +
            'h' +
            (heureEnMinutes % 60).toString().padStart(2, '0');

        // Ajouter l'heure à la liste
        heures.push(nouvelleHeure);

        // Mettre à jour l'heure actuelle
        heureActuelle = nouvelleHeure;
    }
    return heures;
}