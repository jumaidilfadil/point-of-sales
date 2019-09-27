-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 27, 2019 at 06:20 PM
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
(1, 'Samsung'),
(2, 'iPhone'),
(3, 'Huawei'),
(4, 'Xiaomi'),
(5, 'Asus'),
(6, 'Oppo'),
(7, 'Vivo'),
(8, 'Lenovo');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(6) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(150) NOT NULL,
  `image` text NOT NULL,
  `id_category` int(6) NOT NULL,
  `price` int(11) NOT NULL,
  `stock` int(11) NOT NULL,
  `date_added` date DEFAULT NULL,
  `date_updated` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `name`, `description`, `image`, `id_category`, `price`, `stock`, `date_added`, `date_updated`) VALUES
(1, 'Asus Zenfone 5', 'Mid Range Smartphone', 'gambar_zenfone.jpg', 5, 2200000, 8, '2019-09-23', '2019-09-23'),
(2, 'iPhone 11 Pro Max', 'Flagship', '12pro.jpg', 2, 2330000, 25, '2019-09-23', '2019-09-24'),
(3, 'Vivo V17', 'Mid Range Smartphone', 'gambar_zenfone.jpg', 7, 2200000, 14, '2019-09-23', '2019-09-23'),
(4, 'Oppo F15', 'Mid Range Smartphone', '20190927102449_0033.GIF', 6, 4000000, 46, '2019-09-23', '2019-09-27'),
(5, 'Xiaomi Redmi Note 5', 'Low Range Smartphone', 'gambar_zenfone.jpg', 4, 2200000, 8, '2019-09-23', '2019-09-23'),
(6, 'Pocophone', 'Mid Range Smartphone', '12pro.jpg', 4, 2330000, 18, '2019-09-23', '2019-09-24'),
(7, 'Lenovo L123', 'Mid Range Smartphone', 'gambar_zenfone.jpg', 8, 2200000, 7, '2019-09-23', '2019-09-23'),
(8, 'Huawei P30 Pro', 'Flagship', '20190926094358_Magnetic Bubble Memory.jpg', 3, 2200020, 2, '2019-09-26', NULL),
(9, 'Honor 8X', 'Mid Range Smartphone', '20190926213136_22553065_1753580891613434_8874374949925800654_o.jpg', 3, 1230000, 123, '2019-09-26', '2019-09-26');

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
(1, 'jum@gmail.com', '$2b$10$GOdLQIMl4aQRqxK.H0s9sOvOP0LxBnhfEJBRHVfTdACM4MuYC1S0m'),
(2, 'jumaidilfadillah@gmail.com', '$2b$10$iU1/RZTcxkluR2gKE8TPpeSpJKEvq5Rb/PF8Sz0iu95AMvFrum5oe');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
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
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

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
