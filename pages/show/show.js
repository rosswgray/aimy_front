const app = getApp();

Page({
  data: {
    activity: {
      sessions: [{
        title: 'Swim & PlaySwim & Play Swim & Play',
        date: new Date().toLocaleString(),
        organizer: {
          name: 'Brigita Lolita'
        }
      }]
    },

    // BELOW DATA FOR SWIPER, imgUrls need to change
    
    // imgUrls: ["/images/1597004.jpg", "/images/baby-playing1.jpg", "/images/frontiers-in-education-preschool.jpg", "/images/c3e44acba36904a565209ab331bdcc64f868cf15_August_banner_28.jpg"]
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

  onLoad: function (options) {
    // console.log("Options", options)
    const page = this
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