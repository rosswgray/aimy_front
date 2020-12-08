// components/sessions-card/sessions-card.js
Component({
  /**
   * Component properties
   */
  properties: {
    isInstructor: { type: Boolean, value: false },
    activity: { type: Object, value: {} }
  },

  /**
   * Component initial data
   */
  data: {

  },

  

  /**
   * Component methods
   */
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
      console.log(e)
      const session_id = id;
      const page = this
      console.log(e)
      wx.navigateTo({
        url: `/pages/confirmation/confirmation?user_id=${page.data.user_id}&sessionid=${session_id}&activity_id=${page.data.activity.id}`,
      }) 
     },
  
     getUserInfo: function(e){
      let userInfo = e.detail.userInfo
      let sessionId = e.target.dataset.id
      console.log("checking if it has has data-id", e)
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
      // put request to update userinfo on the backend
    },
  }
})
