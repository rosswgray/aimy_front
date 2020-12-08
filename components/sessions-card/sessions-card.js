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
      console.log(e)
      const session_id = e.currentTarget.dataset.id;
      const page = this
      console.log(e)
      wx.navigateTo({
        url: `/pages/confirmation/confirmation?userid=${page.data.user.id}&sessionid=${session_id}&activity_id=${page.data.activity.id}`,
      }) 
     },
    // goToShow: function(event) {
    //   const id = event.currentTarget.dataset.id
    //   console.log(id)
    //   wx.navigateTo({
    //     url: `/pages/show/show?id=${id}`,
    //   })
    // },
  }
})
