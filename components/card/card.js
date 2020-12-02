// components/card.js

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
    goToShow: function(event) {
      let id = event.currentTarget.dataset.id
      console.log("testingshow", event, id)
      wx.navigateTo({
        url:  `pages/show/show?id=${id}`
      })
    },
  }  
})


