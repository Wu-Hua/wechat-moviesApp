-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: 2019-01-14 02:30:12
-- 服务器版本： 5.7.18
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `movies`
--

-- --------------------------------------------------------

--
-- 表的结构 `comment`
--

CREATE TABLE `comment` (
  `id` int(11) NOT NULL,
  `movie_id` int(11) NOT NULL,
  `user_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `duration` int(5) DEFAULT NULL,
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `comment`
--

INSERT INTO `comment` (`id`, `movie_id`, `user_id`, `user_name`, `user_avatar`, `type`, `content`, `duration`, `create_time`) VALUES
(55, 1, 'op0sB5UXH1yN6PnqHuyNhYxyTc14', '吴华', 'https://wx.qlogo.cn/mmopen/vi_32/eszmWrowibhXJgN7CGJ31XFXxjKbaEibEODurCMkg462QAiaOIy5pMzzpLdvfGlmy1yLf5yWYIa4CFHooqPoQNWxg/132', 'text', '测试测试测试', 0, '2019-01-14 09:56:09'),
(56, 9, 'op0sB5UXH1yN6PnqHuyNhYxyTc14', '吴华', 'https://wx.qlogo.cn/mmopen/vi_32/eszmWrowibhXJgN7CGJ31XFXxjKbaEibEODurCMkg462QAiaOIy5pMzzpLdvfGlmy1yLf5yWYIa4CFHooqPoQNWxg/132', 'text', 'test~~test~!', 0, '2019-01-14 09:57:08'),
(57, 10, 'op0sB5UXH1yN6PnqHuyNhYxyTc14', '吴华', 'https://wx.qlogo.cn/mmopen/vi_32/eszmWrowibhXJgN7CGJ31XFXxjKbaEibEODurCMkg462QAiaOIy5pMzzpLdvfGlmy1yLf5yWYIa4CFHooqPoQNWxg/132', 'text', '肖申克的救赎 电影评论测试~~', 0, '2019-01-14 09:57:52'),
(58, 2, 'op0sB5UXH1yN6PnqHuyNhYxyTc14', '吴华', 'https://wx.qlogo.cn/mmopen/vi_32/eszmWrowibhXJgN7CGJ31XFXxjKbaEibEODurCMkg462QAiaOIy5pMzzpLdvfGlmy1yLf5yWYIa4CFHooqPoQNWxg/132', 'text', '测试', 0, '2019-01-14 09:58:35'),
(59, 14, 'op0sB5UXH1yN6PnqHuyNhYxyTc14', '吴华', 'https://wx.qlogo.cn/mmopen/vi_32/eszmWrowibhXJgN7CGJ31XFXxjKbaEibEODurCMkg462QAiaOIy5pMzzpLdvfGlmy1yLf5yWYIa4CFHooqPoQNWxg/132', 'text', 'test test', 0, '2019-01-14 09:59:57'),
(60, 7, 'op0sB5UXH1yN6PnqHuyNhYxyTc14', '吴华', 'https://wx.qlogo.cn/mmopen/vi_32/eszmWrowibhXJgN7CGJ31XFXxjKbaEibEODurCMkg462QAiaOIy5pMzzpLdvfGlmy1yLf5yWYIa4CFHooqPoQNWxg/132', 'audio', 'https://qcloudtest-1258025714.cos.ap-guangzhou.myqcloud.com/1547431761689-72GjeyhYl.mp3', 2939, '2019-01-14 10:09:22'),
(61, 8, 'op0sB5UXH1yN6PnqHuyNhYxyTc14', '吴华', 'https://wx.qlogo.cn/mmopen/vi_32/eszmWrowibhXJgN7CGJ31XFXxjKbaEibEODurCMkg462QAiaOIy5pMzzpLdvfGlmy1yLf5yWYIa4CFHooqPoQNWxg/132', 'text', 'test test、', 0, '2019-01-14 10:19:18'),
(62, 11, 'op0sB5UXH1yN6PnqHuyNhYxyTc14', '吴华', 'https://wx.qlogo.cn/mmopen/vi_32/eszmWrowibhXJgN7CGJ31XFXxjKbaEibEODurCMkg462QAiaOIy5pMzzpLdvfGlmy1yLf5yWYIa4CFHooqPoQNWxg/132', 'text', 'test', 0, '2019-01-14 10:20:49'),
(63, 13, 'op0sB5UXH1yN6PnqHuyNhYxyTc14', '吴华', 'https://wx.qlogo.cn/mmopen/vi_32/eszmWrowibhXJgN7CGJ31XFXxjKbaEibEODurCMkg462QAiaOIy5pMzzpLdvfGlmy1yLf5yWYIa4CFHooqPoQNWxg/132', 'text', 'test', 0, '2019-01-14 10:29:40');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD KEY `movies` (`movie_id`) USING BTREE;

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `comment`
--
ALTER TABLE `comment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
