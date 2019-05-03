// pages/chatbox/chatbox.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    message:[],       // chatbox页面加载的信息
    index: 0,         // 下标
    totalMessage:[]  // 所有的信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 打印页面contents传递过来的URL中的参数chatbox_id
    console.log(options.chatbox_id);
   	// 把this对象复制到临时变量that    
    var that = this;
	// 得到全部的聊天信息，实际情况下，如果一个页面的聊天信息比较多的化，最好能够分页加载数据
    that.totalMessage(options.chatbox_id);  
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
    query.select('#container').boundingClientRect()
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
    console.log(res);
    console.log("节点的上边界坐标");
    console.dir(res[0].top);
    console.log("节点的下边界坐标"); 
    console.dir(res[0].bottom);
    console.log("节点的高度");
    console.log(res[0].height);
    console.log("节点的左边界坐标");
    console.log(res[0].left);
    console.log("节点的右边界坐标");
    console.log(res[0].right);

    wx.pageScrollTo({
      // scrollTop	Number	是	滚动到页面的目标位置（单位px）
      scrollTop:  res[0].height,
      // duration: 300
    })
  })  
  },


	totalMessage:function(chatbox_id){
	  // 通过 getApp 方法获取到全局唯一的 App 示例
   	var app = getApp();
   	//把this对象复制到临时变量that
   	var that = this;

   	app.chatboxApi.getMessage(chatbox_id).then(function(res){
     	console.log(res[0].message);
     	that.setData({
       		totalMessage:res[0].message
     	})

   	}).catch(function(error){
  		wx.showToast({
  			title: '出错了！',
  			icon: 'none',
  		})
	})
  }

})