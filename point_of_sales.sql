-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 18, 2019 at 03:36 PM
-- Server version: 10.3.16-MariaDB
-- PHP Version: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `point_of_sales`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(4) NOT NULL,
  `name` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`) VALUES
(1, 'Food'),
(2, 'Beverage');

-- --------------------------------------------------------

--
-- Table structure for table `history`
--

CREATE TABLE `history` (
  `id` int(11) NOT NULL,
  `invoice` varchar(50) NOT NULL,
  `username` varchar(25) NOT NULL,
  `date` datetime NOT NULL,
  `product_name` varchar(50) NOT NULL,
  `price` int(11) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `history`
--

INSERT INTO `history` (`id`, `invoice`, `username`, `date`, `product_name`, `price`, `quantity`) VALUES
(13, '20191014163410', 'jum', '2018-08-14 16:34:10', 'Ayam Bakar', 14000, 3),
(14, '20191014163410', 'jum', '2018-08-14 16:34:10', 'Jus Mangga', 8000, 2),
(15, '20191014163416', 'jum', '2019-09-14 16:34:16', 'Rendang', 13000, 1),
(16, '20191014163416', 'jum', '2019-09-14 16:34:16', 'Telur Bulat', 6000, 1),
(17, '20191014163416', 'jum', '2019-09-14 16:34:16', 'Jus Melon', 9000, 1),
(18, '20191014171607', 'jum', '2019-10-10 17:16:07', 'Ayam Bakar', 14000, 2),
(19, '20191014171607', 'jum', '2019-10-10 17:16:07', 'Jus Mangga', 8000, 3),
(20, '20191014171607', 'jum', '2019-10-10 17:16:07', 'Rendang', 13000, 1),
(21, '20191014175820', 'jum', '2019-10-14 17:58:20', 'Ayam Bakar', 14000, 2),
(22, '20191014175820', 'jum', '2019-10-14 17:58:20', 'Jus Mangga', 8000, 3),
(23, '20191014190439', 'jum', '2019-10-17 19:04:39', 'Ayam Bakar', 14000, 1),
(24, '20191014190439', 'jum', '2019-10-17 19:04:39', 'Jus Mangga', 8000, 3),
(25, '20191014190439', 'jum', '2019-10-17 19:04:39', 'Rendang', 13000, 2),
(26, '20191017222335', 'jum', '2019-10-18 22:23:35', 'Ayam Bakar', 14000, 1),
(27, '20191017222335', 'jum', '2019-10-18 22:23:35', 'Jus Mangga', 8000, 1),
(28, '20191018073322', 'jum', '2019-10-18 07:33:22', 'Jus Mangga', 8000, 1),
(29, '20191018073322', 'jum', '2019-10-18 07:33:22', 'Ayam Bakar', 14000, 1),
(30, '20191018081145', 'jum', '2019-10-18 08:11:45', 'Rendang', 13000, 1),
(31, '20191018081145', 'jum', '2019-10-18 08:11:45', 'Jus Melon', 9000, 1),
(32, '20191018133428', 'jum', '2019-10-18 13:34:28', 'Telur Dadar', 8000, 1),
(33, '20191018133428', 'jum', '2019-10-18 13:34:28', 'Jus Melon', 9000, 1),
(34, '20191018134147', 'jum', '2019-10-18 13:41:47', 'Telur Dadar', 8000, 1),
(35, '20191018134147', 'jum', '2019-10-18 13:41:47', 'Jus Melon', 9000, 1);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(6) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(150) DEFAULT NULL,
  `image` text DEFAULT NULL,
  `id_category` int(6) NOT NULL,
  `price` int(11) NOT NULL,
  `stock` int(11) NOT NULL,
  `date_added` datetime DEFAULT NULL,
  `date_updated` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `name`, `description`, `image`, `id_category`, `price`, `stock`, `date_added`, `date_updated`) VALUES
(1, 'Rendang', 'Best food in the world from Indonesia.', '20191010113435_rendang.jpg', 1, 13000, 321, '2019-10-10 11:34:35', NULL),
(2, 'Ayam Bakar', 'Chicken', '20191010113435_ayam-bakar.jpg', 1, 14000, 120, '2019-10-10 11:34:35', NULL),
(3, 'Telur Bulat', 'Egg Circle', '20191010113435_telur-bulat.jpg', 1, 6000, 5, '2019-10-10 11:34:35', '2019-10-10 11:34:35'),
(4, 'Jus Melon', 'Juice', '20191010113435_jus-melon.jpg', 2, 9000, 12, '2019-10-10 11:34:35', '2019-10-10 11:34:35'),
(5, 'Jus Mangga', 'Mango Juice', '20191010113435_jus-mangga.jpg', 2, 8000, 123, '2019-10-10 11:34:35', NULL),
(6, 'Telur Dadar', 'Dadar Egg', '20191014135822_telur-dadar.jpg', 1, 8000, 2, '2019-10-14 13:58:22', '2019-10-14 13:58:22');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`) VALUES
(1, 'jum', '$2b$10$GOdLQIMl4aQRqxK.H0s9sOvOP0LxBnhfEJBRHVfTdACM4MuYC1S0m'),
(2, 'jumaidilfadillah', '$2b$10$iU1/RZTcxkluR2gKE8TPpeSpJKEvq5Rb/PF8Sz0iu95AMvFrum5oe');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_category` (`id_category`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `history`
--
ALTER TABLE `history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`id_category`) REFERENCES `category` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
