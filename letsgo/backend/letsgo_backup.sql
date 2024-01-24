-- MySQL dump 10.13  Distrib 8.1.0, for macos13.3 (arm64)
--
-- Host: localhost    Database: letsgo
-- ------------------------------------------------------
-- Server version	8.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `group_info`
--

DROP TABLE IF EXISTS `group_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `group_info` (
  `id` int NOT NULL AUTO_INCREMENT,
  `group_name` varchar(255) NOT NULL,
  `travel_destination_name` varchar(255) NOT NULL,
  `created_user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `created_id_ibfk_1` (`created_user_id`),
  CONSTRAINT `created_id_ibfk_1` FOREIGN KEY (`created_user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group_info`
--

LOCK TABLES `group_info` WRITE;
/*!40000 ALTER TABLE `group_info` DISABLE KEYS */;
INSERT INTO `group_info` VALUES (1,'Paris Lovers','Paris',1),(2,'Tokyo Explorers','Tokyo',2),(3,'NYC Fans','New York',3),(4,'Adventure Seekers','Paris Eiffel Tower',1),(5,'Liberty Tour Group','Statue of Liberty',2);
/*!40000 ALTER TABLE `group_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `travel_destinations`
--

DROP TABLE IF EXISTS `travel_destinations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `travel_destinations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` text,
  `address` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `travel_destinations`
--

LOCK TABLES `travel_destinations` WRITE;
/*!40000 ALTER TABLE `travel_destinations` DISABLE KEYS */;
INSERT INTO `travel_destinations` VALUES (1,'Paris','City of Light','Paris, France'),(2,'Tokyo','Japanese Capital','Tokyo, Japan'),(3,'New York','The Big Apple','New York, USA'),(4,'Paris Eiffel Tower','Iconic symbol of France.','Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France'),(5,'Statue of Liberty','A colossal neoclassical sculpture on Liberty Island.','New York, NY 10004, United States'),(6,'Great Wall of China','Series of fortifications made of stone, brick.','Huairou District, China');
/*!40000 ALTER TABLE `travel_destinations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_group_mapping`
--

DROP TABLE IF EXISTS `user_group_mapping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_group_mapping` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `group_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_group_mapping_ibfk_1` (`user_id`),
  KEY `user_group_mapping_ibfk_2` (`group_id`),
  CONSTRAINT `user_group_mapping_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `user_group_mapping_ibfk_2` FOREIGN KEY (`group_id`) REFERENCES `group_info` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_group_mapping`
--

LOCK TABLES `user_group_mapping` WRITE;
/*!40000 ALTER TABLE `user_group_mapping` DISABLE KEYS */;
INSERT INTO `user_group_mapping` VALUES (1,1,1),(2,2,2),(3,3,3),(4,1,1),(5,2,2);
/*!40000 ALTER TABLE `user_group_mapping` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_profile_travel_destination_mapping`
--

DROP TABLE IF EXISTS `user_profile_travel_destination_mapping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_profile_travel_destination_mapping` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_profile_id` int DEFAULT NULL,
  `travel_destination_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `travel_destination_id` (`travel_destination_id`),
  KEY `user_profile_id` (`user_profile_id`),
  CONSTRAINT `user_profile_travel_destination_mapping_ibfk_1` FOREIGN KEY (`user_profile_id`) REFERENCES `user_profiles` (`id`),
  CONSTRAINT `user_profile_travel_destination_mapping_ibfk_2` FOREIGN KEY (`travel_destination_id`) REFERENCES `travel_destinations` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_profile_travel_destination_mapping`
--

LOCK TABLES `user_profile_travel_destination_mapping` WRITE;
/*!40000 ALTER TABLE `user_profile_travel_destination_mapping` DISABLE KEYS */;
INSERT INTO `user_profile_travel_destination_mapping` VALUES (1,1,1),(2,2,2),(3,3,3),(4,1,1),(5,2,2);
/*!40000 ALTER TABLE `user_profile_travel_destination_mapping` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_profiles`
--

DROP TABLE IF EXISTS `user_profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_profiles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `address_line_1` varchar(255) DEFAULT NULL,
  `address_line_2` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `zip_code` varchar(20) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `user_profiles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_profiles`
--

LOCK TABLES `user_profiles` WRITE;
/*!40000 ALTER TABLE `user_profiles` DISABLE KEYS */;
INSERT INTO `user_profiles` VALUES (1,'John','Doe','1990-01-01',NULL,NULL,NULL,NULL,NULL,NULL,1),(2,'Jane','Smith','1985-05-15',NULL,NULL,NULL,NULL,NULL,NULL,2),(3,'Alice','Jones','1987-03-10',NULL,NULL,NULL,NULL,NULL,NULL,3);
/*!40000 ALTER TABLE `user_profiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'shaunak4','$2b$10$mXfTC8wXTGehr.ImN9RCJuuHDkyu5QiEjeFvIEVvrIlqgdMJBo7i6'),(2,'john.doe@example.com','password123'),(3,'jane.smith@example.com','password456'),(4,'alice.jones@example.com','password789'),(5,'john.doe@example.com','password123'),(6,'jane.smith@example.com','password123');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-05 13:04:03
