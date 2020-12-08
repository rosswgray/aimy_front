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
<<<<<<< HEAD
      const session_id = e.currentTarget.dataset.id;
      const page = this
      console.log("im in goToConfirm", session_id)
      wx.navigateTo({
        url: `/pages/confirmation/confirmation?userid=${page.data.user.id}&sessionid=${session_id}&activity_id=${page.data.activity.id}`,
      }) 
     },
     
      goToConfirmAfterLogin: function(id){
      console.log(e)
      const session_id = id;
=======
      console.log(e)
      const session_id = e.currentTarget.dataset.id;
>>>>>>> a595fb3460c0463714e6d0e9366d80e66cd09519
      const page = this
      console.log(e)
      wx.navigateTo({
        url: `/pages/confirmation/confirmation?userid=${page.data.user.id}&sessionid=${session_id}&activity_id=${page.data.activity.id}`,
      }) 
     },
<<<<<<< HEAD
  
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
=======
    // goToShow: function(event) {
    //   const id = event.currentTarget.dataset.id
    //   console.log(id)
    //   wx.navigateTo({
    //     url: `/pages/show/show?id=${id}`,
    //   })
    // },
>>>>>>> a595fb3460c0463714e6d0e9366d80e66cd09519
  }
})
