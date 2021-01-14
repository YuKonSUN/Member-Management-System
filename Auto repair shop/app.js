//app.js

const WXAPI = require('apifm-wxapi');
App({
  // onLaunch: function () {
  //   // 展示本地存储能力
  
  //   // 登录
  //   wx.login({
  //     success: res => {
  //       // 发送 res.code 到后台换取 openId, sessionKey, unionId
  //     }
  //   })
  //   // 获取用户信息
  //   wx.getSetting({
  //     success: res => {
  //       if (res.authSetting['scope.userInfo']) {
  //         // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
  //         wx.getUserInfo({
  //           success: res => {
  //             // 可以将 res 发送给后台解码出 unionId
  //             this.globalData.userInfo = res.userInfo

  //             // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //             // 所以此处加入 callback 以防止这种情况
  //             if (this.userInfoReadyCallback) {
  //               this.userInfoReadyCallback(res)
  //             }
  //           }
  //         })
  //       }
  //     }
  //   })
  // },
  onLaunch: function (options) {
    WXAPI.init(this.globalData.subDomain);
  },
  handleDestruction(res) {
    const {
      data = []
    } = res; // 设默认值为 [] 以免获取数据失败时发生错误
    return data;
  },
  login(e) {
    if (!e.detail.userInfo) {
      // 你点了取消授权
      return;
    }
    wx.login({
      success: function (res) {
        const code = res.code; // 微信登录接口返回的 code 参数，下面登录接口需要用到
        WXAPI.login_wx(code).then(function (res) {
          // 登录接口返回结果
          console.log(res)
        })
      }
    })
  },
  onShow(e) {
    this.globalData.launchOption = e
    // 保存邀请人
    if (e && e.query && e.query.inviter_id) {
      wx.setStorageSync('referrer', e.query.inviter_id)
      if (e.shareTicket) {
        // 通过分享链接进来
        wx.getShareInfo({
          shareTicket: e.shareTicket,
          success: res => {
            // console.error(res)
            // console.error({
            //   referrer: e.query.inviter_id,
            //   encryptedData: res.encryptedData,
            //   iv: res.iv
            // })
            WXAPI.shareGroupGetScore(
              e.query.inviter_id,
              res.encryptedData,
              res.iv
            )
          }
        })
      }
    }
    // 自动登录
    // AUTH.checkHasLogined().then(isLogined => {
    //   if (!isLogined) {
    //     AUTH.login()
    //   }
    // })
  },
  globalData: {
    userInfo: null,
    subDomain: "777ly"
  }
})