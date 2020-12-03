// pages/profile/profile.js
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

  },

  onLoad: function (options) {
    const page = this; 
    wx.request({
      url: `${getApp().globalData.host}api/v1/activities/`,
      success: function(res) {
        console.log(res)
        const activities = res.data.activities
        page.setData({ activities: activities.slice(0,20) })
        console.log(activities)
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

  }
})