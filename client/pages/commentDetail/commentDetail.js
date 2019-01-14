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
      movie: null,
      checkCommentType: null,
      layer: false,
      commentId: null
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getCommentList(1)
    this.setData({
      commentId: options.commentId
    })
    this.getCommentDetail(options.commentId)
  },

  addToUser() {
    wx.showLoading({
      title: '正在收藏评论...',
    })

    qcloud.request({
      url: config.service.addUser,
      login: true,
      method: 'PUT',
      data: {
        movie_Id: this.data.commentDateil.movie_id,
        comment_Id: this.data.commentDateil.id,
        movie_image: this.data.movie.image,
        movie_title: this.data.movie.title
      },
      success: result => {
        console.log('success')
        console.log(result)
        wx.hideLoading()

        let data = result.data

        if (!data.code) {
          wx.showToast({
            title: '收藏评论成功',
          })
        } else {
          wx.showToast({
            icon: 'none',
            title: '收藏评论失败',
          })
        }
      },
      fail: (res) => {
        console.log('fail')
        console.log(res)
        wx.hideLoading()

        wx.showToast({
          icon: 'none',
          title: '收藏评论失败',
        })
      }
    })
  },

  getCommentDetail(id) {
    qcloud.request({
      url: config.service.commentDateilList + id,
      data: {
        id: id
      },
      success: result => {
        let data = result.data
        if (!data.code) {
          this.setData({
            commentDateil: data.data[0],
          })
        }
        console.log(this.data.commentDateil)
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
          console.log(this.data.movie)
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

  goToAddComment(event) {
    this.showLayer()
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
          wx.navigateTo({
            url: '../addComment/addComment?id=' + this.data.movie.id + '&' + 'type=' + event.target.dataset.type
          })
        } else {
          wx.showToast({
            title: '这是你的评论'
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
})