// pages/confirmation/confirmation.js
Page({

  /**
   * Page initial data
   */
  data: {

  },

  goToShow: function(){
    wx.navigateBack({
      delta: 1
    })
  },

  goToProfile: function(){
    wx.switchTab({
      url: '/pages/profile/profile',

    });
    wx.request({
      url: `${getApp().globalData.host}api/v1/users/${this.data.userid}/bookings`,
      method: 'POST',
      data: {session_id: this.data.sessionid},
      success: res => {
        console.log('checking post result', res)
      }
    })
    // create a booking
  },


  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    console.log(options);
    const page = this;
    page.setData(options)
    wx.request({
      url: `${getApp().globalData.host}api/v1/activities/${options.activity_id}`,
      success: res => {
        const activity = res.data;
        if (!activity.error) this.setData({ activity });
        console.log(activity)
    }});

    // postBooking
    
    // console.log("testing", options)
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