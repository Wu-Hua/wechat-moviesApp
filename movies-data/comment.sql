-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: 2019-01-13 08:14:42
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
(1, 1, 'op0sB5UXH1yN6PnqHuyNhYxyTc14', '吴华', 'https://wx.qlogo.cn/mmopen/vi_32/eszmWrowibhXJgN7CGJ31XFXxjKbaEibEODurCMkg462QAiaOIy5pMzzpLdvfGlmy1yLf5yWYIa4CFHooqPoQNWxg/132', 'text', 'text comment test', 0, '2019-01-11 11:18:57'),
(2, 6, 'op0sB5UXH1yN6PnqHuyNhYxyTc14', '吴华', 'https://wx.qlogo.cn/mmopen/vi_32/eszmWrowibhXJgN7CGJ31XFXxjKbaEibEODurCMkg462QAiaOIy5pMzzpLdvfGlmy1yLf5yWYIa4CFHooqPoQNWxg/132', 'text', '热血警探评论测试', 0, '2019-01-11 11:24:56'),
(3, 8, 'op0sB5UXH1yN6PnqHuyNhYxyTc14', '吴华', 'https://wx.qlogo.cn/mmopen/vi_32/eszmWrowibhXJgN7CGJ31XFXxjKbaEibEODurCMkg462QAiaOIy5pMzzpLdvfGlmy1yLf5yWYIa4CFHooqPoQNWxg/132', 'text', '美丽心灵文本评论满字符测试，美丽心灵文本评论满字符测试，美丽心灵文本评论满字符测试，美丽心灵文本评论满字符测试，美丽心灵文本评论满字符测试，美丽心灵文本评论满字符测试，美丽心灵文本评论满字符测试，美丽心灵文本评论满字符测试，美丽心灵文本评论满字符测试，美丽心灵文本评论满字符测试，美丽心灵文本评论满字符测试，美丽心灵文本评论满字符测试，美丽心灵文本评论满字符测试，美丽心灵文本评论满字符测试，美丽心灵文本评论满字符测试，美丽心灵文本评论满字符测试，美丽心灵文本评论满字符测试，美丽心灵文本评论满字符测试，美丽心', 0, '2019-01-11 11:27:31'),
(4, 6, 'op0sB5UXH1yN6PnqHuyNhYxyTc14', '吴华', 'https://wx.qlogo.cn/mmopen/vi_32/eszmWrowibhXJgN7CGJ31XFXxjKbaEibEODurCMkg462QAiaOIy5pMzzpLdvfGlmy1yLf5yWYIa4CFHooqPoQNWxg/132', 'text', '热血警探第二条文本评论测试', 0, '2019-01-11 11:28:32'),
(5, 6, 'op0sB5UXH1yN6PnqHuyNhYxyTc14', '吴华', 'https://wx.qlogo.cn/mmopen/vi_32/eszmWrowibhXJgN7CGJ31XFXxjKbaEibEODurCMkg462QAiaOIy5pMzzpLdvfGlmy1yLf5yWYIa4CFHooqPoQNWxg/132', 'text', '热血警探第三条文本评论测试', 0, '2019-01-11 11:28:54'),
(21, 1, 'op0sB5UXH1yN6PnqHuyNhYxyTc14', '吴华', 'https://wx.qlogo.cn/mmopen/vi_32/eszmWrowibhXJgN7CGJ31XFXxjKbaEibEODurCMkg462QAiaOIy5pMzzpLdvfGlmy1yLf5yWYIa4CFHooqPoQNWxg/132', 'text', 'test', 10000, '2019-01-12 14:30:28'),
(22, 1, 'op0sB5UXH1yN6PnqHuyNhYxyTc14', '吴华', 'https://wx.qlogo.cn/mmopen/vi_32/eszmWrowibhXJgN7CGJ31XFXxjKbaEibEODurCMkg462QAiaOIy5pMzzpLdvfGlmy1yLf5yWYIa4CFHooqPoQNWxg/132', 'text', 'testtest', 10000, '2019-01-12 14:31:42'),
(26, 1, 'op0sB5UXH1yN6PnqHuyNhYxyTc14', '吴华', 'https://wx.qlogo.cn/mmopen/vi_32/eszmWrowibhXJgN7CGJ31XFXxjKbaEibEODurCMkg462QAiaOIy5pMzzpLdvfGlmy1yLf5yWYIa4CFHooqPoQNWxg/132', 'audio', 'https://qcloudtest-1258025714.cos.ap-guangzhou.myqcloud.com/1547276142851-iaMpnEOGA.mp3', 2101, '2019-01-12 14:55:43'),
(27, 1, 'op0sB5UXH1yN6PnqHuyNhYxyTc14', '吴华', 'https://wx.qlogo.cn/mmopen/vi_32/eszmWrowibhXJgN7CGJ31XFXxjKbaEibEODurCMkg462QAiaOIy5pMzzpLdvfGlmy1yLf5yWYIa4CFHooqPoQNWxg/132', 'text', '1233321test', 10000, '2019-01-12 14:57:13'),
(28, 1, 'op0sB5UXH1yN6PnqHuyNhYxyTc14', '吴华', 'https://wx.qlogo.cn/mmopen/vi_32/eszmWrowibhXJgN7CGJ31XFXxjKbaEibEODurCMkg462QAiaOIy5pMzzpLdvfGlmy1yLf5yWYIa4CFHooqPoQNWxg/132', 'audio', 'https://qcloudtest-1258025714.cos.ap-guangzhou.myqcloud.com/1547277538240-8ezJLM7_L.mp3', 2347, '2019-01-12 15:18:59'),
(29, 1, 'op0sB5UXH1yN6PnqHuyNhYxyTc14', '吴华', 'https://wx.qlogo.cn/mmopen/vi_32/eszmWrowibhXJgN7CGJ31XFXxjKbaEibEODurCMkg462QAiaOIy5pMzzpLdvfGlmy1yLf5yWYIa4CFHooqPoQNWxg/132', 'audio', 'https://qcloudtest-1258025714.cos.ap-guangzhou.myqcloud.com/1547277627269-T5T73KH-p.mp3', 3514, '2019-01-12 15:20:28'),
(30, 3, 'op0sB5UXH1yN6PnqHuyNhYxyTc14', '吴华', 'https://wx.qlogo.cn/mmopen/vi_32/eszmWrowibhXJgN7CGJ31XFXxjKbaEibEODurCMkg462QAiaOIy5pMzzpLdvfGlmy1yLf5yWYIa4CFHooqPoQNWxg/132', 'text', 'test', 0, '2019-01-12 21:59:03'),
(31, 3, 'op0sB5UXH1yN6PnqHuyNhYxyTc14', '吴华', 'https://wx.qlogo.cn/mmopen/vi_32/eszmWrowibhXJgN7CGJ31XFXxjKbaEibEODurCMkg462QAiaOIy5pMzzpLdvfGlmy1yLf5yWYIa4CFHooqPoQNWxg/132', 'text', 'test', 0, '2019-01-12 21:59:51'),
(37, 1, 'op0sB5UXH1yN6PnqHuyNhYxyTc14', '吴华', 'https://wx.qlogo.cn/mmopen/vi_32/eszmWrowibhXJgN7CGJ31XFXxjKbaEibEODurCMkg462QAiaOIy5pMzzpLdvfGlmy1yLf5yWYIa4CFHooqPoQNWxg/132', 'audio', 'https://qcloudtest-1258025714.cos.ap-guangzhou.myqcloud.com/1547303591694-vqr78B3UN.mp3', 2620, '2019-01-12 22:33:12'),
(38, 3, 'op0sB5UXH1yN6PnqHuyNhYxyTc14', '吴华', 'https://wx.qlogo.cn/mmopen/vi_32/eszmWrowibhXJgN7CGJ31XFXxjKbaEibEODurCMkg462QAiaOIy5pMzzpLdvfGlmy1yLf5yWYIa4CFHooqPoQNWxg/132', 'text', '测试测试', 0, '2019-01-13 15:30:28'),
(39, 10, 'op0sB5UXH1yN6PnqHuyNhYxyTc14', '吴华', 'https://wx.qlogo.cn/mmopen/vi_32/eszmWrowibhXJgN7CGJ31XFXxjKbaEibEODurCMkg462QAiaOIy5pMzzpLdvfGlmy1yLf5yWYIa4CFHooqPoQNWxg/132', 'text', '添加影评，测试', 0, '2019-01-13 15:44:01'),
(40, 15, 'op0sB5UXH1yN6PnqHuyNhYxyTc14', '吴华', 'https://wx.qlogo.cn/mmopen/vi_32/eszmWrowibhXJgN7CGJ31XFXxjKbaEibEODurCMkg462QAiaOIy5pMzzpLdvfGlmy1yLf5yWYIa4CFHooqPoQNWxg/132', 'text', '添加影评，测试', 0, '2019-01-13 15:44:46'),
(41, 13, 'op0sB5UXH1yN6PnqHuyNhYxyTc14', '吴华', 'https://wx.qlogo.cn/mmopen/vi_32/eszmWrowibhXJgN7CGJ31XFXxjKbaEibEODurCMkg462QAiaOIy5pMzzpLdvfGlmy1yLf5yWYIa4CFHooqPoQNWxg/132', 'text', '添加影评，测试', 0, '2019-01-13 15:45:22'),
(42, 6, 'op0sB5UXH1yN6PnqHuyNhYxyTc14', '吴华', 'https://wx.qlogo.cn/mmopen/vi_32/eszmWrowibhXJgN7CGJ31XFXxjKbaEibEODurCMkg462QAiaOIy5pMzzpLdvfGlmy1yLf5yWYIa4CFHooqPoQNWxg/132', 'text', '添加影评，测试', 0, '2019-01-13 15:45:34'),
(43, 7, 'op0sB5UXH1yN6PnqHuyNhYxyTc14', '吴华', 'https://wx.qlogo.cn/mmopen/vi_32/eszmWrowibhXJgN7CGJ31XFXxjKbaEibEODurCMkg462QAiaOIy5pMzzpLdvfGlmy1yLf5yWYIa4CFHooqPoQNWxg/132', 'audio', 'https://qcloudtest-1258025714.cos.ap-guangzhou.myqcloud.com/1547365697868-6BvQlKyb7.mp3', 2658, '2019-01-13 15:48:18'),
(44, 9, 'op0sB5UXH1yN6PnqHuyNhYxyTc14', '吴华', 'https://wx.qlogo.cn/mmopen/vi_32/eszmWrowibhXJgN7CGJ31XFXxjKbaEibEODurCMkg462QAiaOIy5pMzzpLdvfGlmy1yLf5yWYIa4CFHooqPoQNWxg/132', 'text', '添加影评，测试', 0, '2019-01-13 15:49:23'),
(45, 4, 'op0sB5UXH1yN6PnqHuyNhYxyTc14', '吴华', 'https://wx.qlogo.cn/mmopen/vi_32/eszmWrowibhXJgN7CGJ31XFXxjKbaEibEODurCMkg462QAiaOIy5pMzzpLdvfGlmy1yLf5yWYIa4CFHooqPoQNWxg/132', 'text', '添加影评，测试', 0, '2019-01-13 15:49:33'),
(46, 12, 'op0sB5UXH1yN6PnqHuyNhYxyTc14', '吴华', 'https://wx.qlogo.cn/mmopen/vi_32/eszmWrowibhXJgN7CGJ31XFXxjKbaEibEODurCMkg462QAiaOIy5pMzzpLdvfGlmy1yLf5yWYIa4CFHooqPoQNWxg/132', 'text', '添加影评，测试', 0, '2019-01-13 15:50:55'),
(47, 14, 'op0sB5UXH1yN6PnqHuyNhYxyTc14', '吴华', 'https://wx.qlogo.cn/mmopen/vi_32/eszmWrowibhXJgN7CGJ31XFXxjKbaEibEODurCMkg462QAiaOIy5pMzzpLdvfGlmy1yLf5yWYIa4CFHooqPoQNWxg/132', 'text', '添加影评，测试', 0, '2019-01-13 15:51:15'),
(48, 11, 'op0sB5UXH1yN6PnqHuyNhYxyTc14', '吴华', 'https://wx.qlogo.cn/mmopen/vi_32/eszmWrowibhXJgN7CGJ31XFXxjKbaEibEODurCMkg462QAiaOIy5pMzzpLdvfGlmy1yLf5yWYIa4CFHooqPoQNWxg/132', 'text', '添加影评，测试', 0, '2019-01-13 15:51:27'),
(49, 5, 'op0sB5UXH1yN6PnqHuyNhYxyTc14', '吴华', 'https://wx.qlogo.cn/mmopen/vi_32/eszmWrowibhXJgN7CGJ31XFXxjKbaEibEODurCMkg462QAiaOIy5pMzzpLdvfGlmy1yLf5yWYIa4CFHooqPoQNWxg/132', 'text', '456516516516666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666', 0, '2019-01-13 15:52:34'),
(50, 2, 'op0sB5UXH1yN6PnqHuyNhYxyTc14', '吴华', 'https://wx.qlogo.cn/mmopen/vi_32/eszmWrowibhXJgN7CGJ31XFXxjKbaEibEODurCMkg462QAiaOIy5pMzzpLdvfGlmy1yLf5yWYIa4CFHooqPoQNWxg/132', 'text', '测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测', 0, '2019-01-13 15:55:09'),
(51, 2, 'op0sB5UXH1yN6PnqHuyNhYxyTc14', '吴华', 'https://wx.qlogo.cn/mmopen/vi_32/eszmWrowibhXJgN7CGJ31XFXxjKbaEibEODurCMkg462QAiaOIy5pMzzpLdvfGlmy1yLf5yWYIa4CFHooqPoQNWxg/132', 'text', '试测，试测，试测，试测，试测，试测，试测，试测，试测，试测，试测，试测，试测，试测，试测，试测，试测，试测，试测，试测，试测，试测，试测，试测，试测，试测，试测，试测，', 0, '2019-01-13 15:55:35'),
(52, 11, 'op0sB5UXH1yN6PnqHuyNhYxyTc14', '吴华', 'https://wx.qlogo.cn/mmopen/vi_32/eszmWrowibhXJgN7CGJ31XFXxjKbaEibEODurCMkg462QAiaOIy5pMzzpLdvfGlmy1yLf5yWYIa4CFHooqPoQNWxg/132', 'text', '测试测试', 0, '2019-01-13 16:12:17');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
