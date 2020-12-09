const app = getApp();
const globalData = getApp().globalData;

Page({
  data: {
    activeSession: 0,
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
    heartImage:  "/../pages/images/heart.jpg",
    islike: false,

    // SWIPER 
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    
  },

  percentFull(session) {
    let percentage = session.bookings / session.capacity
    return percentage * 100
  },

  switchHeart(){
    if(this.data.islike){
      this.setData({
        islike: false,
        heartImage: "/../pages/images/heart.jpg"
      })
    }else{
      this.setData({
        islike: true,
        heartImage: "/../pages/images/fullheart.png"
      })
    }
  },

  favActivity() {
    wx.request({
      url: `${app.globalData.host}api/v1/favorite`,
      method: 'POST',
      data: {
        id: this.data.activity.id,
        user_id: this.data.user.id 
     },
      success: res => {
        console.log(res) ;
      }
    })
  },

  unfavActivity() {
    wx.request({
      url: `${app.globalData.host}api/v1/unfavorite`,
      method: 'POST',
      data: {
        id: this.data.activity.id,
        user_id: this.data.user.id 
     },
      success: res => {
        console.log(res) ;
      }
    })
  },

  switchHeart() {
    this.favActivity()
    this.data.activity.is_faved = !this.data.activity.is_faved
    this.setData({
      activity: this.data.activity
    })
  },

  confirmBooking: function(e){

    let activity_id = this.data.activity.id;
    let user = this.data.user;

    wx.navigateTo({
      url: `/pages/confirmation/confirmation?user_id=${user.id}&session_id=${this.data.activity.sessions[this.data.activeSession].session_id}&activity_id=${activity_id}`,
    }) 
   },

   bindGetUserInfo: function (e) {
    let user = wx.getStorageSync('user');

    if (!user.hasInfo) {
      let session_id = e.target.dataset.id;
      let activity_id = this.data.activity.id;
      let userInfo = e.detail.userInfo;
  
      if (userInfo) {
        user['userInfo'] = userInfo;
        user.hasInfo = true;
        this.setData({user});
        wx.setStorageSync('user', user);
  
        wx.navigateTo({
          url: `/pages/confirmation/confirmation?user_id=${user.id}&session_id=${session_id}&activity_id=${activity_id}`,
        }) 
      }
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
  getActivities: function (id, userId) {
    const app = getApp();
    wx.request({
      url: `${app.globalData.host}api/v1/activities/${id}`,
      data: {user_id: userId},
      success: res => {
        const activity = res.data;
        if (!activity.error) this.setData({ activity, 
        imgUrls: [activity.main_photo, activity.photo_1, activity.photo_2, activity.photo_3] });
      }
    })
  },

  selectSession: function(e){
    console.log("Hello Hi")
    let activeSessionIndex = e.detail
    let sessions = this.data.activity.sessions
    let activeSession = sessions[activeSessionIndex]
    console.log(activeSession, "Hello")
    let percentFull = this.percentFull(activeSession)
    this.setData({
      activeSession: activeSession,
      percentFull: percentFull
    })
  },

onLoad: function (options) {
    const user = wx.getStorageSync('user');
    this.getActivities(options.id, user.id);
    this.setData({user});
    this.selectSession({detail: 0})
  },

  // SHARE ACTIVITY
  onShareAppMessage: function () {
    return {
      title: this.data.activity.name,
      path: `/pages/show/show?id=${this.data.activity.id}`,
    }
  }
})