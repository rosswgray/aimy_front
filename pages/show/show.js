// pages/show/show.js
Page({

  /**
   * Page initial data
   */
  data: {

  },

   goToMap: function() {
    wx.navigateTo({
      url: '/pages/map/map',
    })
  },


  /**
   * Lifecycle function--Called when page load
   */
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
  onLoad: function (options) {
    const page = this
    const id = options.id
  
    wx.request({
      url: `${getApp().globalData.host}api/v1/activities/${id}`,
      success: function (res) {
        console.log("READ", res)
        const activity = res.data
        // console.log(activity)
        page.setData({
          activity: activity
        })
      }
    })
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