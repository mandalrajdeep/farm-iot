# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.19)
# Database: sensors
# Generation Time: 2017-10-10 04:41:50 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

# Dump of table users
# ------------------------------------------------------------

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `email`, `password`)
VALUES
	('57551fbf-adbc-4179-9d50-c37142580a46','farmer1','$2a$08$PFuJRuH/3Wu/0iMZx7Do0.4el4hfA2Y7yElUzNo0DF2/Y8CzF35K6'),
	('a626dcc5-c4e4-4c72-aabe-e7e1c6df034b','farmer2','$2a$08$d35tdRjYfEDQfW2yvanyJOxjxCCOyzkoj0bSvJF3J9yN6C1owjghi'),
	('f54eaa2f-ab2b-48e6-bade-4d98ad2215e2','farmer3','$2a$08$Za7Icv1/X2mCuykFIpYXTOBeZPOx5iRtUvnz0i8CAPOLOmLUCpHIS');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table reading
# ------------------------------------------------------------

LOCK TABLES `reading` WRITE;
/*!40000 ALTER TABLE `reading` DISABLE KEYS */;

INSERT INTO `reading` (`id`, `sensorID`, `timestamp`, `result`, `moisture`, `notes`)
VALUES
	(16,1829702,'2017-08-25 00:10:00','2017-09-01 09:00:00',70,'fine'),
	(17,1829702,'2017-08-25 00:15:00','2017-09-02 09:00:00',70,'fine'),
	(18,1829702,'2017-08-25 00:20:00','2017-09-05 09:00:00',60,'fine'),
	(19,1829702,'2017-08-25 00:40:00','2017-09-03 09:00:00',70,'fine'),
	(20,1829702,'2017-08-25 00:50:00','2017-09-03 09:00:00',50,'fine'),
	(21,6102366,'2017-08-25 00:10:00','2017-09-01 09:00:00',70,'fine'),
	(22,6102366,'2017-08-25 00:15:00','2017-09-02 09:00:00',70,'fine'),
	(23,6102366,'2017-08-25 00:20:00','2017-09-05 09:00:00',60,'fine'),
	(24,6102366,'2017-08-25 00:40:00','2017-09-03 09:00:00',70,'fine'),
	(25,6102366,'2017-08-25 00:50:00','2017-09-03 09:00:00',50,'fine'),
	(26,1829702,'2017-07-25 00:20:00','2017-09-01 09:00:00',70,'fine'),
	(27,1829702,'2017-07-25 00:53:00','2017-09-01 09:00:00',70,'fine'),
	(28,2524815,'2017-10-09 17:43:25','2017-10-09 17:43:25',100,NULL);

/*!40000 ALTER TABLE `reading` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table sensor
# ------------------------------------------------------------

LOCK TABLES `sensor` WRITE;
/*!40000 ALTER TABLE `sensor` DISABLE KEYS */;

INSERT INTO `sensor` (`id`, `farmID`, `active`, `notes`, `farmCount`)
VALUES
	(1111111,'57551fbf-adbc-4179-9d50-c37142580a46',1,'test',1),
	(1829702,'57551fbf-adbc-4179-9d50-c37142580a46',1,'test',2),
	(2524815,'57551fbf-adbc-4179-9d50-c37142580a46',1,'New Sensor',6),
	(6102366,'57551fbf-adbc-4179-9d50-c37142580a46',0,'test',3),
	(8792813,'57551fbf-adbc-4179-9d50-c37142580a46',1,'New Sensor',4),
	(9404015,'57551fbf-adbc-4179-9d50-c37142580a46',0,'New Sensor',5);

/*!40000 ALTER TABLE `sensor` ENABLE KEYS */;
UNLOCK TABLES;

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
