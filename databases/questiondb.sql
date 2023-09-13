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
-- Database: `questiondb`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `ID_category` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `img_src` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`ID_category`, `name`, `img_src`) VALUES
(1, 'Mars', 'assets/category_mars.png'),
(2, 'Universe', 'assets/category_universe.png'),
(3, 'Earth', 'assets/category_earth.png'),
(4, 'Jupyter', 'assets/category_jupyter.png'),
(5, 'Rockets', 'assets/category_rockets.png');

-- --------------------------------------------------------

--
-- Table structure for table `question_card`
--

CREATE TABLE `question_card` (
  `ID_card` int(11) NOT NULL,
  `question` text NOT NULL,
  `answer_1` varchar(128) NOT NULL,
  `answer_2` varchar(128) NOT NULL,
  `answer_3` varchar(128) NOT NULL,
  `correct_answer` int(11) NOT NULL,
  `FK_category` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `question_card`
--

INSERT INTO `question_card` (`ID_card`, `question`, `answer_1`, `answer_2`, `answer_3`, `correct_answer`, `FK_category`) VALUES
(1, 'What were Neil Armstrong\'s words when he, as the first man, walked on the moon?', 'One small step for mankind, one giant leap for man.', 'It is a great honor and privilegd for us to be here.', 'One small step for man, one giant leap for mankind', 3, 1),
(2, 'What animals did China send to space for development research in 2016?', 'Grasshoppers', 'Mice', 'Cats', 2, 1),
(3, 'A solar eclipse occurs when...', 'the Sun aligns between the Earth and the Moon', 'the Moon aligns between the Sun and the Earth', 'the earth aligns beetween the Moon and the Sun', 2, 1),
(4, 'Why was space research in Japan under severe restrictions in the years immediately following World War II?', 'Due to the U.S.-Japan Mutual Cooperation and Security Treaty', 'Due to lack of budget because of defeat', 'Due to the Japan-China agreement on the suspension of the development of rocket technologies', 1, 1),
(5, 'What is the only moon in the Solar System with an atmosphere dense enough for humans to explore without a pressure suit?', 'Ganymede', 'Titan', 'Europa', 2, 1),
(6, 'What was the frist space telescope that helped us observe planets and galaxies?', 'The James Webb telescope', 'The Hubble telescope', 'The Gran Telescopio Canarias', 2, 1),
(7, 'How many days did Hazza Al Mansouri, the first Arab on the ISS, spend on the National Space Station?', '22', '8', '30', 2, 1),
(8, 'What does the gas giant Jupiter protect us from?', 'Solar radiation', 'Asteroids', 'UV rays', 2, 1),
(9, 'When was the Indian Space Research Organization established?', '1978', '1992', '1969', 3, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`ID_category`);

--
-- Indexes for table `question_card`
--
ALTER TABLE `question_card`
  ADD PRIMARY KEY (`ID_card`),
  ADD KEY `TK_question_card` (`FK_category`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `ID_category` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `question_card`
--
ALTER TABLE `question_card`
  MODIFY `ID_card` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `question_card`
--
ALTER TABLE `question_card`
  ADD CONSTRAINT `TK_question_card` FOREIGN KEY (`FK_category`) REFERENCES `category` (`ID_category`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
