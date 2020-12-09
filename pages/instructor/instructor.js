// pages/instructor/instructor.js
Page({

  /**
   * Page initial data
   */
  data: {
    iconSize: [20, 30, 40, 50, 60, 70],
    iconColor: [
      'red', 'orange', 'yellow', 'green', 'rgb(0,255,255)', 'blue', 'purple', 'rgb(99,235,52)'
    ],
    iconType: [
      'success', 'success_no_circle', 'info', 'warn', 'waiting', 'cancel', 'download', 'search', 'clear'
    ]
  },

    // goBack: function() {

    // },


  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    let id = options.id
    let page = this
    wx.request({
      url: `${getApp().globalData.host}api/v1/instructors/${id}`,
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

  }
})