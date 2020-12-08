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
      url: `${getApp().globalData.host}api/v1/users/${this.data.user_id}/bookings`,
      method: 'POST',
      data: {session_id: this.data.sessionid},
      success: res => {
        console.log('checking post result', res)
      }
    })
    // create a booking
  },

  getActivity: function (activity_id) {
    wx.request({
      url: `${getApp().globalData.host}api/v1/activities/${activity_id}`,
      success: res => {
        const activity = res.data;
        if (!activity.error) this.setData({ activity });
    }});
  },

  onLoad: function (options) {
    let activity_id = options.activity_id;
    let session_id = options.sessions_id;

    this.setData({ session_id });
    this.getActivity(activity_id);
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

  }
})