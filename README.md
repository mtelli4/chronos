# Configuration du projet 
Ce projet nécessite d'avoir npm et node.js installé pour pouvoir travailler dessus.
Suivre les instructions suivantes:

-Vérifier que npm et node ne sont pas déjà installés avec:
    
    node -v
    npm -v

NodeJS sera utile pour faire nos services côté serveur API. npm (package manager) permet quand a lui d'installer des package et modules utiles pour nodeJS

--> Si ce n'est pas le cas installer les via:
    NodeJs et npm Windows: https://nodejs.org/en/download/
    --> le .msi est le plus facile pour l'installation sur windows.
    
    NodeJs Linux : sudo apt install nodejs
    npm Linux: sudo apt install npm

Pour installer les packages déjà référencé dans le fichier package.json, lancer la commande : npm install.
Vous pouvez trouver des librairies dans le côté /client et le côté /server. Par conséquent, il faut exécuter la commande à la racine de ces deux dossiers.

Au cas ou cela n'aurait pas fonctionné lancer les commande suivante utiles pour notre développement:

Si le fichier package.json n'existe pas : 
  
    npm init -y
    npm i express --> permet d'installer express notre framework backend (API, routage, session, requête http)
  
    npm i nodemon -D --> Ce package fournit une fonctionnalité de redémarrage automatique de l'application pour voir les changement en temps "réel".

Pour lancer le front, se placer dans le répertoire /chronos/client/ et exécuter la commande : 
    
    npm start

En cas d'erreur "'react-scripts' is not recognized as an internal or external command" faire la commande npm install react-scripts --save dans /client

Pour lancer le back, se placer dans le répertoire /chronos/server/ et exécuter la commande : 

    npm run dev --> j'ai défini la commande dans /server/package.json pour pouvoir utiliser nodemon
  --> sinon vous pouvez faire un npm run start classique

# Configuration de la base de donnée

Le présent projet utilise une base de données MySQL. Une copie des dumps de la base de données se trouve dans le dossier /server/exemples.
Le fichier <b>clean_dump.sql</b> contient la base de données complete vide sans aucune données afin de repartir de zéro.
Le fichier <b>seeded_dump.sql</b> contient un jeu de données spécialement créé pour la soutenance du 22/04/2024. Il convient de noter que ces données sont uniquement valables pour la dernière version du projet à cette date. 
Toute modification ultérieure du code ou de la base de données pourrait rendre ces données obsolètes. Il est donc recommandé de manipuler la structure de la base de données avec précaution.

Afin de relier la base de données à notre serveur NodeJs il convient de configurer certains fichiers.

Dans un premier temps, créez dans le répertoire <b>/chronos/server/config/</b> un fichier <b>config.json</b> et insérez-y le contenu du fichier <b>config.example.json</b>, en complétant les champs <b>"username"</b> et <b>"password"</b> par votre nom d'utilisateur et mot de passe MySQL.

Il faut aussi créer un fichier <b>.env</b> dans <b>chronos/server/</b> et y copier le contenu du fichier <b>.env.test</b> situé au même emplacement, mais
en remplaçant les champs <b>"SENDER_EMAIL"</b>, <b>"APPLICATION_PASSWORD"</b>, <b>"DATABASE_USER"</b> et <b>"DATABASE_PASSWORD"</b>.

<b>Demander à Mohamed pour obtenir le "SENDER_EMAIL" et l'"APPLICATION_PASSWORD".</b>

Pour les champs <b>"DATABASE_USER"</b> et <b>"DATABASE_PASSWORD"</b> il faudra indiquer votre nom d'utilisateur et mot de passe de votre SGBD.

    DATABASE_USER="votre utilisateur bdd"
    DATABASE_PASSWORD="votre mot de passe associé"

Bien évidemment, il faut que le serveur de base de données soit activé et accessible, tout du moins en localhost.
Dans le cas ou ce serait un hôte distant il faut le changer dans l'initialisation de Sequelize dans le fichier /server/server.js.
-->
const sequelize = new Sequelize('nomdelabasededonnée', process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
  host: '127.0.0.1', <----- HOST A CHANGER AU BESOIN! Par défault il est au localhost. (ligne 13)
  dialect: 'mysql',
});

# Envoi d'email

Il existe sur cette application une fonction permetant d'envoyer des emails. Cette fonction se trouve dans le fichier /server/mailer.js
sendEmail({ recipient_email, subject, message }) prend en paramètre l'email de la personne a qui envoyer le mail, l'objet du mail et le corps du texte (souvent du HTML qui mettra en forme votre texte).
Pour utiliser cette fonction il suffit donc d'importer la fonction sendEmail() et de lui mettre les paramètre adéquats:
Voir exemple dans /server/routes/api.js avec l'API /sendVerificationCode.
