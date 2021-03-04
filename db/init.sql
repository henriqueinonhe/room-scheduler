CREATE TABLE `Users` (
  `userName` varchar(200) NOT NULL,
  `passwordHash` varchar(64) NOT NULL,
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `role` enum('admin','common') NOT NULL,
  `createdAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Users_UN` (`userName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Rooms` (
  `name` varchar(100) NOT NULL,
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Rooms_UN` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Sessions` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `sessionId` varchar(64) NOT NULL,
  `fkUser` int unsigned NOT NULL,
  `createdAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Sessions_FK` (`fkUser`),
  CONSTRAINT `Sessions_FK` FOREIGN KEY (`fkUser`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Allocations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `fkUser` int unsigned NOT NULL,
  `fkRoom` int unsigned NOT NULL,
  `startDate` datetime NOT NULL,
  `endDate` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Allocations_FK` (`fkUser`),
  KEY `Allocations_FK_1` (`fkRoom`),
  CONSTRAINT `Allocations_FK` FOREIGN KEY (`fkUser`) REFERENCES `Users` (`id`),
  CONSTRAINT `Allocations_FK_1` FOREIGN KEY (`fkRoom`) REFERENCES `Rooms` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;