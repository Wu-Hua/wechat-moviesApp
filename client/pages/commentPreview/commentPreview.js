// client/pages/commentPreview/commentPreview.js
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
    checkCommentType: null,
    commentType: null,
    commentText: null,
    audioPath: null,
    duration: 0,
    isPlaying: true
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
    this.audioCtx = wx.createAudioContext('myAudio')
    this.audioCtx.setSrc(options.audioPath)
    console.log(this.data.commentType)
    console.log(this.data.audioPath)
    console.log(this.data.duration)
  },

  onPlay(){
    innerAudioContext.src = this.data.audioPath
    if(this.data.isPlaying){
      innerAudioContext.play()
        console.log('开始播放')
        this.setData({
          isPlaying: false
        })
    } else {
      innerAudioContext.stop()
        console.log('播放结束')
        this.setData({
          isPlaying: false
        })
    }
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

  // 添加评论 API 客户端部分的代码，
  addComment(event) {
    let content = this.data.commentText
    // if (!content) return
    //如果是音频评论先将音频文件上传至对象存储
    if (this.data.commentType == 'audio') {
      this.uploadVoice()
      content = this.data.audioPath
    }

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
          wx.navigateTo({
            url: '../commentList/commentList?id=' + this.data.movie.id
          })

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

  //音频上传函数
  uploadVoice() {
    let audioPath = this.data.audioPath
    wx.uploadFile({
      url: config.service.uploadUrl,
      filePath: audioPath,
      name: 'file',
      header: {
        'content-type': 'multipart/form-data'
      },
      success: res => {
        console.log(res)
      },
      fail: res => {
        console.log(res)
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