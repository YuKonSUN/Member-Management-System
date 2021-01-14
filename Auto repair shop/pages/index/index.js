// // 0 引入 用来发送请求的 方法 一定要把路径补全
// import { request } from "../../request/request.js";
// Page({
//   data: {
//     // 轮播图数组
//     swiperList: [],
//     // 导航 数组
//     catesList:[],
//     // 楼层数据
//     floorList:[]
//   },
//   // 页面开始加载 就会触发
//   onLoad: function (options) {
//     // 1 发送异步请求获取轮播图数据  优化的手段可以通过es6的 promise来解决这个问题 
//     // wx.request({
//     //   url: 'https://api.zbztb.cn/api/public/v1/home/swiperdata',
//     //   success: (result) => {
//     //     this.setData({
//     //       swiperList: result.data.message
//     //     })
//     //   }
//     // });
    
//     this.getSwiperList();
//     this.getCateList();
//     this.getFloorList();
      
//   },

//   // 获取轮播图数据
//   getSwiperList(){
//     request({ url: "https://api.it120.cc/777ly/banner/list" })
//     .then(result => {
//       console.log(result)
//       this.setData({
        
//         swiperList: result
//       })
//     })
//   },
//   // 获取 分类导航数据
//   getCateList(){
//     request({ url: "https://api.it120.cc/777ly/shop/goods/category/all" })
//     .then(result => {
//       this.setData({
//         catesList: result
//       })
//     })
//   },
//   // 获取 楼层数据 
//   getFloorList(){ 
//     request({ url: "https://api.it120.cc/777ly/shop/goods/list" })
//     .then(result => {
//       this.setData({
//         floorList:result
//       })
//     })
//   },
// })

//Page Object
import {
  request,
  http,
} from '../../request/request';
const WXAPI = require('apifm-wxapi');
const app = getApp(); // 获取全局
Page({
  data: {
    swiperList: [],
    catesList: [],
    goodsList: [],
  },
  //options(Object)
  onLoad: function (options) {
    this.getSwiperList();
    this.getCateList();
    this.getGoodsList();
  },
  getSwiperList() {
    // http({
    //     url: "/banner/list"
    //   })
    //   .then(res => {
    //     const {
    //       data
    //     } = res;
    //     if (res.code == 0) {
    //       this.setData({
    //         swiperList: data
    //       })
    //     }
    //   })
    // handleDestruction 为定义在 app.js里面的全局方法，用于解构数据
    WXAPI.banners().then(res => app.handleDestruction(res))
      .then((data) => {


        this.setData({
          swiperList: data,
        })
      });
  },
  getCateList() {
    // http({
    //     url: "/shop/goods/category/all"
    //   })
    //   .then(res => {
    //     // console.log(res, '<-res->');
    //     const {
    //       data
    //     } = res;
    //     if (res.code == 0) {
    //       this.setData({
    //         catesList: data
    //       })
    //     }
    //   });
    WXAPI.goodsCategory().then(res => app.handleDestruction(res))
      .then((data) => {
        // console.log(data, '<-data456->');
        this.setData({
          catesList: data,
        })
      });
  },

  getGoodsList() {
    // http({
    //     url: "/shop/goods/list"
    //   })
    //   .then(res => {
    //     console.log(res, '<-res456->');
    //     const {
    //       data
    //     } = res;
    //     if (res.code == 0) {
    //       this.setData({
    //         goodsList: data
    //       })
    //     }
    //   });
    WXAPI.goods().then(res => app.handleDestruction(res))
      .then((data) => {
        // console.log(data, '<-data->');
        this.setData({
          goodsList: data,
        })
      });
  },
  handleToCategory(e) {
    
    getApp().globalData.custom = {
      index: e.currentTarget.dataset.index,
      id: e.currentTarget.dataset.id
    };

    wx.switchTab({
      url: '/pages/category/category',
      success: function () {
        var page = getCurrentPages().pop();
        if (page == undefined || page == null) return;
        page.onLoad();
      }
    });
  }
  // url="/pages/category/index" open-type="switchTab"
});