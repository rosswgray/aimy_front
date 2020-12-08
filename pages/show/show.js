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

  goToConfirm: function(e){
    const session_id = e.currentTarget.dataset.id;
    const page = this
    console.log("im in goToConfirm", session_id)
    wx.navigateTo({
      url: `/pages/confirmation/confirmation?user_id=${page.data.user_id}&sessionid=${session_id}&activity_id=${page.data.activity.id}`,
    }) 
   },

   goToConfirmAfterLogin: function(id){
    const session_id = id;
    wx.navigateTo({
      url: `/pages/confirmation/confirmation?user_id=${this.data.user_id}&sessionid=${session_id}&activity_id=${this.data.activity.id}`,
    }) 
   },

   bindGetUserInfo: function (e) {
    const user = wx.getStorageSync('user');

    console.log(e);


    let userInfo = e.detail.userInfo
    let sessionId = e.target.dataset.id
    if (userInfo == undefined){
      
    } else {
      this.setData({
        userInfo: userInfo,
        hasUserInfo: true
      })
      globalData.hasUserInfo = true
      globalData.userInfo = userInfo

      this.confirmBooking(session_id)
    }

    // Pseudo Code: 
    // 1. Add a session ID to the green button (data-sesssionid)
    // 2. Create ONE confirmBooking funciton that navigates to the proper confirmation page
    // 
    // put request to update userinfo on the backend
  },

  goToMap: function() {
    wx.openLocation({
      latitude: this.data.activity.latitude,
      longitude: this.data.activity.longitude,
    })

  },

  goToBio: function() {
  wx.navigateTo({
        url: '/pages/instructor/instructor',
      })
  },

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

  onShareAppMessage: function () {
    return {
      title: this.data.activity.name,
      path: `/pages/show/show?id=${this.data.activity.id}`,
    }
  }
})