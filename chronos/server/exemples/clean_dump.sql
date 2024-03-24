-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 24, 2024 at 07:29 PM
-- Server version: 8.0.30
-- PHP Version: 7.4.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ingrid`
--

-- --------------------------------------------------------

--
-- Table structure for table `absence`
--

CREATE TABLE `absence` (
  `id` int NOT NULL,
  `valide` tinyint(1) DEFAULT NULL,
  `justificatif` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `message` varchar(1000) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `eleveId` int DEFAULT NULL,
  `coursId` int DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `retard` int DEFAULT NULL,
  `envoye` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `bloc_competence`
--

CREATE TABLE `bloc_competence` (
  `id` int NOT NULL,
  `libelle` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cours`
--

CREATE TABLE `cours` (
  `id` int NOT NULL,
  `libelle` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `debutCours` datetime DEFAULT NULL,
  `duree` int DEFAULT NULL,
  `moduleId` int DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `appel` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cours_groupe`
--

CREATE TABLE `cours_groupe` (
  `coursId` int NOT NULL,
  `groupeId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cours_professeur`
--

CREATE TABLE `cours_professeur` (
  `professeurId` int NOT NULL,
  `coursId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `directeur`
--

CREATE TABLE `directeur` (
  `id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `utilisateurId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `eleve`
--

CREATE TABLE `eleve` (
  `id` int NOT NULL,
  `numeroEtudiant` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `trombinoscope` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `tiersTemps` tinyint(1) DEFAULT NULL,
  `formationId` int DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `utilisateurId` int DEFAULT NULL,
  `delegue` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `evaluation`
--

CREATE TABLE `evaluation` (
  `id` int NOT NULL,
  `libelle` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `coefficient` int DEFAULT NULL,
  `moduleId` int DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `periodeId` int DEFAULT NULL,
  `noteMaximale` int DEFAULT '20'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `formation`
--

CREATE TABLE `formation` (
  `id` int NOT NULL,
  `libelle` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `formation_directeur`
--

CREATE TABLE `formation_directeur` (
  `directeurId` int NOT NULL,
  `formationId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `formation_module`
--

CREATE TABLE `formation_module` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `FormationId` int NOT NULL,
  `ModuleCoursId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `formation_secretaire`
--

CREATE TABLE `formation_secretaire` (
  `secretaireId` int NOT NULL,
  `formationId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `groupe`
--

CREATE TABLE `groupe` (
  `id` int NOT NULL,
  `libelle` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `groupe_eleve`
--

CREATE TABLE `groupe_eleve` (
  `eleveId` int NOT NULL,
  `groupeId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `groupe_formation`
--

CREATE TABLE `groupe_formation` (
  `groupeId` int NOT NULL,
  `formationId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

CREATE TABLE `message` (
  `id` int NOT NULL,
  `content` longtext COLLATE utf8mb4_general_ci NOT NULL,
  `UtilisateurId` int NOT NULL,
  `ModuleId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `module_cours`
--

CREATE TABLE `module_cours` (
  `id` int NOT NULL,
  `libelle` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `codeApogee` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `blocCompetenceId` int DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `couleur` varchar(7) COLLATE utf8mb4_general_ci DEFAULT '#fe4455'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `note`
--

CREATE TABLE `note` (
  `id` int NOT NULL,
  `note` decimal(15,2) DEFAULT NULL,
  `eleveId` int DEFAULT NULL,
  `evaluationId` int DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `statutId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

CREATE TABLE `notification` (
  `id` int NOT NULL,
  `type` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `eleveId` int DEFAULT NULL,
  `absenceId` int DEFAULT NULL,
  `evaluationId` int DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `periode`
--

CREATE TABLE `periode` (
  `id` int NOT NULL,
  `libelle` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `professeur`
--

CREATE TABLE `professeur` (
  `id` int NOT NULL,
  `vacataire` tinyint(1) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `utilisateurId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `professeur_module`
--

CREATE TABLE `professeur_module` (
  `professeurId` int NOT NULL,
  `moduleId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `id` int NOT NULL,
  `label` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `secretaire`
--

CREATE TABLE `secretaire` (
  `id` int NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `utilisateurId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `statut_note`
--

CREATE TABLE `statut_note` (
  `id` int NOT NULL,
  `libelle` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `utilisateur`
--

CREATE TABLE `utilisateur` (
  `id` int NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `mdp` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `premiereConnexion` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `nom` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `prenom` varchar(255) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `utilisateurs_eav`
--

CREATE TABLE `utilisateurs_eav` (
  `id` int NOT NULL,
  `utilisateurId` int DEFAULT NULL,
  `attribute` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `value` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `utilisateur_role`
--

CREATE TABLE `utilisateur_role` (
  `UtilisateurId` int NOT NULL,
  `RoleId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `absence`
--
ALTER TABLE `absence`
  ADD PRIMARY KEY (`id`),
  ADD KEY `eleveId` (`eleveId`),
  ADD KEY `coursId` (`coursId`);

--
-- Indexes for table `bloc_competence`
--
ALTER TABLE `bloc_competence`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cours`
--
ALTER TABLE `cours`
  ADD PRIMARY KEY (`id`),
  ADD KEY `moduleId` (`moduleId`);

--
-- Indexes for table `cours_groupe`
--
ALTER TABLE `cours_groupe`
  ADD PRIMARY KEY (`coursId`,`groupeId`),
  ADD KEY `groupeId` (`groupeId`);

--
-- Indexes for table `cours_professeur`
--
ALTER TABLE `cours_professeur`
  ADD PRIMARY KEY (`professeurId`,`coursId`),
  ADD KEY `coursId` (`coursId`);

--
-- Indexes for table `directeur`
--
ALTER TABLE `directeur`
  ADD PRIMARY KEY (`id`),
  ADD KEY `utilisateurId` (`utilisateurId`);

--
-- Indexes for table `eleve`
--
ALTER TABLE `eleve`
  ADD PRIMARY KEY (`id`),
  ADD KEY `formationId` (`formationId`),
  ADD KEY `ELEVE_utilisateurId_foreign_idx` (`utilisateurId`);

--
-- Indexes for table `evaluation`
--
ALTER TABLE `evaluation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `moduleId` (`moduleId`),
  ADD KEY `EVALUATION_periodeId_foreign_idx` (`periodeId`);

--
-- Indexes for table `formation`
--
ALTER TABLE `formation`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `formation_directeur`
--
ALTER TABLE `formation_directeur`
  ADD PRIMARY KEY (`directeurId`,`formationId`),
  ADD KEY `formationId` (`formationId`);

--
-- Indexes for table `formation_module`
--
ALTER TABLE `formation_module`
  ADD PRIMARY KEY (`FormationId`,`ModuleCoursId`);

--
-- Indexes for table `formation_secretaire`
--
ALTER TABLE `formation_secretaire`
  ADD PRIMARY KEY (`secretaireId`,`formationId`),
  ADD KEY `formationId` (`formationId`);

--
-- Indexes for table `groupe`
--
ALTER TABLE `groupe`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `groupe_eleve`
--
ALTER TABLE `groupe_eleve`
  ADD PRIMARY KEY (`eleveId`,`groupeId`),
  ADD KEY `groupeId` (`groupeId`);

--
-- Indexes for table `groupe_formation`
--
ALTER TABLE `groupe_formation`
  ADD PRIMARY KEY (`groupeId`,`formationId`),
  ADD KEY `formationId` (`formationId`);

--
-- Indexes for table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id`,`UtilisateurId`,`ModuleId`),
  ADD KEY `UtilisateurId` (`UtilisateurId`),
  ADD KEY `ModuleId` (`ModuleId`);

--
-- Indexes for table `module_cours`
--
ALTER TABLE `module_cours`
  ADD PRIMARY KEY (`id`),
  ADD KEY `blocCompetenceId` (`blocCompetenceId`);

--
-- Indexes for table `note`
--
ALTER TABLE `note`
  ADD PRIMARY KEY (`id`),
  ADD KEY `eleveId` (`eleveId`),
  ADD KEY `evaluationId` (`evaluationId`),
  ADD KEY `NOTE_statutId_foreign_idx` (`statutId`);

--
-- Indexes for table `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`id`),
  ADD KEY `eleveId` (`eleveId`),
  ADD KEY `absenceId` (`absenceId`),
  ADD KEY `evaluationId` (`evaluationId`);

--
-- Indexes for table `periode`
--
ALTER TABLE `periode`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `professeur`
--
ALTER TABLE `professeur`
  ADD PRIMARY KEY (`id`),
  ADD KEY `PROFESSEUR_utilisateurId_foreign_idx` (`utilisateurId`);

--
-- Indexes for table `professeur_module`
--
ALTER TABLE `professeur_module`
  ADD PRIMARY KEY (`professeurId`,`moduleId`),
  ADD KEY `moduleId` (`moduleId`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `secretaire`
--
ALTER TABLE `secretaire`
  ADD PRIMARY KEY (`id`),
  ADD KEY `SECRETAIRE_utilisateurId_foreign_idx` (`utilisateurId`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `statut_note`
--
ALTER TABLE `statut_note`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `utilisateurs_eav`
--
ALTER TABLE `utilisateurs_eav`
  ADD PRIMARY KEY (`id`),
  ADD KEY `utilisateurId` (`utilisateurId`);

--
-- Indexes for table `utilisateur_role`
--
ALTER TABLE `utilisateur_role`
  ADD PRIMARY KEY (`UtilisateurId`,`RoleId`),
  ADD KEY `RoleId` (`RoleId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `absence`
--
ALTER TABLE `absence`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bloc_competence`
--
ALTER TABLE `bloc_competence`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cours`
--
ALTER TABLE `cours`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `directeur`
--
ALTER TABLE `directeur`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `eleve`
--
ALTER TABLE `eleve`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `evaluation`
--
ALTER TABLE `evaluation`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `formation`
--
ALTER TABLE `formation`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `groupe`
--
ALTER TABLE `groupe`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `message`
--
ALTER TABLE `message`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `module_cours`
--
ALTER TABLE `module_cours`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `note`
--
ALTER TABLE `note`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `notification`
--
ALTER TABLE `notification`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `periode`
--
ALTER TABLE `periode`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `professeur`
--
ALTER TABLE `professeur`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `secretaire`
--
ALTER TABLE `secretaire`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `statut_note`
--
ALTER TABLE `statut_note`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `utilisateur`
--
ALTER TABLE `utilisateur`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `utilisateurs_eav`
--
ALTER TABLE `utilisateurs_eav`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `absence`
--
ALTER TABLE `absence`
  ADD CONSTRAINT `absence_ibfk_1` FOREIGN KEY (`eleveId`) REFERENCES `eleve` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `absence_ibfk_2` FOREIGN KEY (`coursId`) REFERENCES `cours` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `cours`
--
ALTER TABLE `cours`
  ADD CONSTRAINT `cours_ibfk_1` FOREIGN KEY (`moduleId`) REFERENCES `module_cours` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `cours_groupe`
--
ALTER TABLE `cours_groupe`
  ADD CONSTRAINT `cours_groupe_ibfk_1` FOREIGN KEY (`coursId`) REFERENCES `cours` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cours_groupe_ibfk_2` FOREIGN KEY (`groupeId`) REFERENCES `groupe` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `cours_professeur`
--
ALTER TABLE `cours_professeur`
  ADD CONSTRAINT `cours_professeur_ibfk_1` FOREIGN KEY (`professeurId`) REFERENCES `professeur` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cours_professeur_ibfk_2` FOREIGN KEY (`coursId`) REFERENCES `cours` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `directeur`
--
ALTER TABLE `directeur`
  ADD CONSTRAINT `directeur_ibfk_1` FOREIGN KEY (`utilisateurId`) REFERENCES `utilisateur` (`id`);

--
-- Constraints for table `eleve`
--
ALTER TABLE `eleve`
  ADD CONSTRAINT `eleve_ibfk_1` FOREIGN KEY (`formationId`) REFERENCES `formation` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `ELEVE_utilisateurId_foreign_idx` FOREIGN KEY (`utilisateurId`) REFERENCES `utilisateur` (`id`);

--
-- Constraints for table `evaluation`
--
ALTER TABLE `evaluation`
  ADD CONSTRAINT `evaluation_ibfk_1` FOREIGN KEY (`moduleId`) REFERENCES `module_cours` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `EVALUATION_periodeId_foreign_idx` FOREIGN KEY (`periodeId`) REFERENCES `periode` (`id`);

--
-- Constraints for table `formation_directeur`
--
ALTER TABLE `formation_directeur`
  ADD CONSTRAINT `formation_directeur_ibfk_1` FOREIGN KEY (`directeurId`) REFERENCES `directeur` (`id`),
  ADD CONSTRAINT `formation_directeur_ibfk_2` FOREIGN KEY (`formationId`) REFERENCES `formation` (`id`);

--
-- Constraints for table `formation_secretaire`
--
ALTER TABLE `formation_secretaire`
  ADD CONSTRAINT `formation_secretaire_ibfk_1` FOREIGN KEY (`secretaireId`) REFERENCES `secretaire` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `formation_secretaire_ibfk_2` FOREIGN KEY (`formationId`) REFERENCES `formation` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `groupe_eleve`
--
ALTER TABLE `groupe_eleve`
  ADD CONSTRAINT `groupe_eleve_ibfk_1` FOREIGN KEY (`eleveId`) REFERENCES `eleve` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `groupe_eleve_ibfk_2` FOREIGN KEY (`groupeId`) REFERENCES `groupe` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `groupe_formation`
--
ALTER TABLE `groupe_formation`
  ADD CONSTRAINT `groupe_formation_ibfk_1` FOREIGN KEY (`groupeId`) REFERENCES `groupe` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `groupe_formation_ibfk_2` FOREIGN KEY (`formationId`) REFERENCES `formation` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `message`
--
ALTER TABLE `message`
  ADD CONSTRAINT `message_ibfk_1` FOREIGN KEY (`UtilisateurId`) REFERENCES `utilisateur` (`id`),
  ADD CONSTRAINT `message_ibfk_2` FOREIGN KEY (`ModuleId`) REFERENCES `module_cours` (`id`);

--
-- Constraints for table `module_cours`
--
ALTER TABLE `module_cours`
  ADD CONSTRAINT `module_cours_ibfk_1` FOREIGN KEY (`blocCompetenceId`) REFERENCES `bloc_competence` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `note`
--
ALTER TABLE `note`
  ADD CONSTRAINT `note_ibfk_1` FOREIGN KEY (`eleveId`) REFERENCES `eleve` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `note_ibfk_2` FOREIGN KEY (`evaluationId`) REFERENCES `evaluation` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `NOTE_statutId_foreign_idx` FOREIGN KEY (`statutId`) REFERENCES `statut_note` (`id`);

--
-- Constraints for table `notification`
--
ALTER TABLE `notification`
  ADD CONSTRAINT `notification_ibfk_1` FOREIGN KEY (`eleveId`) REFERENCES `eleve` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `notification_ibfk_2` FOREIGN KEY (`absenceId`) REFERENCES `absence` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `notification_ibfk_3` FOREIGN KEY (`evaluationId`) REFERENCES `evaluation` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `professeur`
--
ALTER TABLE `professeur`
  ADD CONSTRAINT `PROFESSEUR_utilisateurId_foreign_idx` FOREIGN KEY (`utilisateurId`) REFERENCES `utilisateur` (`id`);

--
-- Constraints for table `professeur_module`
--
ALTER TABLE `professeur_module`
  ADD CONSTRAINT `professeur_module_ibfk_1` FOREIGN KEY (`professeurId`) REFERENCES `professeur` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `professeur_module_ibfk_2` FOREIGN KEY (`moduleId`) REFERENCES `module_cours` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `secretaire`
--
ALTER TABLE `secretaire`
  ADD CONSTRAINT `SECRETAIRE_utilisateurId_foreign_idx` FOREIGN KEY (`utilisateurId`) REFERENCES `utilisateur` (`id`);

--
-- Constraints for table `utilisateurs_eav`
--
ALTER TABLE `utilisateurs_eav`
  ADD CONSTRAINT `utilisateurs_eav_ibfk_1` FOREIGN KEY (`utilisateurId`) REFERENCES `utilisateur` (`id`);

--
-- Constraints for table `utilisateur_role`
--
ALTER TABLE `utilisateur_role`
  ADD CONSTRAINT `utilisateur_role_ibfk_1` FOREIGN KEY (`UtilisateurId`) REFERENCES `utilisateur` (`id`),
  ADD CONSTRAINT `utilisateur_role_ibfk_2` FOREIGN KEY (`RoleId`) REFERENCES `role` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
