const app = getApp();
const globalData = getApp().globalData;

Page({
  data: {
    activity: {
      sessions: [{
        title: 'Swim & Play Start Making waves',
        date: new Date().toLocaleString(),
        organizer: {
          name: 'Brigita'
        }
      }]
    },

    iconSize: [20, 30, 40, 50, 60, 70],
    iconColor: [
      'red', 'orange', 'yellow', 'green', 'rgb(0,255,255)', 'blue', 'purple', 'rgb(99,235,52)'
    ],
    iconType: [
      'success', 'success_no_circle', 'info', 'warn', 'waiting', 'cancel', 'download', 'search', 'clear'
    ],

    // SWIPER 
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000
  },

  confirmBooking: function(e){
    let session_id = e.target.dataset.id;
    let activity_id = this.data.activity.id;
    let user = this.data.user;

    wx.navigateTo({
      url: `/pages/confirmation/confirmation?user_id=${user.id}&session_id=${session_id}&activity_id=${activity_id}`,
    }) 
   },

   bindGetUserInfo: function (e) {
    let session_id = e.target.dataset.id;
    let activity_id = this.data.activity.id;
    let userInfo = e.detail.userInfo;

    if (userInfo) {
      let user = wx.getStorageSync('user');
      user['userInfo'] = userInfo;
      user.hasInfo = true;
      this.setData({user});
      wx.setStorageSync('user', user);

      wx.navigateTo({
        url: `/pages/confirmation/confirmation?user_id=${user.id}&session_id=${session_id}&activity_id=${activity_id}`,
      }) 
    }
  },

  // GO TO MAP
  goToMap: function() {
    wx.openLocation({
      latitude: this.data.activity.latitude,
      longitude: this.data.activity.longitude,
    })

  },


  // INSTRUCTOR BIO
  goToBio: function() {
  wx.navigateTo({
        url: '/pages/instructor/instructor',
      })
  },

  // GET ACTIVITY ID
  getActivities: function (id) {
    const app = getApp();
    wx.request({
      url: `${app.globalData.host}api/v1/activities/${id}`,
      success: res => {
        const activity = res.data;
        if (!activity.error) this.setData({ activity, 
        imgUrls: [activity.photo_1, activity.photo_2, activity.photo_3] });
      }
    })
  },

  onLoad: function (options) {
    const user = wx.getStorageSync('user');
    this.getActivities(options.id);
    this.setData({user});
  },

  // SHARE ACTIVITY
  onShareAppMessage: function () {
    return {
      title: this.data.activity.name,
      path: `/pages/show/show?id=${this.data.activity.id}`,
    }
  }
})