DU COUP

Si vous voulez faire une modif dans la BDD, il faut faire des migrations.
C'est pas compliqué, suffit de faire la commande : 
<code>npx sequelize-cli migration:generate --name le_nom_que_vous_voulez</code>
Dans l'idée vous mettez un nom représentatif genre UpdateFieldOnTableName t'as capté

Ca va vous créer un fichier dans le dossier migrations.
Dans ce fichier, il y a 2 fonctions :
- up : C'est les modifs que vous voulez faire
- down : C'est l'inverse de ce que vous avez fait : Change si vous avez ajouté une table dans up, vous la supprimez dans down

Je vous ai mis quelques exemples de migrations dans ce dossier que vous pouvez reprendre et modifier à votre sauce.

Une fois que vous avez fini de créer la migration, vous pouvez la lancer avec la commande :  <code>npx sequelize-cli db:migrate</code>

Ca va vous mettre un truc comme ca normalement.
Loaded configuration file "config/config.json".
Using environment "development".
== 20240117220516-CreateUsersTable: migrating =======
== 20240117220516-CreateUsersTable: migrated (0.399s)

NB : 
Après avoir run une migration, ca vous l'ajoute dans la table SequelizeMeta dans votre BDD.
C'est pour que sequelize sache quelle migration a été effectué pour pas les faire plusieurs fois !

Si vous avez d'autres questions hésitez pas :)