// client/pages/add-comment/add-comment.js
const qcloud = require('../../vendor/wafer2-client-sdk/index.js')
const config = require('../../config.js')
const app = getApp()
const recorderManager = wx.getRecorderManager()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    locationAuthType: app.data.locationAuthType,
    checkCommentType: null,
    commentType: null,
    commentText: null,
    movie: {},
    audioBtn: true,
    audioStatus: true,
    audioPath: null,
    duration: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getMovie(1)
    this.getMovie(options.id)
    this.ckeckCommentType(options.type)
    this.setData({
      commentText: null,
      audioPath: null,
      commentType: options.type
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

  ckeckCommentType(type) {
    if(type === 'text') {
      this.setData({
        checkCommentType: true
      })
    } else if(type === 'audio') {
      this.setData({
        checkCommentType: false
      })
    }
  },

  onInput(event) {
    this.setData({
      commentText: event.detail.value.trim()
    })
  },

  goToPreviewComment() {
    if(!this.data.commentText && !this.data.audioPath) {
      wx.showToast({
        title: '请输入你的评论',
      })
      return
    } else {
      wx.navigateTo({
        url: '../commentPreview/commentPreview?id=' + this.data.movie.id + '&commentText=' + this.data.commentText + '&audioPath=' + this.data.audioPath + '&duration=' + this.data.duration + '&type=' + this.data.commentType
      })
    }
  },

  getAudio() {
    const options = {
      format: 'mp3',//音频格式，有效值 aac/mp3
      frameSize: 50,//指定帧大小，单位 KB
    }
    //开始录音
    wx.getRecorderManager().start(options)
    if(this.data.audioStatus) {
      wx.getRecorderManager().onStart(() => {
        wx.showToast({
          title: '开始录制',
        })
        console.log('start')
        this.setData({
          audioStatus: false,
          audioBtn: false
        })
      })
    } else {
      wx.getRecorderManager().stop()
      wx.getRecorderManager().onStop((res) => {
        console.log('stop')
        wx.showToast({
          title: '录制结束',
        })

        this.setData({
          audioStatus: true,
          audioBtn: true,
          audioPath: res.tempFilePath,
          duration: res.duration
        })
        console.log(res)
      })
    }
    
    wx.getRecorderManager().onError((res) => {
      console.log(res)
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