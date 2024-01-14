// seedAll.js
const execSync = require('child_process').execSync;

try {
  // Execute seeders in a specific order
  execSync('npx sequelize-cli db:seed --seed server/seeders/20240116143043-secretairesSeeder.js');
  execSync('npx sequelize-cli db:seed --seed server/seeders/20240116142939-professeursSeeder.js');
  execSync('npx sequelize-cli db:seed --seed server/seeders/20240116140013-formationsSeeder.js');
  execSync('npx sequelize-cli db:seed --seed server/seeders/20240116124734-eleveSeeder.js');
  execSync('npx sequelize-cli db:seed --seed server/seeders/20240116140629-groupesSeeder.js');
  execSync('npx sequelize-cli db:seed --seed server/seeders/20240116134932-blocCompetencesSeeder.js');
  execSync('npx sequelize-cli db:seed --seed server/seeders/20240116140848-moduleCoursSeeder.js');
  execSync('npx sequelize-cli db:seed --seed server/seeders/20240116135519-evaluationsSeeder.js');
  execSync('npx sequelize-cli db:seed --seed server/seeders/20240116141900-notesSeeder.js');
  execSync('npx sequelize-cli db:seed --seed server/seeders/20240116135339-coursSeeder.js');
  execSync('npx sequelize-cli db:seed --seed server/seeders/20240116133722-absencesSeeder.js');
  execSync('npx sequelize-cli db:seed --seed server/seeders/20240116142049-notificationsSeeder.js');
  execSync('npx sequelize-cli db:seed --seed server/seeders/20240116140115-groupesElevesSeeder.js');
  execSync('npx sequelize-cli db:seed --seed server/seeders/20240116135241-coursProfesseurSeeder.js');
  execSync('npx sequelize-cli db:seed --seed server/seeders/20240116140210-groupesFormationsSeeder.js');
  execSync('npx sequelize-cli db:seed --seed server/seeders/20240116142309-professeurModulesSeeder.js');
  execSync('npx sequelize-cli db:seed --seed server/seeders/20240116135723-formationModulesSeeder.js');

  console.log('All seeders executed successfully!');
} catch (error) {
  console.error('Error executing seeders:', error.message);
  process.exit(1);
}
