// pages/chatbox/chatbox.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    message:[],
    index: 0,
    totalMessage:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.chatbox_id);
    var that = this;
 
    that.getMessageList();
    // wx.request({
    //   url: app.globalData.host+'/chatbox?chatbox_id=' + options.chatbox_id,
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   success: function (res) {
    //     console.log(res);
    //     that.setData({
    //       totalMessage : res.data[0].message
    //     })
    //   }
    // })    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  addMessage:function () {
    var i = this.data.index;
    console.log(this.data.totalMessage.length);
    var that = this;
    // 使得按钮不能点击
    if(i>=this.data.totalMessage.length){
      // 跳出程序
      return;
    }

    console.log(this.data.totalMessage[i]);
    var message = this.data.message.concat(this.data.totalMessage[i]);
    
    that.setData({  
      message: message
    })

    i++;
    that.setData({
      index: i
    })    
    console.log(i);

    var query = wx.createSelectorQuery()
    query.select('.messageHeight').boundingClientRect()
    query.exec(function (res) {
    //  rect.id       节点的ID
    //  rect.dataset  节点的dataset
    //  rect.left     节点的左边界坐标
    //  rect.right    节点的右边界坐标
    //  rect.top      节点的上边界坐标
    //  rect.bottom   节点的下边界坐标
    //  rect.width    节点的宽度
    //  rect.height   节点的高度 
    //动态获取view元素的宽高
    console.dir(res);
    console.dir(res[0].height);
    console.dir(res[0].bottom);
    console.log(res[0].top); // 类messageHeight节点的上边界坐标
    wx.pageScrollTo({
    // scrollTop	Number	是	滚动到页面的目标位置（单位px）
    scrollTop: res[0].bottom+50000,
    // duration: 300
    })
  })  
  },


  getMessageList:function(){

   var app = getApp();
   var that = this;

   app.chatboxApi.getMessage().then(function(res){
     console.log("聊天信息: ");
     console.log(res[0].message);
     that.setData({
       totalMessage:res[0].message
     })

   })
   console.log("聊天信息: ");
   console.log();
   console.log(this.data.totalMessage)
    // console.log(this.data.totalMessage[message])
    //}//res end 
    // ).catch({
        // wx.showToast({
        //   title: '出错了！',
        //   icon: 'none'
        // })
        // console.log("HTTP 请求错误")
      // })
    // })
  }

})