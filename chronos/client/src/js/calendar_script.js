function heureComp(heure1, heure2) {
    // Convertir les chaînes d'heure en objets Date
    const date1 = new Date('1970-01-01T' + heure1.replace("h", ":") + 'Z');
    const date2 = new Date('1970-01-01T' + heure2.replace("h", ":") + 'Z');

    // Comparer les heures
    return date1 <= date2;
}

export function couleurAleatoire() {
    // Générer trois composantes de couleur (R, G, B) au hasard
    const composanteR = Math.floor(Math.random() * 256);
    const composanteG = Math.floor(Math.random() * 256);
    const composanteB = Math.floor(Math.random() * 256);

    // Convertir les composantes en code hexadécimal
    const codeHexa = '#' +
        composanteR.toString(10).padStart(2, '0') +
        composanteG.toString(10).padStart(2, '0') +
        composanteB.toString(10).padStart(2, '0');

    return codeHexa;
}

// Renvoie l'heure la plus tot et l'heure la plus tard d'une semaine
// (l'heure la plus tot est arrondis à l'heure pile inférieur la plus proche)
// l'heure minimum est de 08h00 max et la plus tard est de 18h minimum
export function trouverHeuresExtremes(semaine) {
    // Initialiser les heures extrêmes
    let heureDebutPlusTot = "08h00";
    let heureFinPlusTard = "18h00";
    let dureeFinPlusTard = 0;
  
    // Parcourir les clés de l'objet (les jours de la semaine)
    for (const jour in semaine) {
      // Itérer sur les cours de chaque jour
      semaine[jour].forEach((cours) => {
        // Convertir les heures au format "8h15" en minutes
        const dureeFin = cours.duration;
        const heureActuelle = cours.startHour;
  
        // Mettre à jour l'heure de début la plus tôt
        if (heureComp(heureActuelle, heureDebutPlusTot)) {
          heureDebutPlusTot = heureActuelle;
        }
  
        // Mettre à jour l'heure de fin la plus tard
        if (
          heureComp(
            ajouterDuree(heureFinPlusTard, dureeFinPlusTard, true),
            ajouterDuree(heureActuelle, dureeFin, true)
          )
        ) {
          heureFinPlusTard = heureActuelle;
          dureeFinPlusTard = dureeFin;
        }
      });
    }
  
    return {
      heureDebutPlusTot: heureDebutPlusTot.split("h")[0] + "h" + "00",
      heureFinPlusTard,
      dureeFinPlusTard,
    };
  }
  

// Renvoie une liste des jours de la semaine présent dans l'obj en param
export function createDaysLst(schedule) {
    // Vérifiez si l'argument passé est un tableau et s'il n'est pas vide
    if (schedule.length === 0) {
        return [];
    }

    // Utilisez la méthode map pour extraire les jours de chaque élément du tableau
    const daysList = Object.keys(schedule);

    return daysList;
};

// Ajoute la durée à l'heure et arrondis à l'heure pile supérieure si flag = true
export function ajouterDuree(heureString, dureeEnHeures, flag) {
    // Convertir la chaîne d'heure en objet Date
    let heureFormat;
    if (heureString.split("h")[1] != "00" && flag) {
        heureFormat = (parseInt(heureString.split("h")[0]) + dureeEnHeures + 1).toString() + "h00";
    } else {
        heureFormat = (parseInt(heureString.split("h")[0]) + dureeEnHeures).toString() + "h" + heureString.split("h")[1];
    }

    if (heureFormat.split("h")[0].length == 1) {
        heureFormat = "0" + heureFormat;
    }

    return heureFormat;
}

export function ajouterDureeDate(date, duree) {
  const nouvelleDate = new Date(date.getTime() + duree * 60000); // 1 minute = 60000 millisecondes
  return nouvelleDate
}

export function createHoursLst(heure1, heure2, duree) {
    const heures = [heure1];
    let heureActuelle = heure1;

    let heureFinale = ajouterDuree(heure2, duree, true);
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

        const nouvelleHeure2 = (parseInt(heureActuelle.split("h")[0]) + 1).toString() + "h" + heureActuelle.split("h")[1];

        // Ajouter l'heure à la liste
        heures.push(nouvelleHeure);

        // Mettre à jour l'heure actuelle
        heureActuelle = nouvelleHeure;
    }
    return heures;
};

function getDayLabel(dateTimeString) {
    const date = new Date(dateTimeString);
    const day = date.getDay();
    const dayNames = ["Dimanche", "Lundi", "Mardi","Mercredi","Jeudi","Vendredi","Samedi"];
  
    return dayNames[day];
};