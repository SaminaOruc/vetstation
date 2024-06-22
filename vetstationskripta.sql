CREATE DATABASE  IF NOT EXISTS `vetstation` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `vetstation`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: vetstation
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employees` (
  `id` int NOT NULL AUTO_INCREMENT,
  `address` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `hireDate` date DEFAULT NULL,
  `pay` float DEFAULT NULL,
  `userId` int DEFAULT NULL,
  `stationId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_employee_userId_idx` (`userId`),
  KEY `fk_employee_stationId_idx` (`stationId`),
  CONSTRAINT `fk_employee_stationId` FOREIGN KEY (`stationId`) REFERENCES `stations` (`id`),
  CONSTRAINT `fk_employee_userId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES (1,'Zenica1','Zenica','2024-06-22',3000,2,1),(2,'Zenica2','Zenica','2024-03-05',2500,3,1),(3,'Sarajevo1','Sarajevo','2024-04-18',2000,4,1),(4,'Sarajevo2','Sarajevo','2024-04-05',3500,5,1),(5,'Visoko1','Visoko','2024-05-22',2500,6,1);
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipments`
--

DROP TABLE IF EXISTS `equipments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `equipments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `addedDate` date DEFAULT NULL,
  `stationId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_stationId_idx` (`stationId`),
  CONSTRAINT `fk_stationId` FOREIGN KEY (`stationId`) REFERENCES `stations` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipments`
--

LOCK TABLES `equipments` WRITE;
/*!40000 ALTER TABLE `equipments` DISABLE KEYS */;
INSERT INTO `equipments` VALUES (1,'Rukavice',2,10,'2024-06-22',1);
/*!40000 ALTER TABLE `equipments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medical_records`
--

DROP TABLE IF EXISTS `medical_records`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medical_records` (
  `id` int NOT NULL AUTO_INCREMENT,
  `animalName` varchar(45) DEFAULT NULL,
  `species` varchar(45) DEFAULT NULL,
  `domestic` varchar(45) DEFAULT NULL,
  `age` int DEFAULT NULL,
  `month` int DEFAULT NULL,
  `alergies` varchar(150) DEFAULT NULL,
  `vaccination` varchar(150) DEFAULT NULL,
  `userId` int DEFAULT NULL,
  `employeeId` int DEFAULT NULL,
  `stationId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_records_userId_idx` (`userId`),
  KEY `fk_records_employeeId_idx` (`employeeId`),
  KEY `fk_records_stationId_idx` (`stationId`),
  CONSTRAINT `fk_records_employeeId` FOREIGN KEY (`employeeId`) REFERENCES `employees` (`id`),
  CONSTRAINT `fk_records_stationId` FOREIGN KEY (`stationId`) REFERENCES `stations` (`id`),
  CONSTRAINT `fk_records_userId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medical_records`
--

LOCK TABLES `medical_records` WRITE;
/*!40000 ALTER TABLE `medical_records` DISABLE KEYS */;
INSERT INTO `medical_records` VALUES (1,'Beti','Macka','YES',2,3,'Nema','Nema',7,4,1);
/*!40000 ALTER TABLE `medical_records` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medicines`
--

DROP TABLE IF EXISTS `medicines`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medicines` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `price` float DEFAULT NULL,
  `category` varchar(45) DEFAULT NULL,
  `producer` varchar(45) DEFAULT NULL,
  `stationId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_stationId_idx` (`stationId`),
  CONSTRAINT `fk_medicines_stationId` FOREIGN KEY (`stationId`) REFERENCES `stations` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medicines`
--

LOCK TABLES `medicines` WRITE;
/*!40000 ALTER TABLE `medicines` DISABLE KEYS */;
INSERT INTO `medicines` VALUES (1,'Tablete',15,10,'Antibiotics','ZeniLijek',1);
/*!40000 ALTER TABLE `medicines` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `receipts`
--

DROP TABLE IF EXISTS `receipts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `receipts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usage` varchar(250) DEFAULT NULL,
  `issueDate` date DEFAULT NULL,
  `medicineId` int DEFAULT NULL,
  `recordId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_receipts_medicineId_idx` (`medicineId`),
  KEY `fk_receipts_recordtId_idx` (`recordId`),
  CONSTRAINT `fk_receipts_medicineId` FOREIGN KEY (`medicineId`) REFERENCES `medicines` (`id`),
  CONSTRAINT `fk_receipts_recordtId` FOREIGN KEY (`recordId`) REFERENCES `medical_records` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `receipts`
--

LOCK TABLES `receipts` WRITE;
/*!40000 ALTER TABLE `receipts` DISABLE KEYS */;
INSERT INTO `receipts` VALUES (1,'Dva puta dnevno','2024-06-22',1,1);
/*!40000 ALTER TABLE `receipts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reports`
--

DROP TABLE IF EXISTS `reports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reports` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(150) DEFAULT NULL,
  `content` varchar(400) DEFAULT NULL,
  `creationDate` date DEFAULT NULL,
  `priority` varchar(45) DEFAULT NULL,
  `employeeId` int DEFAULT NULL,
  `stationId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_reports_employeeId_idx` (`employeeId`),
  KEY `fk_reports_stationId_idx` (`stationId`),
  CONSTRAINT `fk_reports_employeeId` FOREIGN KEY (`employeeId`) REFERENCES `employees` (`id`),
  CONSTRAINT `fk_reports_stationId` FOREIGN KEY (`stationId`) REFERENCES `stations` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reports`
--

LOCK TABLES `reports` WRITE;
/*!40000 ALTER TABLE `reports` DISABLE KEYS */;
INSERT INTO `reports` VALUES (1,'Zaposljavanje','Zaposlen veterinar','2024-04-05','HIGH',3,1);
/*!40000 ALTER TABLE `reports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `requests`
--

DROP TABLE IF EXISTS `requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `requests` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(250) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `diagnosis` varchar(250) DEFAULT NULL,
  `creationDate` date DEFAULT NULL,
  `arrivalDate` datetime DEFAULT NULL,
  `userId` int DEFAULT NULL,
  `recordId` int DEFAULT NULL,
  `employeeId` int DEFAULT NULL,
  `stationId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_requests_userId_idx` (`userId`),
  KEY `fk_requests_recordId_idx` (`recordId`),
  KEY `fk_requests_employeeId_idx` (`employeeId`),
  KEY `fk_requests_stationId_idx` (`stationId`),
  CONSTRAINT `fk_requests_employeeId` FOREIGN KEY (`employeeId`) REFERENCES `employees` (`id`),
  CONSTRAINT `fk_requests_recordId` FOREIGN KEY (`recordId`) REFERENCES `medical_records` (`id`),
  CONSTRAINT `fk_requests_stationId` FOREIGN KEY (`stationId`) REFERENCES `stations` (`id`),
  CONSTRAINT `fk_requests_userId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `requests`
--

LOCK TABLES `requests` WRITE;
/*!40000 ALTER TABLE `requests` DISABLE KEYS */;
INSERT INTO `requests` VALUES (1,'Pregled mace',NULL,'CREATED',NULL,'2024-06-22',NULL,7,1,NULL,1);
/*!40000 ALTER TABLE `requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stations`
--

DROP TABLE IF EXISTS `stations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `address` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `profit` float DEFAULT NULL,
  `creationDate` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stations`
--

LOCK TABLES `stations` WRITE;
/*!40000 ALTER TABLE `stations` DISABLE KEYS */;
INSERT INTO `stations` VALUES (1,'Zenica 12','Zenica','Zeni Vet',0,'2024-06-06');
/*!40000 ALTER TABLE `stations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(45) DEFAULT NULL,
  `nickname` varchar(45) DEFAULT NULL,
  `firstname` varchar(45) DEFAULT NULL,
  `lastname` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `role` varchar(45) DEFAULT NULL,
  `birthDate` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `nickname_UNIQUE` (`nickname`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'vlasnik@gmail.com','vlasnik','Vlasnik','Vlasnik','Vlasnik12345678','OWNER',NULL),(2,'menadzer@gmail.com','menadzer','Menadzer','Menadzer','Menadzer12345678','MANAGER','2024-05-12'),(3,'finansije@gmail.com','finansije','Finansije','Finansije','Finansije12345678','FINANCE','2024-03-13'),(4,'hr@gmail.com','hr','Hr','Hr','HumanR12345678','HR','2024-04-09'),(5,'veterinar@gmail.com','veterinar','Veterinar','Veterinar','Veterinar12345678','VET','2024-04-02'),(6,'vettech@gmail.com','vettech','VetTech','VetTech','VetTech12345678','VETTECH','2024-02-03'),(7,'korisnik@gmail.com','korisnik','Korisnik','Korisnik','Korisnik12345678','USER','2024-03-01');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'vetstation'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-22 21:46:24
