const DB = require('../utils/db')

module.exports = {
  add: async ctx => {
    let user_Id = ctx.state.$wxInfo.userinfo.openId
    let comment_Id = + ctx.request.body.comment_Id
    let movie_Id = + ctx.request.body.movie_Id
    let movie_image = ctx.request.body.movie_image
    let movie_title = ctx.request.body.movie_title

    let list = await DB.query('SELECT * FROM collection WHERE collection.user_id = ? AND collection.comment_id = ?', [user_Id, comment_Id])

    if (list.length == 0) {
      // 商品还未添加到购物车
      await DB.query('INSERT INTO collection(movie_id,movie_image,movie_title, user_id, comment_id) VALUES (?, ?,?,?,?)', [movie_Id,movie_image,movie_title, user_Id,comment_Id])
    }
    ctx.state.data = {}
  },

  list: async ctx => {
    let user_Id = ctx.state.$wxInfo.userinfo.openId

    ctx.state.data = await DB.query('SELECT * FROM collection LEFT JOIN comment ON collection.comment_id = comment.id WHERE collection.user_id = ?', [user_Id])
  }
}