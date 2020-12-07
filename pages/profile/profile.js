// pages/profile/profile.js
const globalData = getApp().globalData
const app = getApp()
Page({

  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo
    })
  },


  data: {
    loggedIn: false,
  },
  logIn: function() {
    console.log(this.data)
    this.setData({userInfo: getApp().globalData.userInfo})
    this.setData({loggedIn: true})
    this.setData({activeTab:0})
  },

  onLoad: function (options) {
    
    const page = this; 
    wx.request({
      url: `${getApp().globalData.host}api/v1/users/${globalData.user.id}/bookings`,
      success: function(res) {
        console.log(res)
        page.setData(res.data)
      }
      })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },
  switchTab: function(e) {
    console.log("checking", e.currentTarget.dataset.tab)
    this.setData({
      activeTab: e.currentTarget.dataset.tab
    })
  }
})