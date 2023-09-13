-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 13, 2023 at 12:04 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `peopledb`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `ID_category` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `img_src` varchar(128) DEFAULT '',
  `FK_countries` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`ID_category`, `name`, `img_src`, `FK_countries`) VALUES
(1, 'Pilot', 'assets/icon-rocket.png', 1),
(2, 'Politik', 'assets/icon-politician.png', 1),
(3, 'Znanstvenik', 'assets/icon-science.png', 1),
(4, 'Podjetje', 'assets/icon-company.png', 1),
(5, 'Pilot', 'assets/icon-rocket.png', 2),
(6, 'Politik', 'assets/icon-politician.png', 2),
(7, 'Znanstvenik', 'assets/icon-science.png', 2),
(8, 'Podjetje', 'assets/icon-company.png', 2),
(9, 'Pilot', 'assets/icon-rocket.png', 3),
(10, 'Politik', 'assets/icon-politician.png', 3),
(11, 'Znanstvenik', 'assets/icon-science.png', 3),
(12, 'Podjetje', 'assets/icon-company.png', 3),
(13, 'Pilot', 'assets/icon-rocket.png', 4),
(14, 'Politik', 'assets/icon-politician.png', 4),
(15, 'Znanstvenik', 'assets/icon-science.png', 4),
(16, 'Podjetje', 'assets/icon-company.png', 4),
(17, 'Pilot', 'assets/icon-rocket.png', 5),
(18, 'Politik', 'assets/icon-politician.png', 5),
(19, 'Znanstvenik', 'assets/icon-science.png', 5),
(20, 'Podjetje', 'assets/icon-company.png', 5),
(21, 'Pilot', 'assets/icon-rocket.png', 6),
(22, 'Politik', 'assets/icon-politician.png', 6),
(23, 'Znanstvenik', 'assets/icon-science.png', 6),
(24, 'Podjetje', 'assets/icon-company.png', 6),
(25, 'Pilot', 'assets/icon-rocket.png', 7),
(26, 'Politik', 'assets/icon-politician.png', 7),
(27, 'Znanstvenik', 'assets/icon-science.png', 7),
(28, 'Podjetje', 'assets/icon-company.png', 7);

-- --------------------------------------------------------

--
-- Table structure for table `countries`
--

CREATE TABLE `countries` (
  `ID_countries` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `img_src` varchar(128) DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `countries`
--

INSERT INTO `countries` (`ID_countries`, `name`, `img_src`) VALUES
(1, 'Kitajska', 'assets/china-flag.png'),
(2, 'Evropa', 'assets/europe-flag.png'),
(3, 'Indija', 'assets/india-flag.png'),
(4, 'Japonska', 'assets/japan-flag.png'),
(5, 'Rusija', 'assets/russia-flag.png'),
(6, 'Združeni Arabski Emirati', 'assets/uae-flag.png'),
(7, 'Združeno kraljestvo', 'assets/uk-flag.png');

-- --------------------------------------------------------

--
-- Table structure for table `info`
--

CREATE TABLE `info` (
  `ID_info` int(11) NOT NULL,
  `text` longtext NOT NULL,
  `img_src` varchar(128) DEFAULT '',
  `FK_people` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `people`
--

CREATE TABLE `people` (
  `ID_people` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `img_src` varchar(128) DEFAULT '',
  `FK_category` int(11) NOT NULL,
  `text` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `people`
--

INSERT INTO `people` (`ID_people`, `name`, `img_src`, `FK_category`, `text`) VALUES
(1, 'Yuri Gagarin', 'assets/yuri-gagarin.png', 1, 'Yuri Gagarin, in full Yuri Alekseyevich Gagarin, (born March 9, 1934, near Gzhatsk, Russia, U.S.S.R. [now Gagarin, Russia]—died March 27, 1968, near Moscow), Soviet cosmonaut who in 1961 became the first man to travel into space.\r\n\r\nThe son of a carpenter on a collective farm, Gagarin graduated as a molder from a trade school near Moscow in 1951. He continued his studies at the industrial college at Saratov and concurrently took a course in flying. On completing this course, he entered the Soviet Air Force cadet school at Orenburg, from which he graduated in 1957.'),
(2, 'Neil Armstrong', 'assets/neil-armstrong.png', 1, NULL),
(3, 'Valentina Tereshkova', 'assets/valentina-tereshkova.png', 1, NULL),
(4, 'Alan Shepard', 'assets/alan-shepard.png', 1, NULL),
(5, 'John Glenn', 'assets/john-glenn.png', 1, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`ID_category`),
  ADD KEY `TK_category` (`FK_countries`);

--
-- Indexes for table `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`ID_countries`);

--
-- Indexes for table `info`
--
ALTER TABLE `info`
  ADD PRIMARY KEY (`ID_info`),
  ADD KEY `TK_info1` (`FK_people`);

--
-- Indexes for table `people`
--
ALTER TABLE `people`
  ADD PRIMARY KEY (`ID_people`),
  ADD KEY `TK_people1` (`FK_category`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `ID_category` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `countries`
--
ALTER TABLE `countries`
  MODIFY `ID_countries` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `info`
--
ALTER TABLE `info`
  MODIFY `ID_info` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `people`
--
ALTER TABLE `people`
  MODIFY `ID_people` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `category`
--
ALTER TABLE `category`
  ADD CONSTRAINT `TK_category` FOREIGN KEY (`FK_countries`) REFERENCES `countries` (`ID_countries`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `info`
--
ALTER TABLE `info`
  ADD CONSTRAINT `TK_info1` FOREIGN KEY (`FK_people`) REFERENCES `people` (`ID_people`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `people`
--
ALTER TABLE `people`
  ADD CONSTRAINT `TK_people1` FOREIGN KEY (`FK_category`) REFERENCES `category` (`ID_category`) ON DELETE CASCADE ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
