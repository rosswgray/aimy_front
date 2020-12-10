// pages/profile/profile.js
const globalData = getApp().globalData
const app = getApp()
Page({


  data: {
    activeTab: 0
  },

  getUserInfo: function(e){
    let userInfo = e.detail.userInfo
    this.setData({
      userInfo: userInfo,
      hasUserInfo: true
    })
    globalData.hasUserInfo = true
    globalData.userInfo = userInfo
    // put request to update userinfo on the backend
  },


  onLoad: function (options) {
    
    const page = this; 
    console.log("checking if hasYser", globalData)
    page.setData({
      hasUserInfo: globalData.hasUserInfo,
      userInfo: globalData.userInfo
    })
    wx.request({
      url: `${getApp().globalData.host}api/v1/users/${id}/bookings`,
      success: function(res) {
        console.log(res)
        page.setData(res.data)
      }
    })
  },

  getBookings: function() {
    let user = this.data.user
    wx.request({
      url: `${getApp().globalData.host}api/v1/users/${user.id}/bookings`,
      success: (res) => {
        this.setData({bookings: res.data.bookings})
      }
    })
  },

  onShow: function () {
    const user = wx.getStorageSync('user')
    this.setData({user});
    this.getBookings();
  },

  goToShow: function (event) {
    console.log("check to show", event)
    let id = event.currentTarget.dataset.id
    console.log(id)
    wx.navigateTo({
      url: `/pages/show/show?id=${id}`,
    })
  },

  // goToShow2: function (event) {
  //   console.log("check to show", event)
  //   let id = event.currentTarget.dataset.id
  //   wx.navigateTo({
  //     url: `/pages/show/show?id=${id}`,
  //   })
  // },

  getFav: function(){
    wx.request({
      url: `${globalData.host}api/v1/users/${this.data.user.id}`,
      success: res=>{
        console.log("checking fav", res.data.faved_activities)
        this.setData({
          faved: res.data.faved_activities
        })
      }
    })
  },

  switchTab: function(e) {
    console.log("checking", e.currentTarget.dataset.tab)
    let activeTab = e.currentTarget.dataset.tab
    this.setData({
      activeTab: e.currentTarget.dataset.tab
    })
    activeTab == 1 ? this.getFav() : ''
  }
})