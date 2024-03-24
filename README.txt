-------------------------------------------------Configuration du projet-----------------------------------------------------
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

Si le fichier package.json n'existe pas : npm init -y
npm i express --> permet d'installer express notre framework backend (API, routage, session, requête http)
npm i nodemon -D --> Ce package fournit une fonctionnalité de redémarrage automatique de l'application pour voir les changement en temps "réel".

Pour lancer le front: npm start
En cas d'erreur "'react-scripts' is not recognized as an internal or external command" faire la commande npm install react-scripts --save dans /client

Pour lancer le back: npm run dev --> j'ai défini la commande dans /server/package.json pour pouvoir utiliser nodemon
  --> sinon vous pouvez faire un npm run start classique

-------------------------------------------------Configuration dee la base de donnée-----------------------------------------------------

Le présent projet utilise une base de données MySQL. Une copie des dumps de la base de données se trouve dans le dossier /server/exemples.
Le fichier clean_dump.sql contient la base de données complete vide sans aucune données afin de repartir de zéro.
Le fichier seeded_dump.sql contient un jeu de données spécialement créé pour la soutenance du 22/04/2024. Il convient de noter que ces données sont uniquement valables pour la dernière version du projet à cette date. 
Toute modification ultérieure du code ou de la base de données pourrait rendre ces données obsolètes. Il est donc recommandé de manipuler ce la structure de la base de données avec précaution.

Afin de relier la base de données à notre serveur NodeJs il convient de configurer certains fichiers.
Dans un premier temps, le fichier /server/config/config.json: il faut impérativement lors du développement indiqué l'utilisateur et le mot de passe
de la base de données MySQL respectivement dans les champs "username" et "password" du moins dans l'objet "developpement".
Il n'est pas forcément nécessaire d'indiquer ces champs dans les autres objet "test" et "production" du json durant la phase de dev, mais ils seront bien évidemment requis au besoin (mise en prod etC..).

De même, il faut impérativement indiquer votre login et mot de passe de BDD dans le ichier .env dans le dossier /server (voir .env.test).
DATABASE_USER="votre utilisateur bdd"
DATABASE_PASSWORD="votre mot de passe associé"

Bien évidemment, il faut que le serveur de base de données soit activé et accessible, tout du moins en localhost.
Dans le cas ou ce serait un hôte distant il faut le changer dans l'initialisation de Sequelize dans le fichier /server/server.js.
-->
const sequelize = new Sequelize('nomdelabasededonnée', process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
  host: '127.0.0.1', <----- HOST A CHANGER AU BESOIN! Par défault il est au localhost. (ligne 13)
  dialect: 'mysql',
});

-------------------------------------------------Envoi d'email-----------------------------------------------------

Il existe sur cette application une fonction permetant d'envoyer des emails. Cette fonction se trouve dans le fichier /server/mailer.js
sendEmail({ recipient_email, subject, message }) prend en paramètre l'email de la personne a qui envoyer le mail, l'objet du mail et le corps du texte (souvent du HTML qui mettra en forme votre texte).
Pour utiliser cette fonction il suffit donc d'importer la fonction sendEmail() et de lui mettre les paramètre adéquats:
Voir exemple dans /server/routes/api.js avec l'API /sendVerificationCode.