// client/pages/home/home.js
const qcloud = require('../../vendor/wafer2-client-sdk/index.js')
const config = require('../../config.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    moviesList: [], // 电影列表
    commentList: {},
    noComment: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let num = Math.floor(Math.random() * 15 + 1);
    this.getMoviesList(num)
    this.getCommentList(num)
  },

  goToMovieDetail(event) {
    wx.navigateTo({
      url: '../movieDetail/movieDetail?id=' + event.target.dataset.movieid
    })
  },

  getMoviesList(id) {
    wx.showLoading({
      title: '数据加载中。。。',
    })
    qcloud.request({
      url: config.service.moviesList,
      success: result => {
        wx.hideLoading()
        if (!result.data.code) {
          this.setData({
            moviesList: result.data.data[id-1]
          })
        } else {
          wx.showToast({
            title: '数据加载失败',
          })
        }
      },
      fail: result => {
        wx.hideLoading()
        wx.showToast({
          title: '数据加载失败',
        })
      }
    })
  },

  getCommentList(id) {
    qcloud.request({
      url: config.service.commentList,
      data: {
        movie_id: id
      },
      success: result => {
        let data = result.data

        if (!data.code && data.data[0]) {
          this.setData({
            noComment: false,
            commentList: data.data[0]
          })
        } else {
          this.setData({
            noComment: true,
            commentList: {}
          })
        }
      },
    })
  },

  goToMoviesList() {
    wx.navigateTo({
      url: '../moviesList/moviesList?id=' + this.data.moviesList.id
    })
  },

  goToCommentDetail() {
    if(!this.data.noComment) {
      wx.navigateTo({
        url: '../commentDetail/commentDetail?commentId=' + this.data.commentList.id
      })
    }
  },

  goToUser() {
    wx.navigateTo({
      url: '../user/user'
    })
  },
})