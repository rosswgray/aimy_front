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

  createBooking: function(){
    wx.request({
      url: `${getApp().globalData.host}api/v1/users/${this.data.user.id}/bookings`,
      method: 'POST',
      data: {"session_id": this.data.session_id},
      success: res => {
        wx.switchTab({ 
          url: '/pages/profile/profile',
          success: res => wx.showToast({title: "You're Booked!"})
        });
      }
    })
  },

  getActivity: function (activity_id) {
    let user = this.data.user;
    wx.request({
      url: `${getApp().globalData.host}api/v1/activities/${activity_id}`,
      data: {user_id: user.id},
      success: res => {
        const activity = res.data;
        if (!activity.error) this.setData({ activity });
    }});
  },

  onLoad: function (options) {
    let activity_id = options.activity_id;
    let session_id = options.session_id;

    const user = wx.getStorageSync('user')
    
    this.setData({ session_id, user });
    this.getActivity(activity_id);
  },
})