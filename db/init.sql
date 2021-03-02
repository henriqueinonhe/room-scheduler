CREATE TABLE `Users` (
  `userName` varchar(200) NOT NULL,
  `passwordHash` varchar(64) NOT NULL,
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `role` enum('admin','common') NOT NULL,
  `createdAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Rooms` (
  `name` varchar(100) NOT NULL,
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
  `fkUsers` int unsigned NOT NULL,
  `fkRooms` int unsigned NOT NULL,
  `startDate` datetime NOT NULL,
  `endDate` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Allocations_FK` (`fkUsers`),
  KEY `Allocations_FK_1` (`fkRooms`),
  CONSTRAINT `Allocations_FK` FOREIGN KEY (`fkUsers`) REFERENCES `Users` (`id`),
  CONSTRAINT `Allocations_FK_1` FOREIGN KEY (`fkRooms`) REFERENCES `Rooms` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;