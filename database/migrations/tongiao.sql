CREATE TABLE `religion` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
);

--
-- Dumping data for table `devvn_tinhthanhpho`
--

INSERT INTO `religion` (`name`) VALUES
("Phật giáo"),
("Công giáo"),
("Cao Đài"),
("Hòa Hảo"),
("Tin Lành"),
("Hồi Giáo"),
("Bà La Môn"),
("Tôn giáo khác");