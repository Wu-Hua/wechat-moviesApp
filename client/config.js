/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'https://ygzudpty.qcloud.la';

var config = {

    // 下面的地址配合云端 Demo 工作
    service: {
      host,

      // 登录地址，用于建立会话
      loginUrl: `${host}/weapp/login`,

      // 测试的请求地址，用于测试会话
      requestUrl: `${host}/weapp/user`,

      // 测试的信道服务地址
      tunnelUrl: `${host}/weapp/tunnel`,

      // 上传图片接口
      uploadUrl: `${host}/weapp/upload`,

      // 下载电影数据
      moviesList: `${host}/weapp/movies`,

      // 拉取电影详情
      moviesDetail: `${host}/weapp/movies/`,

      // 拉取用户信息
      user: `${host}/weapp/user`,

      // 添加评论
      addComment: `${host}/weapp/comment`,

      // 获取评论列表
      commentList: `${host}/weapp/comment/`,

      // 获取单条评论列表
      commentDateilList: `${host}/weapp/comment/`,

      // 获取用户评论
      userComment: `${host}/weapp/comment1`,

      // 获取用户评论
      check: `${host}/weapp/comment2`,

      // 添加收藏影评到用户中心
      addUser: `${host}/weapp/collection`,

      // 获取用户收藏评论
      userAddComment: `${host}/weapp/collection1`,
    }
};

module.exports = config;
