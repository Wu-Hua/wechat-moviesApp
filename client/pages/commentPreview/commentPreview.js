// client/pages/commentPreview/commentPreview.js
const qcloud = require('../../vendor/wafer2-client-sdk/index.js')
const config = require('../../config.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    commentType: null,
    commentText: null,
    audioPath: null,
    duration: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (isNaN(options.duration)) {
      this.setData({
        commentText: options.commentText,
        commentType: options.type,
        audioPath: options.audioPath,
      })
    } else {
      this.setData({
        commentText: options.commentText,
        commentType: options.type,
        audioPath: options.audioPath,
        duration: options.duration,
      })
    }
    this.getMovie(options.id)
  },

  // 添加评论 API 客户端部分的代码，
  addComment(event) {
    let content = this.data.commentText
    // if (!content) return

    wx.showLoading({
      title: '正在发表评论'
    })

    qcloud.request({
      url: config.service.addComment,
      login: true,
      method: 'PUT',
      data: {
        movie_id: this.data.movie.id,
        type: this.data.commentType,
        content: content,
        duration: this.data.duration
      },
      success: result => {
        wx.hideLoading()

        let data = result.data

        if (!data.code) {
          wx.showToast({
            title: '发表评论成功'
          })
          setTimeout(() => {
            wx.navigateBack()
          }, 1500)

        } else {
          wx.showToast({
            icon: 'none',
            title: '发表评论失败'
          })
        }
      },
      fail: (res) => {
        console.log('fail')
        console.log(res)
        wx.hideLoading()

        wx.showToast({
          icon: 'none',
          title: '发表评论失败'
        })
      }
    })
  },

  // 返回上一页
  goToBack() {
    wx.navigateBack({
      delta: 1
    })
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  onTapLogin: function () {
    app.login({
      success: ({ userInfo }) => {
        this.setData({
          userInfo,
        })
      },
      error: () => { }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 同步授权状态
    app.checkSession({
      success: ({ userInfo }) => {
        this.setData({
          userInfo
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})