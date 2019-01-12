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
      title: '正在添加到购物车...',
    })

    qcloud.request({
      url: config.service.addUser,
      login: true,
      // 需要注意的是我们这里用的是 PUT 方法，因为当商品已经在购物车的时候，我们需要更新数据库
      // 我们将商品的数据直接通过 data 来传输，这部分数据将直接出现在中间件的 body 中，
      // 最后添加 url 
      method: 'PUT',
      data: {
        comment_id: this.data.commentId
      },
      success: result => {
        console.log('success')
        console.log(result)
        wx.hideLoading()

        let data = result.data

        if (!data.code) {
          wx.showToast({
            title: '已添加到购物车',
          })
        } else {
          wx.showToast({
            icon: 'none',
            title: '添加到购物车失败',
          })
        }
      },
      fail: (res) => {
        console.log('fail')
        console.log(res)
        wx.hideLoading()

        wx.showToast({
          icon: 'none',
          title: '添加到购物车失败',
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
        let data = result.data.data[0]
        if (!data.code) {
          this.setData({
            commentDateil: data,
          })
        }
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

  goToAddComment(event) {
    this.showLayer()
    wx.navigateTo({
      url: '../addComment/addComment?id=' + this.data.movie.id + '&' + 'type=' + event.target.dataset.type
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