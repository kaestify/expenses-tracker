CREATE DATABASE  IF NOT EXISTS `expensetrackerdatabase`;
USE `expensetrackerdatabase`;

DROP TABLE IF EXISTS `goal`;
CREATE TABLE `goal` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `user_email` varchar(45) DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `date` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;


UNLOCK TABLES;




