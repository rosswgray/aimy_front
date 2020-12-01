//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    index: 0,
    multiArray: [['Swimming', 'Yoga'], ['0-2', '2-6', '6-8'], ['Jingan', 'Xuhui']],
    objectMultiArray: [
      [{id: 0, name: 'Swimming'}, {id: 1, name: 'Yoga'}], 
      [{id: 0, name: '0-2'}, {id: 1, name: '2-6'},{id: 2, name: '6-8'}], 
      [{id: 0, name: 'Jingan'},{id: 1, name: 'Xuhui'}]
    ]
  },
  
//事件处理函数

  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  }, 
  onLoad: function (options) {
    const page = this; 

    wx.request({
      url: `${getApp().globalData.host}api/v1/activities/`,
      success: function(res) {
        const index = res.data.index
        page.setData({ index: index.slice(0,10) })
        console.log(index)
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
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
  })
