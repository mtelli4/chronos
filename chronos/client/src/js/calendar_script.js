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
    let heureDebutPlusTot = '08h00';
    let heureFinPlusTard = '18h00';
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
            if (heureComp(ajouterDuree(heureFinPlusTard, dureeFinPlusTard, true), ajouterDuree(heureActuelle, dureeFin, true))) {
                heureFinPlusTard = heureActuelle;
                dureeFinPlusTard = dureeFin;
            }
        });
    });

    return {
        heureDebutPlusTot : heureDebutPlusTot.split("h")[0] + "h" + "00",
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

// Ajoute la durée à l'heure et arrondis à l'heure pile supérieure si flag = true
export function ajouterDuree(heureString, dureeEnHeures, flag) {
    // Convertir la chaîne d'heure en objet Date
    let heureFormat;
    if (heureString.split("h")[1] != "00" && flag) {
        heureFormat = (parseInt(heureString.split("h")[0]) + dureeEnHeures + 1).toString() + "h00";
    } else {
        let dureeInt = parseInt(dureeEnHeures);
        let dureeDeci = dureeEnHeures - dureeInt;
        let dureeDeciToMin = parseInt(dureeDeci * 60);
        heureFormat = (parseInt(heureString.split("h")[0]) + dureeInt).toString() + "h" + (parseInt(heureString.split("h")[1]) + dureeDeciToMin).toString();
    }

    if (heureFormat.split("h")[0].length == 1) {
        heureFormat = "0" + heureFormat;
    }

    if (heureFormat.split("h")[1].length == 1) {
        heureFormat = heureFormat.split("h")[0] + "h0" + heureFormat.split("h")[1];
    }

    return heureFormat;
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

export function getDayLabel(dateTimeString) {
    const date = new Date(dateTimeString);
    const day = date.getDay();
    const dayNames = ["Dimanche", "Lundi", "Mardi","Mercredi","Jeudi","Vendredi","Samedi"];
  
    return dayNames[day];
};

export function ajusterCouleur(hexCode, versChaud = true) {
    // Conversion du code hexadécimal en valeurs R, G, B
    const r = parseInt(hexCode.slice(1, 3), 16);
    const g = parseInt(hexCode.slice(3, 5), 16);
    const b = parseInt(hexCode.slice(5, 7), 16);

    // Conversion RGB vers HSL
    let hsl = rgbToHsl(r, g, b);

    // Ajustement selon les spécifications
    if (versChaud) {
        // Se rapprocher des couleurs chaudes
        hsl[0] = (hsl[0] + 30) % 360;  // Augmenter la teinte
        hsl[1] = Math.max(0, hsl[1] - 10);  // Diminuer la saturation
        hsl[2] = Math.min(100, hsl[2] + 30);  // Augmenter la luminosité
    } else {
        // Se rapprocher des couleurs froides
        hsl[0] = (hsl[0] - 30 + 360) % 360;  // Diminuer la teinte
        hsl[1] = Math.min(100, hsl[1] + 35);  // Augmenter la saturation
        hsl[2] = Math.max(0, hsl[2] - 20);  // Diminuer la luminosité
    }

    // Conversion HSL vers RGB
    let rgb = hslToRgb(hsl[0], hsl[1], hsl[2]);

    // Formatage des valeurs RGB en code hexadécimal
    const newHexCode = rgbToHex(rgb[0], rgb[1], rgb[2]);

    return newHexCode;
}

// Fonction pour convertir RGB en HSL
export function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;  // Achromatic
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h * 360, s * 100, l * 100];
}

// Fonction pour convertir HSL en RGB
export function hslToRgb(h, s, l) {
    h /= 360;
    s /= 100;
    l /= 100;
    let r, g, b;

    if (s === 0) {
        r = g = b = l;  // Achromatic
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return [r * 255, g * 255, b * 255];
}

// Fonction pour convertir RGB en code hexadécimal
export function rgbToHex(r, g, b) {
    return `#${Math.round(r).toString(16).padStart(2, '0')}${Math.round(g).toString(16).padStart(2, '0')}${Math.round(b).toString(16).padStart(2, '0')}`;
}

export function hexToRgb(hexCode) {
    // Supprimer le caractère '#' s'il est présent
    hexCode = hexCode.replace(/^#/, '');

    // Convertir les composantes hexadécimales en valeurs décimales
    const r = parseInt(hexCode.substring(0, 2), 16);
    const g = parseInt(hexCode.substring(2, 4), 16);
    const b = parseInt(hexCode.substring(4, 6), 16);

    // Retourner un objet avec les composantes RGB
    return { r, g, b };
}