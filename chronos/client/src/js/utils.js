// Met au format 2024-01-01 17:26:42 une date
export function setFormattedDate(dateString) {
    // Convertir la chaîne de caractères en objet Date
    const date = new Date(dateString);

    // Composants de la date
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');

    // Formate la date
    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;

    return formattedDate;
};