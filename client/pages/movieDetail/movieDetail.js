// client/pages/movieDetail/movieDetail.js
const qcloud = require('../../vendor/wafer2-client-sdk/index.js')
const config = require('../../config.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: {},
    layer: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMovie(options.id)
  },

  getMovie(id) {
    wx.showLoading({
      title: '数据加载中...',
    })

    qcloud.request({
      url: config.service.moviesDetail + id,
      success: result => {
        wx.hideLoading()

        let data = result.data

        if (!data.code) {
          this.setData({
            movie: data.data,
          })
        } else {
          setTimeout(() => {
            wx.navigateBack()
          }, 2000)
        }
      },
      fail: (res) => {
        wx.hideLoading()

        setTimeout(() => {
          wx.navigateBack()
        }, 2000)
      }
    })
  },

  goToCommentList() {
    wx.navigateTo({
      url: '../commentList/commentList?id=' + this.data.movie.id
    })
  },

  goToAddComment(event) {
    qcloud.request({
      url: config.service.check,
      login: true,
      data: {
        movie_Id: this.data.movie.id
      },
      success: result => {
        console.log('success')

        let data = result.data

        if (!data.code && data.data.check) {
          this.showLayer()
          wx.navigateTo({
            url: '../addComment/addComment?id=' + this.data.movie.id + '&' + 'type=' + event.target.dataset.type
          })
        } else {
          this.showLayer()
          wx.navigateTo({
            url: '../commentDetail/commentDetail?commentId=' + data.data.list[0].id
          })
        }
      },
      fail: (res) => {
        console.log('fail')
        console.log(res)
      }
    })
  },

  showLayer() {
    let changeLayer = !this.data.layer
    this.setData({
      layer: changeLayer
    })
  },
})