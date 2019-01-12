const DB = require('../utils/db')

module.exports = {
  add: async ctx => {
    let user = ctx.state.$wxInfo.userinfo.openId
    let commentId = ctx.request.body.comment_id

    let list = await DB.query('SELECT * FROM trolley_user WHERE comment_user.id = ? AND comment_user.user = ?', [comment_id, user])

    if (list.length == 0) {
      // 商品还未添加到购物车
      await DB.query('INSERT INTO trolley_user(id, user) VALUES (?, ?, ?)', [comment_id,, user])
    }
  },
}