//app.js
App({
  
  globalData: {
    userInfo: null,
    // host: 'https://aimy.wogengapp.cn/',
    host: 'http://localhost:3000/',
  },


  onLaunch: function () {
    let page = this
    wx.login({
      success: res => {
        wx.request({
          url: page.globalData.host + 'api/v1/login',
          method: 'post',
          data: {
            code: res.code
          },
          success: (res) => {
            console.log("testing login", res)
            getApp().globalData.user = res.data.user
          }
        })
      }
    })

    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.hasUserInfo = true
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        } else {
          this.globalData.hasUserInfo = false
        }
      }
    })
  }
})