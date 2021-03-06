// 实现评论提交逻辑
const DB = require('../utils/db')

module.exports = {

  /**
   * 添加评论
   */
  // 添加评论的 API 
  // 整体逻辑与添加商品到购物车非常的类似，都是获取数据
  add: async ctx => {
    // 这三行获取了用户数据，我们看到用户的数据
    // 被保存在中间件的 userinfo 这个值当中
    let user_id = ctx.state.$wxInfo.userinfo.openId
    let user_name = ctx.state.$wxInfo.userinfo.nickName
    let user_avatar = ctx.state.$wxInfo.userinfo.avatarUrl

    // 这里两行，是读取了请求体中的数据
    // 注意到 +ctx.request.body.movie_id 这里的类型转换，
    // 以及 NaN 值的判断，是不是和我们在获取商品详细时的判断非常相似
    //  add 只是一个 put 请求,所以使用 .body 的方法来获取数据
    let movie_id = + ctx.request.body.movie_id
    let content = ctx.request.body.content || []
    let type = ctx.request.body.type
    let duration = ctx.request.body.duration



    // 执行数据库插入语句，然后返回
    if (!isNaN(movie_id)) {
      // 接着执行这条 SQL 语句，将我们获取到的数据，插入到 comment 评论表当中
      await DB.query('INSERT INTO comment(movie_id, user_id, user_name, user_avatar, type, content, duration  ) VALUES (?, ?, ?, ?, ?, ?,?)', [movie_id, user_id, user_name, user_avatar, type, content, duration])
    }

    // 最后我们返回了空值
    ctx.state.data = {}
  },

  /**
   * 获取评论列表
   */
  list: async ctx => {
    // 在服务器端，用 query.movie_id 来获取这个数据
    // 因为在请求的类别不同,所以我们获取请求中包含的数据的方法也是不同的，
    // 这里是 get 请求,所以使用 .query 的方式来获取数据,
    // 而我们上面的 add 只是一个 put 请求,所以使用 .body 的方法来获取数据
    let movieId = +ctx.request.query.movie_id

    if (!isNaN(movieId)) {
      ctx.state.data = await DB.query('select * from comment where comment.movie_id = ?', [movieId])
    } else {
      ctx.state.data = []
    }
  },

  /**
   * 获取单个评论列表
   */
  commentDetail: async ctx => {
    // 在服务器端，用 query.movie_id 来获取这个数据
    // 因为在请求的类别不同,所以我们获取请求中包含的数据的方法也是不同的，
    // 这里是 get 请求,所以使用 .query 的方式来获取数据,
    // 而我们上面的 add 只是一个 put 请求,所以使用 .body 的方法来获取数据
    let id = +ctx.request.query.id

    if (!isNaN(id)) {
      ctx.state.data = await DB.query('select * from comment where comment.id = ?', [id])
    } else {
      ctx.state.data = []
    }
  },

  /**
   * 获取用户评论列表
   */
  userComment: async ctx => {
    // 在服务器端，用 query.movie_id 来获取这个数据
    // 因为在请求的类别不同,所以我们获取请求中包含的数据的方法也是不同的，
    // 这里是 get 请求,所以使用 .query 的方式来获取数据,
    // 而我们上面的 add 只是一个 put 请求,所以使用 .body 的方法来获取数据
    let user = ctx.state.$wxInfo.userinfo.openId

    ctx.state.data = await DB.query('SELECT * FROM comment LEFT JOIN movies ON comment.movie_id = movies.id WHERE comment.user_id = ?', [user])
    
  },

  /**
   * 检查用户有没有评论该电影
   */
  check: async ctx => {
    let user_Id = ctx.state.$wxInfo.userinfo.openId
    let movie_Id = + ctx.request.query.movie_Id

    let list = await DB.query('SELECT * FROM comment WHERE comment.user_id = ? AND comment.movie_id = ?', [user_Id, movie_Id])

    if (list.length == 0) {
      ctx.state.data = { check : true }
    } else {
      ctx.state.data = {list}
    }
  },
}