//app.js
App({
  
  globalData: {
    userInfo: null,
    // host: 'https://aimy.wogengapp.cn/',
    host: 'http://localhost:3000/',
  },

  login: function () {
    wx.login({
      success: res => {
        wx.request({
          url: this.globalData.host + 'api/v1/login',
          method: 'POST',
          data: { code: res.code },
          success: (res) => { 
            this.getUserInfo(res.data.user_id);
          }
        })
      }
    })
  },

  getUserInfo: function (user_id) {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              const user = {
                id: user_id,
                hasInfo: true,
                userInfo: res.userInfo
              }
              wx.setStorageSync('user', user)
            }
          })
          this.globalData.hasUserInfo = true
        } else {
          const user = {
            id: user_id,
            hasInfo: false
          }
          this.globalData.hasUserInfo = false
          wx.setStorageSync('user', user)
        }
      }
      
    })
  },

  onLaunch: function () {
    this.login();
    this.getUserInfo();
  }   
})