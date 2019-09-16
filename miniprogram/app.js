//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
        env: 'test-gp4ml'
        // env:'apgy-876ffd'
      })
    }

    this.globalData = {}
  },
  getAjax(opts){
    wx.showLoading({
      title: '加载中',
      mask:true,
    });
    wx.cloud.callFunction({
      // 云函数名称
      name: opts.url,
      // 传给云函数的参数
      data:opts.params?opts.params:{},
      success: function (res) {
        if(opts.success){
          opts.success(res);
        }
      },
      fail(res){
        console.log("error:",res);
      },
      complete(){
        let timer = setTimeout(()=>{
          wx.hideLoading()
          clearTimeout(timer);
        },200);
      }
    });
  },
  showModal(content,success,fail){
    wx.showModal({
      title: '提示',
      content: content,
      showCancel:fail?true:false,
      success(res) {
        if (res.confirm) {
          if(success){
            success();
          }
        } else if (res.cancel) {
          if(fail){
            fail();
          }
        }
      }
    });
  },
  navigate(url){
    wx.navigateTo({
      url: url,
    });
  },
  relaunch(url){
    wx.reLaunch({
      url:url
    });
  },
  redirect(url){
    wx.redirectTo({
      url: url,
    });
  },
  getDateInfo(dateStr){
    let date;
    if (dateStr){
      date = new Date(dateStr);
    }else{
      date = new Date();
    }
    return{
      year:date.getFullYear(),
      month:date.getMonth()+1,
      date:date.getDate(),
      week:date.getDay()
    }
  },
  changeFooter(e){
    let url = e.currentTarget.dataset.url;
    this.relaunch(`/pages/${url}/${url}`);
  }
})
