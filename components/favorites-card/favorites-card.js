Component({
  
  properties: {
    isInstructor: { type: Boolean, value: false },
    activity: { type: Object, value: {} }
  },

  data: {},
  
  methods: {
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
      wx.navigateTo({
        url: `/pages/confirmation/confirmation?user_id=${this.data.user_id}&sessionid=${session_id}&activity_id=${this.data.activity.id}`,
      }) 
     },
  
     getUserInfo: function(e){
      let userInfo = e.detail.userInfo
      let sessionId = e.target.dataset.id
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
    },
  }
})
