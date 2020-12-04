const app = getApp();

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
    ]

    // BELOW DATA FOR SWIPER, imgUrls need to change
    
    // imgUrls: ["/images/1597004.jpg", "/images/baby-playing1.jpg", "/images/frontiers-in-education-preschool.jpg", "/images/c3e44acba36904a565209ab331bdcc64f868cf15_August_banner_28.jpg"]
    // indicatorDots: false,
    // autoplay: false,
    // interval: 5000,
    // duration: 1000
  },

  goToConfirm: function(){
    wx.navigateTo({
      url: '/pages/confirmation/confirmation',
    }) 
   },
   getUserInfo: function(res) {
    console.log('getuserinfo res', res)
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

  goToBio: function() {
  wx.navigateTo({
        url: '/pages/instructor/instructor',
      })
  },

  onLoad: function (options) {
    // console.log("Options", options)
    const page = this
    const user = getApp().globalData.user
    this.setData({user})
    const id = options.id
    wx.request({
      url: `${app.globalData.host}api/v1/activities/${id}`,
      success: res => {
        const activity = res.data;
        if (!activity.error) this.setData({ activity });
      }
    })
  }
})