// pages/user/user.js
const qcloud = require('../../vendor/wafer2-client-sdk/index.js')
const config = require('../../config.js')
const innerAudioContext = wx.createInnerAudioContext()
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    locationAuthType: app.data.locationAuthType,
    userComment: [],
    userAddComment: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserComment()
    this.getUserAddComment()
  },

  getUserComment(cb) {
    qcloud.request({
      url: config.service.userComment,
      login: true,
      success: result => {
        let data = result.data
        // console.log(result)
        if (!data.code) {
          this.setData({
            userComment: data.data,
          })
          console.log('userComment')
          console.log(this.data.userComment)
        }
      },
      fail: res => {
        console.log('fail')
        console.log(res)
      },
      complete: () => {
        cb && cb()
      }
    })
  },

  getUserAddComment(cb) {
    qcloud.request({
      url: config.service.userAddComment,
      login: true,
      success: result => {
        let data = result.data
        // console.log(result)
        if (!data.code) {
          this.setData({
            userAddComment: data.data,
          })
        }
        console.log('userAddComment')
        console.log(this.data.userAddComment)
      },
      fail: res => {
        console.log('fail')
        console.log(res)
      },
      complete: () => {
        cb && cb()
      }
    })
  },

  onPlay(event) {
    innerAudioContext.src = event.target.dataset.src
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

  onTapLogin: function () {
    app.login({
      success: ({ userInfo }) => {
        this.setData({
          userInfo,
          locationAuthType: app.data.locationAuthType
        })
        this.getUserComment()
        this.getUserAddComment()
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
        this.getUserComment()
        this.getUserAddComment()
      }
    })
    if (this.data.locationAuthType == 2) {
      this.doQcloudLogin()
    }
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
    this.getUserComment(() => {
      wx.stopPullDownRefresh()
    })
    this.getUserAddComment(() => {
      wx.stopPullDownRefresh()
    })
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