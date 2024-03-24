-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 24, 2024 at 07:28 PM
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

--
-- Dumping data for table `absence`
--

INSERT INTO `absence` (`id`, `valide`, `justificatif`, `message`, `eleveId`, `coursId`, `createdAt`, `updatedAt`, `retard`, `envoye`) VALUES
(32, 0, '', '', 13, 10, '2024-03-22 11:52:15', '2024-03-22 11:52:15', NULL, 0),
(33, 1, 'r1/n1/1711108545398.pdf', 'malade', 1, 10, '2024-03-22 11:52:15', '2024-03-22 11:59:03', NULL, 1),
(34, 0, '', '', 3, 10, '2024-03-22 11:52:15', '2024-03-22 11:52:15', NULL, 0);

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

--
-- Dumping data for table `bloc_competence`
--

INSERT INTO `bloc_competence` (`id`, `libelle`, `createdAt`, `updatedAt`) VALUES
(1, 'sint', '2024-01-16 19:35:59', '2024-01-16 19:35:59'),
(2, 'deserunt', '2024-01-16 19:35:59', '2024-01-16 19:35:59'),
(3, 'dolor', '2024-01-16 19:35:59', '2024-01-16 19:35:59'),
(4, 'velit', '2024-01-16 19:35:59', '2024-01-16 19:35:59'),
(5, 'iusto', '2024-01-16 19:35:59', '2024-01-16 19:35:59'),
(6, 'quisquam', '2024-01-16 19:35:59', '2024-01-16 19:35:59'),
(7, 'quos', '2024-01-16 19:35:59', '2024-01-16 19:35:59'),
(8, 'aut', '2024-01-16 19:35:59', '2024-01-16 19:35:59'),
(9, 'et', '2024-01-16 19:35:59', '2024-01-16 19:35:59'),
(10, 'autem', '2024-01-16 19:35:59', '2024-01-16 19:35:59'),
(11, 'qui', '2024-01-16 19:35:59', '2024-01-16 19:35:59'),
(12, 'quis', '2024-01-16 19:35:59', '2024-01-16 19:35:59'),
(13, 'corporis', '2024-01-16 19:35:59', '2024-01-16 19:35:59'),
(14, 'aut', '2024-01-16 19:35:59', '2024-01-16 19:35:59'),
(15, 'esse', '2024-01-16 19:35:59', '2024-01-16 19:35:59'),
(16, 'ut', '2024-01-16 19:35:59', '2024-01-16 19:35:59'),
(17, 'repellat', '2024-01-16 19:35:59', '2024-01-16 19:35:59'),
(18, 'ipsum', '2024-01-16 19:35:59', '2024-01-16 19:35:59'),
(19, 'praesentium', '2024-01-16 19:35:59', '2024-01-16 19:35:59'),
(20, 'est', '2024-01-16 19:35:59', '2024-01-16 19:35:59'),
(21, 'perferendis', '2024-01-16 19:35:59', '2024-01-16 19:35:59'),
(22, 'alias', '2024-01-16 19:35:59', '2024-01-16 19:35:59'),
(23, 'hic', '2024-01-16 19:35:59', '2024-01-16 19:35:59'),
(24, 'ullam', '2024-01-16 19:35:59', '2024-01-16 19:35:59'),
(25, 'saepe', '2024-01-16 19:35:59', '2024-01-16 19:35:59'),
(26, 'occaecati', '2024-01-16 19:35:59', '2024-01-16 19:35:59'),
(27, 'totam', '2024-01-16 19:35:59', '2024-01-16 19:35:59'),
(28, 'voluptatem', '2024-01-16 19:35:59', '2024-01-16 19:35:59'),
(29, 'est', '2024-01-16 19:35:59', '2024-01-16 19:35:59'),
(30, 'odit', '2024-01-16 19:35:59', '2024-01-16 19:35:59');

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

--
-- Dumping data for table `cours`
--

INSERT INTO `cours` (`id`, `libelle`, `debutCours`, `duree`, `moduleId`, `createdAt`, `updatedAt`, `appel`) VALUES
(1, 'Anglais ', '2024-03-18 13:30:00', 120, 1, '2024-03-21 13:23:02', '2024-03-21 13:23:02', 0),
(2, 'Anglais', '2024-03-20 08:15:00', 120, 1, '2024-03-21 13:23:02', '2024-03-21 13:23:02', 0),
(3, 'Anglais', '2024-03-20 10:30:00', 120, 1, '2024-03-21 13:23:02', '2024-03-21 13:32:42', 0),
(4, 'TD Probabilités', '2024-03-18 08:15:00', 240, 4, '2024-03-21 13:27:51', '2024-03-22 10:08:21', 1),
(5, 'TD Probabilités', '2024-03-20 13:30:00', 240, 4, '2024-03-21 13:27:51', '2024-03-22 09:30:07', 0),
(6, 'TP Développement Web', '2024-03-22 13:30:00', 120, 3, '2024-03-21 13:27:51', '2024-03-21 13:33:10', 0),
(7, 'Soutenance SAE', '2024-03-22 08:15:00', 255, 7, '2024-03-21 13:27:51', '2024-03-21 13:29:16', 0),
(8, 'Présentation portfolio', '2024-03-21 13:30:00', 60, 6, '2024-03-21 13:28:54', '2024-03-21 13:29:17', 0),
(9, 'Graphes', '2024-03-21 10:30:00', 120, 5, '2024-03-21 13:34:06', '2024-03-21 13:34:51', 0),
(10, 'Graphes', '2024-03-19 13:30:00', 240, 5, '2024-03-21 13:34:45', '2024-03-22 11:52:15', 1),
(11, 'Tp Base de données', '2024-03-15 09:30:00', 180, 1, '2024-03-21 15:34:10', '2024-03-21 15:34:10', 0),
(12, 'TP Développement Web', '2024-03-11 13:30:00', 180, 3, '2024-03-21 15:34:10', '2024-03-21 15:41:59', 0),
(13, 'TD Probabilités', '2024-03-12 13:30:00', 240, 4, '2024-03-21 15:34:10', '2024-03-21 15:43:28', 0),
(14, 'Graphes', '2024-03-12 08:15:00', 240, 5, '2024-03-21 15:34:10', '2024-03-21 15:34:10', 0),
(15, 'TD Base de données', '2024-03-11 08:15:00', 180, 12, '2024-03-21 15:34:10', '2024-03-21 15:34:10', 0),
(16, 'SAE', '2024-03-14 08:15:00', 240, 7, '2024-03-21 15:45:05', '2024-03-21 15:45:05', 0),
(17, 'SAE', '2024-03-14 13:30:00', 240, 7, '2024-03-21 15:45:05', '2024-03-21 15:45:05', 0),
(18, 'SAE', '2024-03-07 08:15:00', 240, 7, '2024-03-21 15:47:48', '2024-03-21 15:47:48', 0),
(19, 'SAE', '2024-03-07 13:30:00', 240, 7, '2024-03-21 15:47:48', '2024-03-21 15:47:48', 0),
(20, 'SAE', '2024-03-06 08:15:00', 240, 7, '2024-03-21 15:51:17', '2024-03-21 15:53:00', 0),
(21, 'SAE', '2024-03-06 13:30:00', 240, 7, '2024-03-21 15:51:17', '2024-03-21 15:55:48', 0),
(22, 'TD Probabilités', '2024-03-04 13:30:00', 240, 4, '2024-03-21 15:51:17', '2024-03-21 15:56:14', 0),
(23, 'Graphes', '2024-03-04 08:15:00', 240, 5, '2024-03-21 15:51:17', '2024-03-21 15:53:26', 0),
(24, 'TD Probabilités', '2024-03-08 13:30:00', 240, 4, '2024-03-21 15:51:17', '2024-03-21 15:53:36', 0),
(25, 'TD Probabilités', '2024-03-05 10:30:00', 120, 4, '2024-03-21 15:51:17', '2024-03-21 15:55:57', 0),
(26, 'TP Base de données', '2023-03-11 08:15:00', 240, 12, '2024-03-21 15:57:36', '2024-03-21 15:57:47', 0),
(27, 'Mathématiques', '2024-03-19 09:15:00', 180, 2, '2024-03-21 16:06:16', '2024-03-21 16:06:16', 0),
(28, 'Mathématiques', '2024-03-22 08:15:00', 240, 2, '2024-03-21 16:06:16', '2024-03-24 13:12:47', 1),
(29, 'Mathématiques', '2024-03-13 08:15:00', 240, 2, '2024-03-21 16:06:16', '2024-03-21 16:06:16', 0),
(30, 'Mathématiques', '2024-03-15 09:15:00', 220, 2, '2024-03-21 16:06:16', '2024-03-21 16:06:16', 0);

-- --------------------------------------------------------

--
-- Table structure for table `cours_groupe`
--

CREATE TABLE `cours_groupe` (
  `coursId` int NOT NULL,
  `groupeId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cours_groupe`
--

INSERT INTO `cours_groupe` (`coursId`, `groupeId`) VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 1),
(5, 1),
(6, 1),
(7, 1),
(8, 1),
(9, 1),
(10, 1),
(11, 1),
(12, 1),
(13, 1),
(14, 1),
(15, 1),
(16, 1),
(17, 1),
(18, 1),
(19, 1),
(20, 1),
(21, 1),
(22, 1),
(23, 1),
(24, 1),
(25, 1),
(26, 1),
(1, 2),
(2, 2),
(3, 2),
(4, 2),
(5, 2),
(6, 2),
(7, 2),
(8, 2),
(9, 2),
(10, 2),
(11, 2),
(12, 2),
(13, 2),
(14, 2),
(15, 2),
(16, 2),
(17, 2),
(18, 2),
(19, 2),
(20, 2),
(21, 2),
(22, 2),
(23, 2),
(24, 2),
(25, 2),
(26, 2),
(27, 3),
(28, 3),
(29, 3),
(30, 3),
(27, 4),
(28, 4),
(29, 4),
(30, 4);

-- --------------------------------------------------------

--
-- Table structure for table `cours_professeur`
--

CREATE TABLE `cours_professeur` (
  `professeurId` int NOT NULL,
  `coursId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cours_professeur`
--

INSERT INTO `cours_professeur` (`professeurId`, `coursId`) VALUES
(1, 4),
(1, 5),
(1, 9),
(1, 10),
(1, 13),
(1, 14),
(1, 22),
(1, 23),
(1, 24),
(1, 27),
(1, 28),
(1, 29),
(1, 30);

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

--
-- Dumping data for table `directeur`
--

INSERT INTO `directeur` (`id`, `createdAt`, `updatedAt`, `utilisateurId`) VALUES
(1, '2024-03-07 17:52:14', '2024-03-07 17:52:14', 1),
(2, '2024-03-07 17:52:14', '2024-03-07 17:52:14', 2);

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

--
-- Dumping data for table `eleve`
--

INSERT INTO `eleve` (`id`, `numeroEtudiant`, `trombinoscope`, `tiersTemps`, `formationId`, `createdAt`, `updatedAt`, `utilisateurId`, `delegue`) VALUES
(1, '256123', NULL, 1, 1, '2024-01-16 19:35:49', '2024-03-21 09:56:33', 1, 1),
(2, '215486', NULL, 1, 1, '2024-01-16 19:35:49', '2024-03-21 09:56:36', 3, 0),
(3, '123548', NULL, 1, 1, '2024-01-16 19:35:49', '2024-03-21 09:56:39', 4, 0),
(4, '516894', NULL, 1, 1, '2024-01-16 19:35:49', '2024-03-21 09:56:43', 5, 0),
(5, '258465', NULL, 1, 1, '2024-01-16 19:35:49', '2024-03-21 09:56:46', 6, 0),
(6, '258947', NULL, 0, 1, '2024-01-16 19:35:49', '2024-03-21 09:56:54', 7, 0),
(7, '258741', NULL, 0, 1, '2024-01-16 19:35:49', '2024-03-21 09:56:57', 8, 0),
(8, '258000', NULL, 1, 1, '2024-01-16 19:35:49', '2024-03-21 09:57:00', 9, 0),
(9, '258410', NULL, 1, 1, '2024-01-16 19:35:49', '2024-03-21 09:57:03', 10, 0),
(10, '258411', NULL, 1, 1, '2024-01-16 19:35:49', '2024-03-21 09:57:11', 11, 0),
(11, '256451', NULL, 1, 1, '2024-01-16 19:35:49', '2024-03-21 09:57:17', 12, 0),
(12, '100235', NULL, 1, 1, '2024-01-16 19:35:49', '2024-03-21 09:58:43', 13, 0),
(13, '258462', NULL, 1, 1, '2024-01-16 19:35:49', '2024-03-21 09:58:45', 14, 0),
(14, '258492', NULL, 0, 1, '2024-01-16 19:35:49', '2024-03-21 09:57:27', 15, 0),
(15, '256784', NULL, 1, 1, '2024-01-16 19:35:49', '2024-03-21 09:58:50', 16, 0),
(16, '256410', NULL, 1, 2, '2024-01-16 19:35:49', '2024-03-21 09:59:46', 17, 1),
(17, '251032', NULL, 0, 2, '2024-01-16 19:35:49', '2024-03-21 09:59:16', 18, 0),
(18, '258462', NULL, 1, 2, '2024-01-16 19:35:49', '2024-03-21 09:59:30', 19, 0),
(19, '015695', NULL, 0, 2, '2024-01-16 19:35:49', '2024-03-21 09:59:30', 20, 0),
(20, '542300', NULL, 1, 2, '2024-01-16 19:35:49', '2024-03-21 09:59:30', 21, 0),
(21, '512999', NULL, 0, 2, '2024-01-16 19:35:49', '2024-03-21 09:59:30', 22, 0),
(22, '254788', NULL, 1, 2, '2024-01-16 19:35:49', '2024-03-21 09:59:30', 23, 0),
(23, '254462', NULL, 0, 2, '2024-01-16 19:35:49', '2024-03-21 09:59:30', 24, 0),
(24, '251000', NULL, 1, 2, '2024-01-16 19:35:49', '2024-03-21 09:58:14', 25, 0),
(25, '254888', NULL, 0, 2, '2024-01-16 19:35:49', '2024-03-21 09:59:30', 25, 0),
(26, '584660', NULL, 1, 2, '2024-01-16 19:35:49', '2024-03-21 09:59:30', 3, 0),
(27, '254789', NULL, 1, 2, '2024-01-16 19:35:49', '2024-03-21 09:59:30', 5, 0),
(28, '256000', NULL, 0, 2, '2024-01-16 19:35:49', '2024-03-21 09:58:27', 7, 0),
(29, '253655', NULL, 0, 2, '2024-01-16 19:35:49', '2024-03-21 09:59:30', 8, 0),
(30, '254000', NULL, 1, 2, '2024-01-16 19:35:49', '2024-03-21 09:59:30', 9, 0),
(49, '123456789', NULL, 1, 3, '2024-03-22 10:21:54', '2024-03-22 11:59:41', 27, NULL),
(50, '987654321', NULL, 0, 3, '2024-03-22 10:21:54', '2024-03-22 11:59:41', 28, NULL),
(51, '69420', NULL, 1, 3, '2024-03-22 10:21:54', '2024-03-22 11:59:41', 29, NULL);

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

--
-- Dumping data for table `evaluation`
--

INSERT INTO `evaluation` (`id`, `libelle`, `coefficient`, `moduleId`, `createdAt`, `updatedAt`, `periodeId`, `noteMaximale`) VALUES
(32, 'English Test', 1, 1, '2024-02-13 19:09:15', '2024-03-21 17:07:44', 1, 20),
(33, 'Subtitle', 3, 1, '2024-02-14 11:35:39', '2024-03-21 17:07:53', 1, 15),
(35, 'Examen', 3, 4, '2024-02-18 15:09:28', '2024-03-21 16:39:19', 1, 20),
(36, 'Projet', 2, 4, '2024-02-18 15:10:37', '2024-03-21 16:58:30', 2, 20),
(37, 'TD Probabilités 1', 1, 4, '2024-02-18 15:10:44', '2024-03-21 16:39:45', 1, 10),
(38, 'Trigonométrie', 1, 2, '2024-02-18 15:13:28', '2024-03-21 16:50:28', 1, 20),
(59, 'Examen final', 3, 2, '2024-03-21 16:45:41', '2024-03-21 16:45:41', 1, 20),
(60, 'Projet', 1, 5, '2024-03-21 16:59:31', '2024-03-21 16:59:31', 1, 20),
(62, 'Trigonométrie', 1, 4, '2024-03-22 11:53:06', '2024-03-22 11:53:06', 1, 20),
(63, 'Controle', 1, 2, '2024-03-22 12:18:29', '2024-03-22 12:18:29', 1, 20);

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

--
-- Dumping data for table `formation`
--

INSERT INTO `formation` (`id`, `libelle`, `createdAt`, `updatedAt`) VALUES
(1, 'BUT Informatique 1', '2024-01-16 19:35:44', '2024-01-18 17:32:50'),
(2, 'BUT Informatique 2', '2024-01-16 19:35:44', '2024-01-18 17:32:56'),
(3, 'BUT Informatique 3', '2024-01-16 19:35:44', '2024-01-18 17:33:03'),
(4, 'BUT MMI', '2024-01-16 19:35:44', '2024-01-18 17:33:07'),
(5, 'Licence Maths Info', '2024-01-16 19:35:44', '2024-01-18 17:33:17'),
(6, 'Prépa', '2024-01-16 19:35:44', '2024-01-18 17:33:24');

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

--
-- Dumping data for table `formation_directeur`
--

INSERT INTO `formation_directeur` (`directeurId`, `formationId`, `createdAt`, `updatedAt`) VALUES
(1, 1, '2024-03-07 17:53:04', '2024-03-07 17:53:04'),
(2, 1, '2024-03-07 17:53:12', '2024-03-07 17:53:12'),
(2, 2, '2024-03-07 17:53:12', '2024-03-07 17:53:12'),
(2, 3, '2024-03-07 17:53:25', '2024-03-07 17:53:25');

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

--
-- Dumping data for table `formation_module`
--

INSERT INTO `formation_module` (`createdAt`, `updatedAt`, `FormationId`, `ModuleCoursId`) VALUES
('2024-01-18 17:38:51', '2024-01-18 17:38:50', 1, 1),
('2024-01-18 19:00:16', '2024-01-18 19:00:17', 1, 2),
('2024-03-21 15:24:35', '2024-03-21 15:24:35', 1, 3),
('2024-01-18 19:00:27', '2024-01-18 19:00:29', 1, 4),
('2024-03-21 15:24:35', '2024-03-21 15:24:35', 1, 5),
('2024-01-18 19:01:12', '2024-01-18 19:01:13', 1, 6),
('2024-01-18 19:00:50', '2024-01-18 19:00:51', 1, 7),
('2024-01-18 17:40:11', '2024-01-18 17:40:12', 2, 1),
('2024-01-18 19:01:01', '2024-01-18 19:01:02', 2, 2),
('2024-03-21 16:45:05', '2024-03-21 16:45:05', 2, 5),
('2024-01-18 19:00:41', '2024-01-18 19:00:42', 3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `formation_secretaire`
--

CREATE TABLE `formation_secretaire` (
  `secretaireId` int NOT NULL,
  `formationId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `formation_secretaire`
--

INSERT INTO `formation_secretaire` (`secretaireId`, `formationId`) VALUES
(1, 1),
(1, 2),
(1, 3);

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

--
-- Dumping data for table `groupe`
--

INSERT INTO `groupe` (`id`, `libelle`, `createdAt`, `updatedAt`) VALUES
(1, 'TD A', '2024-01-16 19:35:54', '2024-03-21 10:17:42'),
(2, 'TD B', '2024-01-16 19:35:54', '2024-03-21 10:17:45'),
(3, 'TP Alpha', '2024-01-16 19:35:54', '2024-03-21 10:17:49'),
(4, 'TP Beta', '2024-01-16 19:35:54', '2024-03-21 10:17:52');

-- --------------------------------------------------------

--
-- Table structure for table `groupe_eleve`
--

CREATE TABLE `groupe_eleve` (
  `eleveId` int NOT NULL,
  `groupeId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `groupe_eleve`
--

INSERT INTO `groupe_eleve` (`eleveId`, `groupeId`) VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 1),
(5, 1),
(6, 1),
(7, 1),
(8, 2),
(9, 2),
(10, 2),
(11, 2),
(12, 2),
(13, 2),
(14, 2),
(15, 2),
(16, 3),
(17, 3),
(18, 3),
(19, 3),
(20, 3),
(21, 3),
(22, 3),
(23, 4),
(24, 4),
(25, 4),
(26, 4),
(27, 4),
(28, 4),
(29, 4),
(30, 4);

-- --------------------------------------------------------

--
-- Table structure for table `groupe_formation`
--

CREATE TABLE `groupe_formation` (
  `groupeId` int NOT NULL,
  `formationId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `groupe_formation`
--

INSERT INTO `groupe_formation` (`groupeId`, `formationId`) VALUES
(1, 1),
(2, 1),
(3, 2),
(4, 2);

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

--
-- Dumping data for table `message`
--

INSERT INTO `message` (`id`, `content`, `UtilisateurId`, `ModuleId`, `createdAt`, `updatedAt`) VALUES
(9, 'Salut', 1, 1, '2024-03-18 10:37:16', '2024-03-18 10:37:16'),
(10, 'Bonjour', 1, 2, '2024-03-21 16:07:50', '2024-03-21 16:07:50'),
(11, 'Bienvenue', 1, 4, '2024-03-21 16:07:56', '2024-03-21 16:07:56'),
(12, 'oo', 1, 1, '2024-03-22 09:25:29', '2024-03-22 09:25:29'),
(13, 'Bonjour', 1, 4, '2024-03-22 09:26:21', '2024-03-22 09:26:21'),
(14, 'Salut', 1, 2, '2024-03-22 10:38:01', '2024-03-22 10:38:01'),
(15, 'coucou', 1, 2, '2024-03-22 10:38:12', '2024-03-22 10:38:12'),
(16, 'Bonjou', 1, 5, '2024-03-22 11:51:08', '2024-03-22 11:51:08'),
(17, 'oui', 1, 5, '2024-03-22 11:54:45', '2024-03-22 11:54:45');

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

--
-- Dumping data for table `module_cours`
--

INSERT INTO `module_cours` (`id`, `libelle`, `codeApogee`, `blocCompetenceId`, `createdAt`, `updatedAt`, `couleur`) VALUES
(1, 'Anglais', 'Apo-BR45', 26, '2024-01-16 19:36:03', '2024-03-21 13:48:28', '#32a852'),
(2, 'Maths', 'Apo-FG84', 25, '2024-01-16 19:36:03', '2024-03-22 10:36:24', '#4055CA'),
(3, 'Développement Web', 'Apo-ER54', 9, '2024-01-16 19:36:03', '2024-03-21 14:59:44', '#42C147'),
(4, 'Probabilités', 'Apo-RT21', 29, '2024-01-16 19:36:03', '2024-03-21 15:00:41', '#D7399A'),
(5, 'Graphes', 'Apo-PO54', 11, '2024-01-16 19:36:03', '2024-03-21 15:15:21', '#e0564c'),
(6, 'Portfolio', 'Apo-LM89', 16, '2024-01-16 19:36:03', '2024-03-21 15:15:44', '#51c99f'),
(7, 'SAE 1 ', 'Apo-PI45', 23, '2024-01-16 19:36:03', '2024-03-21 15:18:18', '#419fab'),
(8, 'Développement avancé', 'Apo-DV87', 29, '2024-01-16 19:36:03', '2024-03-21 15:16:18', '#1744a6'),
(9, 'Communication', 'Apo-RT62', 25, '2024-01-16 19:36:03', '2024-03-21 15:16:34', '#ac82d9'),
(10, 'Management', 'Apo-PO21', 17, '2024-01-16 19:36:03', '2024-03-21 15:17:02', '#9e0b0b'),
(11, 'Économie', 'Apo-TW89', 6, '2024-01-16 19:36:03', '2024-03-21 15:17:23', '#e3dd22'),
(12, 'Base de données', 'Apo-AA54', 15, '2024-01-16 19:36:03', '2024-03-21 10:09:58', '#fe4455');

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

--
-- Dumping data for table `note`
--

INSERT INTO `note` (`id`, `note`, `eleveId`, `evaluationId`, `createdAt`, `updatedAt`, `statutId`) VALUES
(84, '15.20', 15, 38, '2024-03-21 16:46:03', '2024-03-21 16:50:22', NULL),
(85, '18.00', 3, 38, '2024-03-21 16:46:09', '2024-03-21 16:46:09', NULL),
(86, '10.00', 7, 38, '2024-03-21 16:46:17', '2024-03-21 16:46:17', NULL),
(87, NULL, 2, 38, '2024-03-21 16:47:08', '2024-03-21 16:47:08', 1),
(88, '16.00', 6, 38, '2024-03-21 16:47:21', '2024-03-21 16:47:21', 2),
(89, '8.00', 5, 38, '2024-03-21 16:47:29', '2024-03-21 16:47:29', NULL),
(90, '17.00', 8, 38, '2024-03-21 16:47:33', '2024-03-21 16:47:46', NULL),
(91, '8.50', 4, 38, '2024-03-21 16:50:37', '2024-03-21 16:50:37', NULL),
(92, NULL, 9, 38, '2024-03-21 16:50:42', '2024-03-21 16:51:28', 1),
(93, NULL, 1, 38, '2024-03-21 16:50:47', '2024-03-21 16:51:25', 6),
(94, '17.50', 14, 38, '2024-03-21 16:50:52', '2024-03-21 16:50:52', NULL),
(95, '8.75', 13, 38, '2024-03-21 16:51:01', '2024-03-21 16:51:01', NULL),
(96, '5.00', 10, 38, '2024-03-21 16:51:10', '2024-03-21 16:51:10', 2),
(97, NULL, 11, 38, '2024-03-21 16:51:18', '2024-03-21 16:51:21', 6),
(98, '14.50', 12, 38, '2024-03-21 16:51:33', '2024-03-21 16:51:33', NULL),
(99, '12.00', 15, 59, '2024-03-21 16:51:42', '2024-03-21 16:51:42', NULL),
(100, '13.50', 3, 59, '2024-03-21 16:51:46', '2024-03-21 16:51:46', NULL),
(101, NULL, 7, 59, '2024-03-21 16:52:00', '2024-03-21 16:52:00', 6),
(102, '20.00', 2, 59, '2024-03-21 16:52:05', '2024-03-21 16:52:05', NULL),
(103, '12.00', 6, 59, '2024-03-21 16:52:09', '2024-03-21 16:52:09', NULL),
(104, '17.50', 5, 59, '2024-03-21 16:52:14', '2024-03-21 16:52:14', NULL),
(105, '12.00', 15, 35, '2024-03-21 16:52:50', '2024-03-21 16:52:50', NULL),
(106, '15.00', 3, 35, '2024-03-21 16:52:55', '2024-03-21 16:52:55', NULL),
(107, '17.50', 7, 35, '2024-03-21 16:53:00', '2024-03-21 16:53:00', NULL),
(108, '12.00', 2, 35, '2024-03-21 16:53:03', '2024-03-21 16:53:03', NULL),
(109, '8.75', 6, 35, '2024-03-21 16:53:08', '2024-03-21 16:53:08', NULL),
(110, '11.75', 5, 35, '2024-03-21 16:53:16', '2024-03-21 16:53:16', 2),
(111, '18.75', 8, 35, '2024-03-21 16:53:24', '2024-03-21 16:53:24', NULL),
(112, '8.50', 4, 35, '2024-03-21 16:53:30', '2024-03-21 16:53:30', NULL),
(113, '6.00', 9, 35, '2024-03-21 16:53:35', '2024-03-21 16:53:35', NULL),
(114, '10.50', 1, 35, '2024-03-21 16:53:40', '2024-03-21 16:53:40', NULL),
(115, NULL, 14, 35, '2024-03-21 16:53:45', '2024-03-21 16:53:45', 1),
(116, '19.00', 13, 35, '2024-03-21 16:53:51', '2024-03-22 11:53:19', NULL),
(117, NULL, 10, 35, '2024-03-21 16:53:59', '2024-03-21 16:54:01', 6),
(118, '18.50', 11, 35, '2024-03-21 16:54:07', '2024-03-21 16:54:07', NULL),
(119, '5.75', 12, 35, '2024-03-21 16:54:12', '2024-03-21 16:54:12', NULL),
(120, '15.00', 15, 36, '2024-03-21 16:54:44', '2024-03-21 16:54:44', NULL),
(121, '12.00', 3, 36, '2024-03-21 16:54:47', '2024-03-21 16:54:47', NULL),
(122, '13.75', 7, 36, '2024-03-21 16:54:52', '2024-03-21 16:54:52', NULL),
(123, '12.25', 2, 36, '2024-03-21 16:54:56', '2024-03-21 16:54:56', NULL),
(124, '7.00', 6, 36, '2024-03-21 16:55:00', '2024-03-21 16:55:00', NULL),
(125, '16.50', 5, 36, '2024-03-21 16:55:04', '2024-03-21 16:55:04', NULL),
(126, '13.00', 8, 36, '2024-03-21 16:55:10', '2024-03-21 16:55:10', NULL),
(127, NULL, 4, 36, '2024-03-21 16:55:15', '2024-03-21 16:55:15', 5),
(128, '14.50', 9, 36, '2024-03-21 16:55:25', '2024-03-21 16:55:25', NULL),
(129, NULL, 1, 36, '2024-03-21 16:55:30', '2024-03-21 16:55:30', 5),
(130, '11.00', 14, 36, '2024-03-21 16:55:34', '2024-03-21 16:55:34', NULL),
(131, '13.00', 13, 36, '2024-03-21 16:55:38', '2024-03-21 16:55:38', NULL),
(132, '17.00', 10, 36, '2024-03-21 16:55:45', '2024-03-21 16:55:45', NULL),
(133, '14.00', 11, 36, '2024-03-21 16:55:50', '2024-03-21 16:55:50', NULL),
(134, NULL, 12, 36, '2024-03-21 16:55:57', '2024-03-21 16:55:57', 5),
(135, '7.00', 15, 37, '2024-03-21 16:56:05', '2024-03-21 16:56:05', NULL),
(136, '5.00', 3, 37, '2024-03-21 16:56:08', '2024-03-21 16:56:08', NULL),
(137, '10.00', 7, 37, '2024-03-21 16:56:11', '2024-03-21 16:57:44', NULL),
(138, NULL, 2, 37, '2024-03-21 16:56:16', '2024-03-21 16:56:19', 5),
(139, NULL, 6, 37, '2024-03-21 16:56:26', '2024-03-21 16:56:26', 1),
(140, '8.75', 5, 37, '2024-03-21 16:56:30', '2024-03-21 16:56:30', NULL),
(141, '13.00', 8, 37, '2024-03-21 16:56:34', '2024-03-21 16:56:34', NULL),
(142, '5.50', 4, 37, '2024-03-21 16:56:39', '2024-03-21 16:57:38', NULL),
(143, '8.75', 9, 37, '2024-03-21 16:56:44', '2024-03-21 16:56:44', NULL),
(144, '7.00', 1, 37, '2024-03-21 16:56:48', '2024-03-21 16:57:25', NULL),
(145, NULL, 14, 37, '2024-03-21 16:56:53', '2024-03-21 16:56:53', 5),
(146, '3.00', 13, 37, '2024-03-21 16:57:04', '2024-03-21 16:57:28', NULL),
(147, '7.00', 10, 37, '2024-03-21 16:57:11', '2024-03-21 16:57:11', NULL),
(148, '8.75', 11, 37, '2024-03-21 16:57:20', '2024-03-21 16:58:07', NULL),
(149, '9.75', 12, 37, '2024-03-21 16:57:52', '2024-03-21 16:57:52', NULL),
(150, '10.00', 15, 60, '2024-03-21 16:59:43', '2024-03-21 16:59:43', NULL),
(151, '12.00', 3, 60, '2024-03-21 16:59:47', '2024-03-21 16:59:47', NULL),
(152, '15.50', 7, 60, '2024-03-21 16:59:51', '2024-03-21 16:59:51', NULL),
(153, '7.75', 2, 60, '2024-03-21 16:59:56', '2024-03-21 16:59:56', NULL),
(154, '18.00', 6, 60, '2024-03-21 17:00:00', '2024-03-21 17:00:00', NULL),
(155, '14.00', 5, 60, '2024-03-21 17:00:03', '2024-03-21 17:00:03', NULL),
(156, '8.50', 8, 60, '2024-03-21 17:00:09', '2024-03-21 17:00:09', NULL),
(157, NULL, 4, 60, '2024-03-21 17:00:16', '2024-03-21 17:00:16', 5),
(158, '12.50', 9, 60, '2024-03-21 17:00:23', '2024-03-21 17:00:23', NULL),
(159, '11.00', 1, 60, '2024-03-21 17:00:27', '2024-03-21 17:00:27', NULL),
(160, '20.00', 14, 60, '2024-03-21 17:00:31', '2024-03-21 17:00:31', NULL),
(161, '17.50', 13, 60, '2024-03-21 17:00:35', '2024-03-21 17:00:35', NULL),
(162, '12.50', 10, 60, '2024-03-21 17:00:39', '2024-03-21 17:00:39', NULL),
(163, '16.00', 11, 60, '2024-03-21 17:00:43', '2024-03-21 17:00:43', NULL),
(164, '19.50', 12, 60, '2024-03-21 17:00:47', '2024-03-21 17:00:47', NULL),
(165, '17.00', 29, 38, '2024-03-21 17:01:33', '2024-03-21 17:01:33', NULL),
(166, '8.00', 26, 38, '2024-03-21 17:01:38', '2024-03-21 17:01:38', NULL),
(167, '12.50', 30, 38, '2024-03-21 17:01:43', '2024-03-21 17:01:43', NULL),
(168, '17.75', 27, 38, '2024-03-21 17:01:49', '2024-03-21 17:01:49', NULL),
(169, '12.00', 23, 38, '2024-03-21 17:01:52', '2024-03-21 17:01:52', NULL),
(170, NULL, 17, 38, '2024-03-21 17:01:57', '2024-03-21 17:01:57', 1),
(171, NULL, 21, 38, '2024-03-21 17:02:03', '2024-03-21 17:02:03', 6),
(172, '15.00', 19, 38, '2024-03-21 17:02:10', '2024-03-21 17:02:10', 2),
(173, '12.00', 20, 38, '2024-03-21 17:02:17', '2024-03-21 17:02:17', NULL),
(174, '8.00', 18, 38, '2024-03-21 17:02:22', '2024-03-21 17:02:22', NULL),
(175, '20.00', 16, 38, '2024-03-21 17:02:28', '2024-03-21 17:02:28', NULL),
(176, '14.00', 22, 38, '2024-03-21 17:02:32', '2024-03-21 17:02:32', NULL),
(177, '16.50', 24, 38, '2024-03-21 17:02:38', '2024-03-21 17:02:38', NULL),
(178, '12.50', 25, 38, '2024-03-21 17:02:42', '2024-03-21 17:02:42', NULL),
(179, '12.00', 15, 32, '2024-03-21 17:07:58', '2024-03-21 17:07:58', NULL),
(180, '11.00', 3, 32, '2024-03-21 17:08:02', '2024-03-21 17:08:02', NULL),
(181, '17.00', 7, 32, '2024-03-21 17:08:05', '2024-03-21 17:08:05', NULL),
(182, '8.75', 2, 32, '2024-03-21 17:08:12', '2024-03-21 17:08:12', NULL),
(183, '20.00', 6, 32, '2024-03-21 17:08:15', '2024-03-21 17:08:15', NULL),
(184, '17.50', 5, 32, '2024-03-21 17:08:19', '2024-03-21 17:08:19', NULL),
(185, '15.00', 8, 32, '2024-03-21 17:08:24', '2024-03-21 17:08:24', NULL),
(186, '13.50', 4, 32, '2024-03-21 17:08:29', '2024-03-21 17:08:29', NULL),
(187, '17.00', 9, 32, '2024-03-21 17:08:43', '2024-03-21 17:08:43', NULL),
(188, '8.50', 1, 32, '2024-03-21 17:08:50', '2024-03-21 17:08:50', NULL),
(189, '12.00', 14, 32, '2024-03-21 17:08:56', '2024-03-21 17:08:56', NULL),
(190, '7.75', 13, 32, '2024-03-21 17:09:00', '2024-03-21 17:09:00', NULL),
(191, '12.00', 10, 32, '2024-03-21 17:09:04', '2024-03-21 17:09:04', NULL),
(192, '18.00', 11, 32, '2024-03-21 17:09:08', '2024-03-21 17:09:08', NULL),
(193, '17.75', 12, 32, '2024-03-21 17:09:13', '2024-03-21 17:09:13', NULL),
(194, '12.00', 15, 33, '2024-03-21 17:09:46', '2024-03-21 17:09:46', NULL),
(195, NULL, 3, 33, '2024-03-21 17:09:51', '2024-03-21 17:09:51', 1),
(196, NULL, 7, 33, '2024-03-21 17:09:56', '2024-03-21 17:09:56', 3),
(197, '10.00', 2, 33, '2024-03-21 17:10:00', '2024-03-21 17:10:00', NULL),
(198, '15.00', 6, 33, '2024-03-21 17:10:04', '2024-03-21 17:10:04', NULL),
(199, '12.50', 5, 33, '2024-03-21 17:10:09', '2024-03-21 17:10:09', NULL),
(200, '6.00', 8, 33, '2024-03-21 17:10:12', '2024-03-21 17:10:12', NULL),
(201, '8.50', 4, 33, '2024-03-21 17:10:17', '2024-03-21 17:10:17', NULL),
(202, '4.75', 9, 33, '2024-03-21 17:10:22', '2024-03-21 17:10:22', NULL),
(203, '12.50', 1, 33, '2024-03-21 17:10:27', '2024-03-21 17:10:27', NULL),
(204, '12.00', 14, 33, '2024-03-21 17:10:34', '2024-03-21 17:10:34', NULL),
(205, '7.00', 13, 33, '2024-03-21 17:10:39', '2024-03-21 17:10:39', NULL),
(206, '10.00', 10, 33, '2024-03-21 17:10:45', '2024-03-21 17:10:45', NULL),
(207, '15.00', 11, 33, '2024-03-21 17:10:57', '2024-03-21 17:10:57', NULL),
(208, '7.50', 12, 33, '2024-03-21 17:11:03', '2024-03-21 17:11:03', NULL),
(209, '17.00', 1, 59, '2024-03-21 21:58:33', '2024-03-21 21:58:40', NULL),
(210, '20.00', 49, 35, '2024-03-22 11:53:51', '2024-03-22 11:53:51', 2),
(211, '12.50', 13, 63, '2024-03-22 12:18:40', '2024-03-22 12:18:40', 2);

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

--
-- Dumping data for table `notification`
--

INSERT INTO `notification` (`id`, `type`, `eleveId`, `absenceId`, `evaluationId`, `createdAt`, `updatedAt`) VALUES
(1, 'blanditiis', 17, NULL, NULL, '2024-01-16 19:36:27', '2024-01-16 19:36:27'),
(2, 'error', 18, NULL, NULL, '2024-01-16 19:36:27', '2024-01-16 19:36:27'),
(3, 'maxime', 7, NULL, NULL, '2024-01-16 19:36:27', '2024-01-16 19:36:27'),
(4, 'nesciunt', 11, NULL, NULL, '2024-01-16 19:36:27', '2024-01-16 19:36:27'),
(5, 'molestiae', 15, NULL, NULL, '2024-01-16 19:36:27', '2024-01-16 19:36:27'),
(6, 'commodi', 15, NULL, NULL, '2024-01-16 19:36:27', '2024-01-16 19:36:27'),
(7, 'quae', 9, NULL, NULL, '2024-01-16 19:36:27', '2024-01-16 19:36:27'),
(8, 'fuga', 20, NULL, NULL, '2024-01-16 19:36:27', '2024-01-16 19:36:27'),
(9, 'est', 7, NULL, NULL, '2024-01-16 19:36:27', '2024-01-16 19:36:27'),
(10, 'vitae', 1, NULL, NULL, '2024-01-16 19:36:27', '2024-01-16 19:36:27'),
(11, 'iusto', 2, NULL, NULL, '2024-01-16 19:36:27', '2024-01-16 19:36:27'),
(12, 'ratione', 23, NULL, NULL, '2024-01-16 19:36:27', '2024-01-16 19:36:27'),
(13, 'at', 18, NULL, NULL, '2024-01-16 19:36:27', '2024-01-16 19:36:27'),
(14, 'et', 23, NULL, NULL, '2024-01-16 19:36:27', '2024-01-16 19:36:27'),
(15, 'sunt', 20, NULL, NULL, '2024-01-16 19:36:27', '2024-01-16 19:36:27'),
(16, 'enim', 17, NULL, NULL, '2024-01-16 19:36:27', '2024-01-16 19:36:27'),
(17, 'dolores', 15, NULL, NULL, '2024-01-16 19:36:27', '2024-01-16 19:36:27'),
(18, 'et', 14, NULL, NULL, '2024-01-16 19:36:27', '2024-01-16 19:36:27'),
(19, 'dolor', 7, NULL, NULL, '2024-01-16 19:36:27', '2024-01-16 19:36:27'),
(20, 'tenetur', 23, NULL, NULL, '2024-01-16 19:36:27', '2024-01-16 19:36:27'),
(21, 'sapiente', 3, NULL, NULL, '2024-01-16 19:36:27', '2024-01-16 19:36:27'),
(22, 'architecto', 1, NULL, NULL, '2024-01-16 19:36:27', '2024-01-16 19:36:27'),
(23, 'perspiciatis', 28, NULL, NULL, '2024-01-16 19:36:27', '2024-01-16 19:36:27'),
(24, 'ipsam', 13, NULL, NULL, '2024-01-16 19:36:27', '2024-01-16 19:36:27'),
(25, 'facere', 8, NULL, NULL, '2024-01-16 19:36:27', '2024-01-16 19:36:27'),
(26, 'delectus', 12, NULL, NULL, '2024-01-16 19:36:27', '2024-01-16 19:36:27'),
(27, 'sint', 17, NULL, NULL, '2024-01-16 19:36:27', '2024-01-16 19:36:27'),
(28, 'corporis', 11, NULL, NULL, '2024-01-16 19:36:27', '2024-01-16 19:36:27'),
(29, 'et', 16, NULL, NULL, '2024-01-16 19:36:27', '2024-01-16 19:36:27'),
(30, 'ipsum', 28, NULL, NULL, '2024-01-16 19:36:27', '2024-01-16 19:36:27');

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

--
-- Dumping data for table `periode`
--

INSERT INTO `periode` (`id`, `libelle`, `createdAt`, `updatedAt`) VALUES
(1, 'Semestre 1 - 2023-2024', '2024-02-18 15:40:11', '2024-02-18 15:40:12'),
(2, 'Semestre 2 - 2023-2024', '2024-02-18 15:40:28', '2024-02-18 15:40:30');

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

--
-- Dumping data for table `professeur`
--

INSERT INTO `professeur` (`id`, `vacataire`, `createdAt`, `updatedAt`, `utilisateurId`) VALUES
(1, 0, '2024-01-16 19:35:40', '2024-03-21 10:00:03', 1),
(2, 0, '2024-01-16 19:35:40', '2024-03-20 22:24:55', 5),
(3, 0, '2024-01-16 19:35:40', '2024-01-16 19:35:40', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `professeur_module`
--

CREATE TABLE `professeur_module` (
  `professeurId` int NOT NULL,
  `moduleId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `professeur_module`
--

INSERT INTO `professeur_module` (`professeurId`, `moduleId`) VALUES
(1, 2),
(1, 4),
(1, 5);

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

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`id`, `label`, `description`, `createdAt`, `updatedAt`) VALUES
(1, 'ROLE_USER', 'Ceci est le role utilisateur de base', '2024-02-26 10:19:47', '2024-02-26 10:19:47'),
(2, 'ROLE_SECRETARY', 'Role secrétaire', '2024-02-26 10:19:47', '2024-02-26 10:19:47'),
(3, 'ROLE_PROFESSOR', 'Role professeur', '2024-02-26 10:19:47', '2024-02-26 10:19:47'),
(4, 'ROLE_ADMIN', 'Role admnistateur', '2024-02-26 10:19:47', '2024-02-26 10:19:47'),
(5, 'ROLE_SUPERADMIN', 'Role super administrateur', '2024-02-26 10:19:47', '2024-02-26 10:19:47'),
(6, 'ROLE_DIRECTOR', 'Role directeur d\'étude', '2024-02-26 12:10:07', '2024-02-26 12:10:07'),
(7, 'ROLE_DEPARTMENT_DIRECTOR', 'Role directeur de département', '2024-03-07 17:08:08', '2024-03-07 17:08:08');

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

--
-- Dumping data for table `secretaire`
--

INSERT INTO `secretaire` (`id`, `createdAt`, `updatedAt`, `utilisateurId`) VALUES
(1, '2024-01-16 19:35:35', '2024-03-04 11:17:04', 1);

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20240117220516-CreateUsersTable.js'),
('20240118141156-add-associations.js'),
('20240218142739-migration_eval.js'),
('20240226094159-CreateRoleTable.js'),
('20240226095102-CreateUserRoleAssociation.js'),
('20240226095916-RemoveRoleFieldFromUser.js'),
('20240226140921-CreateChatTable.js'),
('20240227190334-addRetardFields.js'),
('20240229194552-add_status_to_note.js'),
('20240307155028-addSendFields.js'),
('20240307173720-add_director.js'),
('20240307173720-change-user-table.js'),
('20240313170043-add_formation_to_message.js'),
('20240315180018-addCallFieldToCours.js'),
('20240315180801-removePresencesFieldFromProfModule.js'),
('20240318101100-create-utilisateurs-eav.js'),
('20240318102724-add_delegue_to_eleve.js'),
('20240319141021-change_delegue_column_type.js'),
('20240321133823-add_color_to_module.js');

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

--
-- Dumping data for table `statut_note`
--

INSERT INTO `statut_note` (`id`, `libelle`, `createdAt`, `updatedAt`) VALUES
(1, 'Absent', '2024-02-29 20:54:27', '2024-02-29 20:54:28'),
(2, 'Rattrapage', '2024-02-29 20:54:39', '2024-02-29 20:54:40'),
(3, 'Non noté', '2024-02-29 20:55:08', '2024-02-29 20:55:08'),
(4, 'Dispensé', '2024-02-29 20:55:20', '2024-02-29 20:55:21'),
(5, 'Non rendu', '2024-02-29 20:55:36', '2024-02-29 20:55:37'),
(6, 'En attente de rattrapage', '2024-02-29 20:55:50', '2024-02-29 20:55:51');

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

--
-- Dumping data for table `utilisateur`
--

INSERT INTO `utilisateur` (`id`, `email`, `mdp`, `premiereConnexion`, `createdAt`, `updatedAt`, `nom`, `prenom`) VALUES
(1, 'lucas26.leveque@gmail.com', '8d0a3e569b0ecec1eddfd4f6088fa0abf6f26ef5e427c6ea56f25554f26cef95', 0, '2024-01-19 10:54:35', '2024-03-22 11:49:27', 'LEVEQUE', 'Lucas'),
(2, 'lucas.leveque@edu.univ-eiffel.fr', '31f7a65e315586ac198bd798b6629ce4903d0899476d5741a9f32e2e521b6a66', 0, '2024-03-07 17:09:43', '2024-03-07 17:09:43', 'LEVEQUE', 'Lucas2'),
(3, 'jimmy.blanc@gmail.com', 'ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb', 0, '2024-03-07 18:59:43', '2024-03-07 18:59:43', 'BLANC', 'Jimmy'),
(4, 'emile.martin@gmail.com', 'ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb', 0, '2024-03-07 18:59:43', '2024-03-07 18:59:43', 'MARTIN', 'Emile'),
(5, 'michel.doe@gmail.com', 'ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb', 0, '2024-03-07 18:59:43', '2024-03-07 18:59:43', 'DOE', 'Michel'),
(6, 'kylian.rani@gmail.com', 'ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb', 0, '2024-03-07 18:59:43', '2024-03-07 18:59:43', 'RANI', 'Kylian'),
(7, 'karim.rila@gmail.com', 'ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb', 0, '2024-03-07 18:59:43', '2024-03-07 18:59:43', 'RILA', 'Karim'),
(8, 'etienne.ciret@gmail.com', 'ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb', 0, '2024-03-07 18:59:43', '2024-03-07 18:59:43', 'CIRET', 'Etienne'),
(9, 'luc.pirrel@gmail.com', 'ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb', 0, '2024-03-07 18:59:43', '2024-03-07 18:59:43', 'PIRREL', 'Luc'),
(10, 'patrick.rigal@gmail.com', 'ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb', 0, '2024-03-07 18:59:43', '2024-03-07 18:59:43', 'RIGAL', 'Patrick'),
(11, 'patrice.dufour@gmail.com', 'ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb', 0, '2024-03-07 18:59:43', '2024-03-07 18:59:43', 'DUFOUR', 'Patrice'),
(12, 'paul.durand@gmail.com', 'ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb', 0, '2024-03-07 18:59:43', '2024-03-07 18:59:43', 'DURAND', 'Paul'),
(13, 'phil.mignard@gmail.com', 'ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb', 0, '2024-03-07 18:59:43', '2024-03-07 18:59:43', 'MIGNARD', 'Phil'),
(14, 'jean.bassot@gmail.com', 'ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb', 0, '2024-03-07 18:59:43', '2024-03-07 18:59:43', 'BASSOT', 'Jean'),
(15, 'eric.gilles@gmail.com', 'ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb', 0, '2024-03-07 18:59:43', '2024-03-07 18:59:43', 'GILLEs', 'Eric'),
(16, 'ophélie.kleber@gmail.com', 'ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb', 0, '2024-03-07 18:59:43', '2024-03-07 18:59:43', 'KLEBER', 'Ophélie'),
(17, 'patrice.beaulieu@gmail.com', 'ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb', 0, '2024-03-07 18:59:43', '2024-03-07 18:59:43', 'BEAULIEU', 'Patrice'),
(18, 'ilyas.soyer@gmail.com', 'ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb', 0, '2024-03-07 18:59:43', '2024-03-07 18:59:43', 'SOYER', 'Ilyas'),
(19, 'lisa.gaudin@gmail.com', 'ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb', 0, '2024-03-07 18:59:43', '2024-03-07 18:59:43', 'GAUDIN', 'Lisa'),
(20, 'max.tourneur@gmail.com', 'ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb', 0, '2024-03-07 18:59:43', '2024-03-07 18:59:43', 'TOURNEUR', 'Max'),
(21, 'maxime.courtet@gmail.com', 'ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb', 0, '2024-03-07 18:59:43', '2024-03-07 18:59:43', 'COURTET', 'Maxime'),
(22, 'gilles.duval@gmail.com', 'ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb', 0, '2024-03-07 18:59:43', '2024-03-07 18:59:43', 'DUVAL', 'Gilles'),
(23, 'patricia.fresnel@gmail.com', 'ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb', 0, '2024-03-07 18:59:43', '2024-03-07 18:59:43', 'FRESNEL', 'Patricia'),
(24, 'antoine.gerard@gmail.com', 'ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb', 0, '2024-03-07 18:59:43', '2024-03-07 18:59:43', 'GERARD', 'Antoine'),
(25, 'liam.bonnet@gmail.com', 'ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb', 0, '2024-03-07 18:59:43', '2024-03-07 18:59:43', 'BONNET', 'Liam'),
(26, 'blanche.lebas@gmail.com', 'ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb', 0, '2024-03-07 18:59:43', '2024-03-07 18:59:43', 'LEBAS', 'Blanche'),
(27, 'alex.kidd@test.com', NULL, 1, '2024-03-22 10:21:02', '2024-03-22 11:59:41', 'Kidd', 'Alex'),
(28, 'patrick.sebastien@gmail.com', NULL, 1, '2024-03-22 10:21:54', '2024-03-22 11:59:41', 'Sébastien', 'Patrick'),
(29, 'jean.michel1@outlook.fr', NULL, 1, '2024-03-22 10:21:54', '2024-03-22 11:59:41', 'Michel', 'Jean');

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

--
-- Dumping data for table `utilisateurs_eav`
--

INSERT INTO `utilisateurs_eav` (`id`, `utilisateurId`, `attribute`, `value`, `createdAt`) VALUES
(1, 1, 'verificationCode', '170040', '2024-03-21 21:47:43'),
(2, 1, 'verificationCode', '683802', '2024-03-21 21:47:45');

-- --------------------------------------------------------

--
-- Table structure for table `utilisateur_role`
--

CREATE TABLE `utilisateur_role` (
  `UtilisateurId` int NOT NULL,
  `RoleId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `utilisateur_role`
--

INSERT INTO `utilisateur_role` (`UtilisateurId`, `RoleId`) VALUES
(1, 1),
(27, 1),
(28, 1),
(29, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(2, 7);

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
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `bloc_competence`
--
ALTER TABLE `bloc_competence`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `cours`
--
ALTER TABLE `cours`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `directeur`
--
ALTER TABLE `directeur`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `eleve`
--
ALTER TABLE `eleve`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `evaluation`
--
ALTER TABLE `evaluation`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT for table `formation`
--
ALTER TABLE `formation`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `groupe`
--
ALTER TABLE `groupe`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `message`
--
ALTER TABLE `message`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `module_cours`
--
ALTER TABLE `module_cours`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `note`
--
ALTER TABLE `note`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=212;

--
-- AUTO_INCREMENT for table `notification`
--
ALTER TABLE `notification`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `periode`
--
ALTER TABLE `periode`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `professeur`
--
ALTER TABLE `professeur`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `secretaire`
--
ALTER TABLE `secretaire`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `statut_note`
--
ALTER TABLE `statut_note`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `utilisateur`
--
ALTER TABLE `utilisateur`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `utilisateurs_eav`
--
ALTER TABLE `utilisateurs_eav`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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
