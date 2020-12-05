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
    ],
    // POP UP FOR LOG IN
    title : "Authorization",
    body: "Plese, for booking, you need to log in. Thank you.",
    hasCloseIcon: true,
    showPopup: false

    // BELOW DATA FOR SWIPER, imgUrls need to change
    
    // imgUrls: ["/images/1597004.jpg", "/images/baby-playing1.jpg", "/images/frontiers-in-education-preschool.jpg", "/images/c3e44acba36904a565209ab331bdcc64f868cf15_August_banner_28.jpg"]
    // indicatorDots: false,
    // autoplay: false,
    // interval: 5000,
    // duration: 1000
  },

  showPopup: function(){
    this.setData({
      showPopup: true
    })
  },

  hidePopup: function() {
    this.setData({
      showPopup: false
    })
  },

  goToConfirm: function(e){
    console.log(e)
    const session_id = e.currentTarget.dataset.id;
    const page = this
    console.log(e)
    wx.navigateTo({
      url: `/pages/confirmation/confirmation?userid=${page.data.user.id}&sessionid=${session_id}&activity_id=${page.data.activity.id}`,
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