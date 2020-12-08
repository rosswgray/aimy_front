// pages/profile/profile.js
const globalData = getApp().globalData
const app = getApp()
Page({


  data: {
    activeTab: 0
  },

  getUserInfo: function(e){
    let userInfo = e.detail.userInfo
    this.setData({
      userInfo: userInfo,
      hasUserInfo: true
    })
    globalData.hasUserInfo = true
    globalData.userInfo = userInfo
    // put request to update userinfo on the backend
  },


  onLoad: function (options) {
    
    const page = this; 
    let id = wx.getStorageSync('user').id
    console.log("checking if hasYser", globalData)
    page.setData({
      hasUserInfo: globalData.hasUserInfo,
      userInfo: globalData.userInfo
    })
    wx.request({
      url: `${getApp().globalData.host}api/v1/users/${id}/bookings`,
      success: function(res) {
        console.log(res)
        page.setData(res.data)
      }
    })
  },

  getBookings: function() {
    let user = this.data.user
    wx.request({
      url: `${getApp().globalData.host}api/v1/users/${user.id}/bookings`,
      success: (res) => {
        this.setData({bookings: res.data.bookings})

      }
    })
  },

  onLoad: function (options) {
    const user = wx.getStorageSync('user')
    this.setData({user});
    this.getBookings();
  },


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