-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 18, 2022 at 07:02 AM
-- Server version: 10.4.16-MariaDB
-- PHP Version: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sourcenode`
--

-- --------------------------------------------------------

--
-- Table structure for table `class`
--

CREATE TABLE `class` (
  `id` int(11) NOT NULL,
  `className` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `class`
--

INSERT INTO `class` (`id`, `className`) VALUES
(1, '10B'),
(3, '10A'),
(4, '10C');

-- --------------------------------------------------------

--
-- Table structure for table `score`
--

CREATE TABLE `score` (
  `id` int(5) NOT NULL,
  `subjectName` varchar(100) NOT NULL,
  `examDate` date NOT NULL,
  `scoreDate` date NOT NULL,
  `score` int(3) NOT NULL,
  `comments` text DEFAULT NULL,
  `studentId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `score`
--

INSERT INTO `score` (`id`, `subjectName`, `examDate`, `scoreDate`, `score`, `comments`, `studentId`) VALUES
(1, 'Maths', '0000-00-00', '2022-10-02', 50, '', 5),
(2, 'English', '0000-00-00', '2022-10-03', 60, '', 5),
(3, 'Science', '0000-00-00', '2022-10-04', 70, '', 5),
(4, 'Science', '0000-00-00', '2022-10-04', 70, '', 6),
(5, 'English', '0000-00-00', '2022-10-04', 80, '', 6),
(6, 'Maths', '0000-00-00', '2022-10-04', 90, '', 6),
(7, 'Maths', '0000-00-00', '2022-10-04', 90, '', 7),
(8, 'English', '0000-00-00', '2022-10-04', 60, '', 7);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(5) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email_id` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(10) NOT NULL,
  `class` varchar(50) DEFAULT NULL,
  `auth_token` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email_id`, `password`, `role`, `class`, `auth_token`) VALUES
(1, 'NK Shivam', 'nk@gmail.com', 'admin', 'admin', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbF9pZCI6Im5rQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiYWRtaW4iLCJpYXQiOjE2NTU0NDg5NjgsImV4cCI6MTY1NTQ1NjE2OH0.79SmzMy23KcjOu7x0DsINS_2yNdAyA4YvYGgeK5AlCU'),
(2, 'shivam', 'shivam@gmail.com', 'shivam', 'teacher', '1', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbF9pZCI6InNoaXZhbUBnbWFpbC5jb20iLCJwYXNzd29yZCI6InNoaXZhbSIsImlhdCI6MTY1NTQ0OTE4OSwiZXhwIjoxNjU1NDU2Mzg5fQ.0srpuvYa2L_pDBfB2BLHHPmTk-Bf9_nx54dKQjzBZlw'),
(5, 'satyam', 'satyam@gmail.com', 'satyam', 'student', '1', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbF9pZCI6InNhdHlhbUBnbWFpbC5jb20iLCJwYXNzd29yZCI6InNhdHlhbSIsImlhdCI6MTY1NTUyNzE2MiwiZXhwIjoxNjU1NTM0MzYyfQ.1NdvNkxm6O07VObyJtDUqBSSzMJEMPdKKX60t1OrkJQ'),
(6, 'abhishek', 'abhishek@gmail.com', 'abhishek', 'student', '1', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbF9pZCI6InNoaXZhbUBnbWFpbC5jb20iLCJwYXNzd29yZCI6InNoaXZhbSIsImlhdCI6MTY1NTM4NjU4MiwiZXhwIjoxNjU1MzkzNzgyfQ.FPVoH41qmwvR8lIjDpsrzlhC39ap2MlAkmsa-Ojt--0'),
(7, 'mohit', 'mohit@gmail.com', 'mohit', 'student', '1', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbF9pZCI6InNoaXZhbUBnbWFpbC5jb20iLCJwYXNzd29yZCI6InNoaXZhbSIsImlhdCI6MTY1NTM4NjU4MiwiZXhwIjoxNjU1MzkzNzgyfQ.FPVoH41qmwvR8lIjDpsrzlhC39ap2MlAkmsa-Ojt--0');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `class`
--
ALTER TABLE `class`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `score`
--
ALTER TABLE `score`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `class`
--
ALTER TABLE `class`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `score`
--
ALTER TABLE `score`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
