const DB = require('../utils/db.js');

module.exports = {
  list: async ctx => {
    // 看到这里实际上执行了，DB.query语句，也就是数据库的查询语句
    // 它 从商品表中，选出了所有商品所有数据
    // 接着，把这个数据打包储存在ctx.state.data中
    // 接着，这我看到有 saync 以及 await 这两个关键字
    // 这里声明了一个异步函数
    ctx.state.data = await DB.query("SELECT * FROM movies;");
  },
  detail: async ctx => {
    // 这行代码来获取API链接中的商品编号
    // 下面的id本来是一个字符型的变量，而通过这样 + 的操作能样这个字符型变量，强制转化为一个整数型的变量
    // 数据库中的商品编号也是一个整数，这样，我们在数据库的查询中就可以使用这个获得的编号，来获取对应的商品数据
    let moviesId = + ctx.params.id
    let movies

    if (!isNaN(moviesId)) {
      // 下面这行代码，真正的从数据库中读取数据
      // 注意到，这里的SQL语句，它的含义是查询商品movies表中ID的值
      // 接下来去到routes文件夹下的index.js实现路由的功能
      movies = (await DB.query('select * from movies where movies.id = ?', [moviesId]))[0];
    } else {
      movies = {}
    }

    // movies.commentCount = (await DB.query('SELECT COUNT(id) AS comment_count FROM comment WHERE comment.movie_id = ?', [moviesId]))[0].comment_count || 0
    // movies.firstComment = (await DB.query('SELECT * FROM comment WHERE comment.movie_id = ? LIMIT 1 OFFSET 0', [moviesId]))[0] || null

    ctx.state.data = movies
  }
}