// client/pages/user/user.js
const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config')
const innerAudioContext = wx.createInnerAudioContext()
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: {
      userInfo: null,
      locationAuthType: app.data.locationAuthType,
      commentDateil: null,
      checkCommentType: null,
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getCommentList(1)
    this.getCommentDetail(options.commentId)
  },

  getCommentDetail(id) {
    console.log(id)
    qcloud.request({
      url: config.service.commentDateilList + id,
      data: {
        id: id
      },
      success: result => {
        console.log('success')
        let data = result.data.data[0]
        if (!data.code) {
          this.setData({
            commentDateil: data,
          })
        }
        console.log(this.data.commentDateil.content)
        this.getMovie(this.data.commentDateil.movie_id)
        this.checkCommentType(this.data.commentDateil.type)
      },
      fail: res => {
        console.log('fail')
        console.log(res)
        setTimeout(() => {
          wx.navigateBack()
        }, 2000)
      }
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

  onPlay() {
    innerAudioContext.src = this.data.commentDateil.content
    innerAudioContext.play()
    console.log('开始播放')
    this.setData({
      isPlaying: false
    })
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
  },

  // 判断评论类型，页面显示内容
  checkCommentType(type) {
    if (type === 'text') {
      this.setData({
        checkCommentType: true
      })
    } else if (type === 'audio') {
      this.setData({
        checkCommentType: false
      })
    }
  },

  onTapLogin: function () {
    app.login({
      success: ({ userInfo }) => {
        this.setData({
          userInfo,
          locationAuthType: app.data.locationAuthType
        })
      },
      error: () => {
        this.setData({
          locationAuthType: app.data.locationAuthType
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 同步授权状态
    this.setData({
      locationAuthType: app.data.locationAuthType
    })
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