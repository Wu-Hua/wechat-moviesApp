/**
 * ajax 服务路由集合
 */
const router = require('koa-router')({
    prefix: '/weapp'
})
const controllers = require('../controllers')

// 从 sdk 中取出中间件
// 这里展示如何使用 Koa 中间件完成登录态的颁发与验证
const { auth: { authorizationMiddleware, validationMiddleware } } = require('../qcloud')

// --- 登录与授权 Demo --- //
// 登录接口
router.get('/login', authorizationMiddleware, controllers.login)
// 用户信息接口（可以用来验证登录态）
router.get('/user', validationMiddleware, controllers.user)

// --- 图片上传 Demo --- //
// 图片上传接口，小程序端可以直接将 url 填入 wx.uploadFile 中
router.post('/upload', controllers.upload)

// --- 信道服务接口 Demo --- //
// GET  用来响应请求信道地址的
router.get('/tunnel', controllers.tunnel.get)
// POST 用来处理信道传递过来的消息
router.post('/tunnel', controllers.tunnel.post)

// --- 客服消息接口 Demo --- //
// GET  用来响应小程序后台配置时发送的验证请求
router.get('/message', controllers.message.get)
// POST 用来处理微信转发过来的客服消息
router.post('/message', controllers.message.post)

// 获取电影列表
router.get('/movies', controllers.movies.list)

// 获取电影详情
router.get('/movies/:id', controllers.movies.detail)

// 添加评论
// 这里指明了我们这个请求是一个 PUT 请求，名字是 comment ，需要授权登录 validationMiddleware ，
// 同时它调用了 comment 中的 add 函数，也就是添加评论的功能
router.put('/comment', validationMiddleware, controllers.comment.add)

// 获取评论列表
router.get('/comment', controllers.comment.list)

// 获取单条评论列表
router.get('/comment/:id', controllers.comment.commentDetail)

// 获取用户评论列表
router.get('/comment1', validationMiddleware, controllers.comment.userComment)

// 检查用户是否评论
router.get('/comment2', validationMiddleware, controllers.comment.check)

// 获取用户收藏评论列表
router.get('/collection1', validationMiddleware, controllers.userComment.list)

// 评论加到收藏评论
router.put('/collection', validationMiddleware, controllers.userComment.add)

module.exports = router
