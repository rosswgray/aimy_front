//index.js
//获取应用实例
const app = getApp()


Page({
  data: {

  },

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  
  search: function(event) {
    // console.log("checking search", event)
    const page = this;
    const query = event.detail.value
    // console.log(query)
    wx.request({
      url: `${getApp().globalData.host}api/v1/activities?query=${query}`,
      success: function(res) {
        if (res.data) {
          page.setData({activities: res.data.activities})}
        // else {
        //   page.setData({errorMessage: "Sorry, no result found"})
        // }
        // console.log(222, res)
      }
    })
  },

  onLoad: function (options) {
    let user_id = wx.getStorageSync('user').id
    const page = this; 
    wx.request({
      url: `${getApp().globalData.host}api/v1/activities/`,
      body: {user_id: user_id},
      success: function(res) {
        console.log(res)
        const activities = res.data.activities
        page.setData({ activities: activities.slice(0,40) })
        // console.log(activities)
      }
      })
      
    }, 


  //   else if (this.data.canIUse) {
  //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //     // 所以此处加入 callback 以防止这种情况
  //     app.userInfoReadyCallback = res => {
  //       this.setData({
  //         userInfo: res.userInfo,
  //         hasUserInfo: true
  //       })
  //     }
  //   } else {
  //     // 在没有 open-type=getUserInfo 版本的兼容处理
  //     wx.getUserInfo({
  //       success: res => {
  //         app.globalData.userInfo = res.userInfo
  //         this.setData({
  //           userInfo: res.userInfo,
  //           hasUserInfo: true
  //         })
  //       }
  //     })
  //   }
  // },
  getUserInfo: function(e) {
    // console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
  })
