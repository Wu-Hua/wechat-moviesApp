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
    this.checkCommentType(options.type)
    this.audioCtx = wx.createAudioContext('myAudio')
    this.audioCtx.setSrc(options.audioPath)
  },

  onPlay(){
    innerAudioContext.src = this.data.audioPath
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

  // 添加评论 API 客户端部分的代码，
  addComment(event) {
    //如果是音频评论先将音频文件上传至对象存储
    let content = null
    if (this.data.commentType == 'audio') {
      this.uploadAudio( (audioPath) => {
        wx.showLoading({
          title: '正在发表评论'
        })
        this.setData({
          audioPath: audioPath
        })
        console.log(this.data.audioPath)
        qcloud.request({
          url: config.service.addComment,
          login: true,
          method: 'PUT',
          data: {
            movie_id: this.data.movie.id,
            type: this.data.commentType,
            content: this.data.commentType == 'audio' ? this.data.audioPath : this.data.commentText,
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
      })
    } else {
      this.addCommentList()
    }
  },

  //音频上传函数
  uploadAudio(cb) {
    let audioPath = this.data.audioPath
    wx.uploadFile({
      url: config.service.uploadUrl,
      filePath: audioPath,
      header: {
        'content-type': 'multipart/form-data'
      },
      name: 'file',
      success: res => {
        let data = JSON.parse(res.data)
        let audioPath = data.data.imgUrl
        if (!data.code) {
          this.setData({
            audioPath: audioPath
          })
          console.log(this.data.audioPath)
        }
        cb && cb(audioPath)
      },
      fail: res => {
        let data = JSON.parse(res.data)
        let audioPath = data.data.imgUrl
        console.log('fail')
        console.log(res)
        cb && cb(audioPath)
      }
    })
  },

  addCommentList() {
    wx.showLoading({
      title: '正在发表评论'
    })
    console.log(this.data.audioPath)
    qcloud.request({
      url: config.service.addComment,
      login: true,
      method: 'PUT',
      data: {
        movie_id: this.data.movie.id,
        type: this.data.commentType,
        content: this.data.commentType == 'audio' ? this.data.audioPath : this.data.commentText,
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

})