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
    const page = this
    wx.navigateTo({
      url: `/pages/confirmation/confirmation?user_id=${page.data.user_id}&sessionid=${session_id}&activity_id=${page.data.activity.id}`,
    }) 
   },

   getUserInfo: function(e){
    let userInfo = e.detail.userInfo
    let sessionId = e.target.dataset.id
    console.log("checking if it has has data-id", e)
    if (userInfo == undefined){
      
    } else {
      this.setData({
        userInfo: userInfo,
        hasUserInfo: true
      })
      globalData.hasUserInfo = true
      globalData.userInfo = userInfo

      this.goToConfirmAfterLogin(sessionId)
    }
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

  onLoad: function (options) {
    const user_id = getApp().globalData.user_id
    this.setData({user_id})
    this.setData({ hasUserInfo: globalData.hasUserInfo })
    const id = options.id
    wx.request({
      url: `${app.globalData.host}api/v1/activities/${id}`,
      success: res => {
        const activity = res.data;
        if (!activity.error) this.setData({ activity, 
        imgUrls: [activity.photo_1, activity.photo_2, activity.photo_3] });
      }
    })
  }
})