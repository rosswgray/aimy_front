// pages/show/show.js
Page({

  /**
   * Page initial data
   */
  data: {
    // BELOW DATA FOR SWIPER, imgUrls need to change
    
    // imgUrls: ["/images/1597004.jpg", "/images/baby-playing1.jpg", "/images/frontiers-in-education-preschool.jpg", "/images/c3e44acba36904a565209ab331bdcc64f868cf15_August_banner_28.jpg"],
    // indicatorDots: false,
    // autoplay: false,
    // interval: 5000,
    // duration: 1000
  },

   goToMap: function() {
     wx.openLocation({
       latitude: this.data.activity.latitude,
       longitude: this.data.activity.longitude,
     })
    // wx.navigateTo({
    //   url: '/pages/map/map',
    // })
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