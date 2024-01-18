const crypto = require('crypto');

// Fonction pour hacher le mot de passe
function hashPassword(password) {
  try {
    const hashSHA256 = crypto.createHash('sha256').update(password).digest('hex');
    return hashSHA256;
  } catch (error) {
    console.error('Erreur lors du hachage du mot de passe :', error);
    throw error; // Gérer l'erreur ou la propager vers le niveau supérieur
  }
}

module.exports = {
    hashPassword,
};
