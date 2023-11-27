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

Au cas ou cela n'aurait pas fonctionné lancer les commande suivante utiles pour notre développement:

Si le fichier package.json n'existe pas : npm init -y
npm i express --> permet d'installer express notre framework backend (API, routage, session, requête http)
npm i nodemon -D --> Ce package fournit une fonctionnalité de redémarrage automatique de l'application pour voir les changement en temps "réel".

Pour lancer le front: npm start
En cas d'erreur "'react-scripts' is not recognized as an internal or external command" faire la commande npm install react-scripts --save dans /client

Pour lancer le back: npm run dev --> j'ai défini la commande dans package.json pour pouvoir utiliser nodemon
  --> sinon vous pouvez faire un npm run start classique