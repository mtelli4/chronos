SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `ingrid`
--

-- --------------------------------------------------------

--
-- Structure de la table `absence`
--

CREATE TABLE `absence` (
  `id` int(11) NOT NULL,
  `valide` tinyint(1) DEFAULT NULL,
  `justificatif` varchar(50) DEFAULT NULL,
  `message` varchar(1000) DEFAULT NULL,
  `eleveId` int(11) DEFAULT NULL,
  `coursId` int(11) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `retard` int(11) DEFAULT NULL,
  `envoye` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `bloc_competence`
--

CREATE TABLE `bloc_competence` (
  `id` int(11) NOT NULL,
  `libelle` varchar(50) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `cours`
--

CREATE TABLE `cours` (
  `id` int(11) NOT NULL,
  `libelle` varchar(50) DEFAULT NULL,
  `debutCours` datetime DEFAULT NULL,
  `duree` int(11) DEFAULT NULL,
  `moduleId` int(11) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `appel` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `cours_groupe`
--

CREATE TABLE `cours_groupe` (
  `coursId` int(11) NOT NULL,
  `groupeId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `cours_professeur`
--

CREATE TABLE `cours_professeur` (
  `professeurId` int(11) NOT NULL,
  `coursId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `directeur`
--

CREATE TABLE `directeur` (
  `id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `utilisateurId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `eleve`
--

CREATE TABLE `eleve` (
  `id` int(11) NOT NULL,
  `numeroEtudiant` varchar(50) DEFAULT NULL,
  `trombinoscope` varchar(50) DEFAULT NULL,
  `tiersTemps` tinyint(1) DEFAULT NULL,
  `formationId` int(11) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `utilisateurId` int(11) DEFAULT NULL,
  `delegue` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `evaluation`
--

CREATE TABLE `evaluation` (
  `id` int(11) NOT NULL,
  `libelle` varchar(50) DEFAULT NULL,
  `coefficient` int(11) DEFAULT NULL,
  `moduleId` int(11) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `periodeId` int(11) DEFAULT NULL,
  `noteMaximale` int(11) DEFAULT '20'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `formation`
--

CREATE TABLE `formation` (
  `id` int(11) NOT NULL,
  `libelle` varchar(50) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `formation_directeur`
--

CREATE TABLE `formation_directeur` (
  `directeurId` int(11) NOT NULL,
  `formationId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `formation_module`
--

CREATE TABLE `formation_module` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `FormationId` int(11) NOT NULL,
  `ModuleCoursId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `formation_secretaire`
--

CREATE TABLE `formation_secretaire` (
  `secretaireId` int(11) NOT NULL,
  `formationId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `groupe`
--

CREATE TABLE `groupe` (
  `id` int(11) NOT NULL,
  `libelle` varchar(50) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `groupe_eleve`
--

CREATE TABLE `groupe_eleve` (
  `eleveId` int(11) NOT NULL,
  `groupeId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `groupe_formation`
--

CREATE TABLE `groupe_formation` (
  `groupeId` int(11) NOT NULL,
  `formationId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `message`
--

CREATE TABLE `message` (
  `id` int(11) NOT NULL,
  `content` longtext NOT NULL,
  `UtilisateurId` int(11) NOT NULL,
  `ModuleId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `module_cours`
--

CREATE TABLE `module_cours` (
  `id` int(11) NOT NULL,
  `libelle` varchar(50) DEFAULT NULL,
  `codeApogee` varchar(50) DEFAULT NULL,
  `blocCompetenceId` int(11) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `couleur` varchar(7) DEFAULT '#fe4455'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `note`
--

CREATE TABLE `note` (
  `id` int(11) NOT NULL,
  `note` decimal(15,2) DEFAULT NULL,
  `eleveId` int(11) DEFAULT NULL,
  `evaluationId` int(11) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `statutId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `notification`
--

CREATE TABLE `notification` (
  `id` int(11) NOT NULL,
  `type` varchar(50) DEFAULT NULL,
  `eleveId` int(11) DEFAULT NULL,
  `absenceId` int(11) DEFAULT NULL,
  `evaluationId` int(11) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `periode`
--

CREATE TABLE `periode` (
  `id` int(11) NOT NULL,
  `libelle` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `professeur`
--

CREATE TABLE `professeur` (
  `id` int(11) NOT NULL,
  `vacataire` tinyint(1) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `utilisateurId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `professeur_module`
--

CREATE TABLE `professeur_module` (
  `professeurId` int(11) NOT NULL,
  `moduleId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `role`
--

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `label` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `secretaire`
--

CREATE TABLE `secretaire` (
  `id` int(11) NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `utilisateurId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `statut_note`
--

CREATE TABLE `statut_note` (
  `id` int(11) NOT NULL,
  `libelle` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

CREATE TABLE `utilisateur` (
  `id` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `mdp` varchar(255) DEFAULT NULL,
  `premiereConnexion` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `utilisateurs_eav`
--

CREATE TABLE `utilisateurs_eav` (
  `id` int(11) NOT NULL,
  `utilisateurId` int(11) DEFAULT NULL,
  `attribute` varchar(255) DEFAULT NULL,
  `value` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur_role`
--

CREATE TABLE `utilisateur_role` (
  `UtilisateurId` int(11) NOT NULL,
  `RoleId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `absence`
--
ALTER TABLE `absence`
  ADD PRIMARY KEY (`id`),
  ADD KEY `eleveId` (`eleveId`),
  ADD KEY `coursId` (`coursId`);

--
-- Index pour la table `bloc_competence`
--
ALTER TABLE `bloc_competence`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `cours`
--
ALTER TABLE `cours`
  ADD PRIMARY KEY (`id`),
  ADD KEY `moduleId` (`moduleId`);

--
-- Index pour la table `cours_groupe`
--
ALTER TABLE `cours_groupe`
  ADD PRIMARY KEY (`coursId`,`groupeId`),
  ADD KEY `groupeId` (`groupeId`);

--
-- Index pour la table `cours_professeur`
--
ALTER TABLE `cours_professeur`
  ADD PRIMARY KEY (`professeurId`,`coursId`),
  ADD KEY `coursId` (`coursId`);

--
-- Index pour la table `directeur`
--
ALTER TABLE `directeur`
  ADD PRIMARY KEY (`id`),
  ADD KEY `utilisateurId` (`utilisateurId`);

--
-- Index pour la table `eleve`
--
ALTER TABLE `eleve`
  ADD PRIMARY KEY (`id`),
  ADD KEY `formationId` (`formationId`),
  ADD KEY `ELEVE_utilisateurId_foreign_idx` (`utilisateurId`);

--
-- Index pour la table `evaluation`
--
ALTER TABLE `evaluation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `moduleId` (`moduleId`),
  ADD KEY `EVALUATION_periodeId_foreign_idx` (`periodeId`);

--
-- Index pour la table `formation`
--
ALTER TABLE `formation`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `formation_directeur`
--
ALTER TABLE `formation_directeur`
  ADD PRIMARY KEY (`directeurId`,`formationId`),
  ADD KEY `formationId` (`formationId`);

--
-- Index pour la table `formation_module`
--
ALTER TABLE `formation_module`
  ADD PRIMARY KEY (`FormationId`,`ModuleCoursId`);

--
-- Index pour la table `formation_secretaire`
--
ALTER TABLE `formation_secretaire`
  ADD PRIMARY KEY (`secretaireId`,`formationId`),
  ADD KEY `formationId` (`formationId`);

--
-- Index pour la table `groupe`
--
ALTER TABLE `groupe`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `groupe_eleve`
--
ALTER TABLE `groupe_eleve`
  ADD PRIMARY KEY (`eleveId`,`groupeId`),
  ADD KEY `groupeId` (`groupeId`);

--
-- Index pour la table `groupe_formation`
--
ALTER TABLE `groupe_formation`
  ADD PRIMARY KEY (`groupeId`,`formationId`),
  ADD KEY `formationId` (`formationId`);

--
-- Index pour la table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id`,`UtilisateurId`,`ModuleId`),
  ADD KEY `UtilisateurId` (`UtilisateurId`),
  ADD KEY `ModuleId` (`ModuleId`);

--
-- Index pour la table `module_cours`
--
ALTER TABLE `module_cours`
  ADD PRIMARY KEY (`id`),
  ADD KEY `blocCompetenceId` (`blocCompetenceId`);

--
-- Index pour la table `note`
--
ALTER TABLE `note`
  ADD PRIMARY KEY (`id`),
  ADD KEY `eleveId` (`eleveId`),
  ADD KEY `evaluationId` (`evaluationId`),
  ADD KEY `NOTE_statutId_foreign_idx` (`statutId`);

--
-- Index pour la table `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`id`),
  ADD KEY `eleveId` (`eleveId`),
  ADD KEY `absenceId` (`absenceId`),
  ADD KEY `evaluationId` (`evaluationId`);

--
-- Index pour la table `periode`
--
ALTER TABLE `periode`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `professeur`
--
ALTER TABLE `professeur`
  ADD PRIMARY KEY (`id`),
  ADD KEY `PROFESSEUR_utilisateurId_foreign_idx` (`utilisateurId`);

--
-- Index pour la table `professeur_module`
--
ALTER TABLE `professeur_module`
  ADD PRIMARY KEY (`professeurId`,`moduleId`),
  ADD KEY `moduleId` (`moduleId`);

--
-- Index pour la table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `secretaire`
--
ALTER TABLE `secretaire`
  ADD PRIMARY KEY (`id`),
  ADD KEY `SECRETAIRE_utilisateurId_foreign_idx` (`utilisateurId`);

--
-- Index pour la table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Index pour la table `statut_note`
--
ALTER TABLE `statut_note`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `utilisateurs_eav`
--
ALTER TABLE `utilisateurs_eav`
  ADD PRIMARY KEY (`id`),
  ADD KEY `utilisateurId` (`utilisateurId`);

--
-- Index pour la table `utilisateur_role`
--
ALTER TABLE `utilisateur_role`
  ADD PRIMARY KEY (`UtilisateurId`,`RoleId`),
  ADD KEY `RoleId` (`RoleId`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `absence`
--
ALTER TABLE `absence`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `bloc_competence`
--
ALTER TABLE `bloc_competence`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `cours`
--
ALTER TABLE `cours`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `directeur`
--
ALTER TABLE `directeur`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `eleve`
--
ALTER TABLE `eleve`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `evaluation`
--
ALTER TABLE `evaluation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `formation`
--
ALTER TABLE `formation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `groupe`
--
ALTER TABLE `groupe`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `message`
--
ALTER TABLE `message`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `module_cours`
--
ALTER TABLE `module_cours`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `note`
--
ALTER TABLE `note`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `notification`
--
ALTER TABLE `notification`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `periode`
--
ALTER TABLE `periode`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `professeur`
--
ALTER TABLE `professeur`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `secretaire`
--
ALTER TABLE `secretaire`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `statut_note`
--
ALTER TABLE `statut_note`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `utilisateurs_eav`
--
ALTER TABLE `utilisateurs_eav`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `absence`
--
ALTER TABLE `absence`
  ADD CONSTRAINT `absence_ibfk_1` FOREIGN KEY (`eleveId`) REFERENCES `eleve` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `absence_ibfk_2` FOREIGN KEY (`coursId`) REFERENCES `cours` (`id`) ON DELETE SET NULL;

--
-- Contraintes pour la table `cours`
--
ALTER TABLE `cours`
  ADD CONSTRAINT `cours_ibfk_1` FOREIGN KEY (`moduleId`) REFERENCES `module_cours` (`id`) ON DELETE SET NULL;

--
-- Contraintes pour la table `cours_groupe`
--
ALTER TABLE `cours_groupe`
  ADD CONSTRAINT `cours_groupe_ibfk_1` FOREIGN KEY (`coursId`) REFERENCES `cours` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cours_groupe_ibfk_2` FOREIGN KEY (`groupeId`) REFERENCES `groupe` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `cours_professeur`
--
ALTER TABLE `cours_professeur`
  ADD CONSTRAINT `cours_professeur_ibfk_1` FOREIGN KEY (`professeurId`) REFERENCES `professeur` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cours_professeur_ibfk_2` FOREIGN KEY (`coursId`) REFERENCES `cours` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `directeur`
--
ALTER TABLE `directeur`
  ADD CONSTRAINT `directeur_ibfk_1` FOREIGN KEY (`utilisateurId`) REFERENCES `utilisateur` (`id`);

--
-- Contraintes pour la table `eleve`
--
ALTER TABLE `eleve`
  ADD CONSTRAINT `ELEVE_utilisateurId_foreign_idx` FOREIGN KEY (`utilisateurId`) REFERENCES `utilisateur` (`id`),
  ADD CONSTRAINT `eleve_ibfk_1` FOREIGN KEY (`formationId`) REFERENCES `formation` (`id`) ON DELETE SET NULL;

--
-- Contraintes pour la table `evaluation`
--
ALTER TABLE `evaluation`
  ADD CONSTRAINT `EVALUATION_periodeId_foreign_idx` FOREIGN KEY (`periodeId`) REFERENCES `periode` (`id`),
  ADD CONSTRAINT `evaluation_ibfk_1` FOREIGN KEY (`moduleId`) REFERENCES `module_cours` (`id`) ON DELETE SET NULL;

--
-- Contraintes pour la table `formation_directeur`
--
ALTER TABLE `formation_directeur`
  ADD CONSTRAINT `formation_directeur_ibfk_1` FOREIGN KEY (`directeurId`) REFERENCES `directeur` (`id`),
  ADD CONSTRAINT `formation_directeur_ibfk_2` FOREIGN KEY (`formationId`) REFERENCES `formation` (`id`);

--
-- Contraintes pour la table `formation_secretaire`
--
ALTER TABLE `formation_secretaire`
  ADD CONSTRAINT `formation_secretaire_ibfk_1` FOREIGN KEY (`secretaireId`) REFERENCES `secretaire` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `formation_secretaire_ibfk_2` FOREIGN KEY (`formationId`) REFERENCES `formation` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `groupe_eleve`
--
ALTER TABLE `groupe_eleve`
  ADD CONSTRAINT `groupe_eleve_ibfk_1` FOREIGN KEY (`eleveId`) REFERENCES `eleve` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `groupe_eleve_ibfk_2` FOREIGN KEY (`groupeId`) REFERENCES `groupe` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `groupe_formation`
--
ALTER TABLE `groupe_formation`
  ADD CONSTRAINT `groupe_formation_ibfk_1` FOREIGN KEY (`groupeId`) REFERENCES `groupe` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `groupe_formation_ibfk_2` FOREIGN KEY (`formationId`) REFERENCES `formation` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `message`
--
ALTER TABLE `message`
  ADD CONSTRAINT `message_ibfk_1` FOREIGN KEY (`UtilisateurId`) REFERENCES `utilisateur` (`id`),
  ADD CONSTRAINT `message_ibfk_2` FOREIGN KEY (`ModuleId`) REFERENCES `module_cours` (`id`);

--
-- Contraintes pour la table `module_cours`
--
ALTER TABLE `module_cours`
  ADD CONSTRAINT `module_cours_ibfk_1` FOREIGN KEY (`blocCompetenceId`) REFERENCES `bloc_competence` (`id`) ON DELETE SET NULL;

--
-- Contraintes pour la table `note`
--
ALTER TABLE `note`
  ADD CONSTRAINT `NOTE_statutId_foreign_idx` FOREIGN KEY (`statutId`) REFERENCES `statut_note` (`id`),
  ADD CONSTRAINT `note_ibfk_1` FOREIGN KEY (`eleveId`) REFERENCES `eleve` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `note_ibfk_2` FOREIGN KEY (`evaluationId`) REFERENCES `evaluation` (`id`) ON DELETE SET NULL;

--
-- Contraintes pour la table `notification`
--
ALTER TABLE `notification`
  ADD CONSTRAINT `notification_ibfk_1` FOREIGN KEY (`eleveId`) REFERENCES `eleve` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `notification_ibfk_2` FOREIGN KEY (`absenceId`) REFERENCES `absence` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `notification_ibfk_3` FOREIGN KEY (`evaluationId`) REFERENCES `evaluation` (`id`) ON DELETE SET NULL;

--
-- Contraintes pour la table `professeur`
--
ALTER TABLE `professeur`
  ADD CONSTRAINT `PROFESSEUR_utilisateurId_foreign_idx` FOREIGN KEY (`utilisateurId`) REFERENCES `utilisateur` (`id`);

--
-- Contraintes pour la table `professeur_module`
--
ALTER TABLE `professeur_module`
  ADD CONSTRAINT `professeur_module_ibfk_1` FOREIGN KEY (`professeurId`) REFERENCES `professeur` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `professeur_module_ibfk_2` FOREIGN KEY (`moduleId`) REFERENCES `module_cours` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `secretaire`
--
ALTER TABLE `secretaire`
  ADD CONSTRAINT `SECRETAIRE_utilisateurId_foreign_idx` FOREIGN KEY (`utilisateurId`) REFERENCES `utilisateur` (`id`);

--
-- Contraintes pour la table `utilisateurs_eav`
--
ALTER TABLE `utilisateurs_eav`
  ADD CONSTRAINT `utilisateurs_eav_ibfk_1` FOREIGN KEY (`utilisateurId`) REFERENCES `utilisateur` (`id`);

--
-- Contraintes pour la table `utilisateur_role`
--
ALTER TABLE `utilisateur_role`
  ADD CONSTRAINT `utilisateur_role_ibfk_1` FOREIGN KEY (`UtilisateurId`) REFERENCES `utilisateur` (`id`),
  ADD CONSTRAINT `utilisateur_role_ibfk_2` FOREIGN KEY (`RoleId`) REFERENCES `role` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
