// pages/category/category.js
import { request } from "../../request/request.js";
import regeneratorRuntime from '../../lib/runtime/runtime';


const WXAPI = require('apifm-wxapi');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cateList: [],
    leftMenuList: [],
    rightContent: [],
    currentIndex: 0,
    scrollTop: 0,
  },
  Cates: [],

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {},
  onLoad: function (options) {

    const {
      custom
    } = getApp().globalData; 

    this.handleItemTap(custom);


    const CatesName = wx.getStorageSync('CatesName');  //获取本地数据
    const CatesList = wx.getStorageSync('CatesList');
    if (!CatesName) {
      this.getCatesList();
    } else {
      if (Date.now() - CatesName.time > 1000 * 10) {
        this.getCatesList();
      } else {
        // 可以使用旧的数据
        // const { custom = {} } = getApp().globalData;
        this.Cates = CatesList.data;
        let leftMenuList = CatesName.data;
        let rightContent = null;
        if (custom) {
          rightContent = this.Cates.filter(v => v.categoryId == custom.id)
        } else {
          rightContent = this.Cates.filter(v => v.categoryId == leftMenuList[0].id)
        }
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
  },
  async getCatesList() {
    var that = this;
    const {
      custom
    } = getApp().globalData;

    await WXAPI.goodsCategory().then(res => app.handleDestruction(res))
      .then((data) => {
        let leftMenuList = data.map(v => {
          return {
            id: v.id,
            name: v.name
          }
        });
        wx.setStorageSync('CatesName', {
          time: Date.now(),
          data: leftMenuList
        });
        this.setData({
          leftMenuList,
        })
      });

    await WXAPI.goods().then(res => app.handleDestruction(res))
      .then((data) => {
        this.Cates = data;
        wx.setStorageSync('CatesList', {
          time: Date.now(),
          data: this.Cates
        });
        let rightContent = null;
        if (custom) {
          rightContent = data.filter(v => v.categoryId === custom.id)
        } else {
          rightContent = data.filter(v => v.categoryId === this.data.leftMenuList[0].id)
        }
        this.setData({
          rightContent,
        })
      });
  },
  handleItemTap(e) {
    let id = null;
    let index = 0;
    if (e) {
      if (!e.currentTarget) {
        id = e.id;
        index = e.index
      } else {
        id = e.currentTarget.dataset.id;
        index = e.currentTarget.dataset.index;
      }
    }

    let rightContent = this.Cates.filter(v => v.categoryId == id);
    this.setData({
      currentIndex: index,
      rightContent,
      scrollTop: 0,
    })

    // const {
    //   id,
    //   index,
    // } = e.currentTarget.dataset;
  },
})
// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {
//       leftMenuList:[],
//       rightContent:[],
//       //被点击的左侧菜单
//       currentIndex:0
//   },
//   //接口返回数据
//   Cates:[],
//   Goods:[],

//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function (options) {
//       this.getCates();
//       this.getShops();
  
//   },

//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   getCates(){
//     request({
//       url: "https://api.it120.cc/777ly/shop/goods/category/all"
//     })
//       .then(res=>{
//         console.log(res);
//         this.Cates=res.data;
//         let leftMenuList=this.Cates.data;
//         this.setData({
//           leftMenuList
//         })
//       })
//   },
//   getShops()
//   {
//     request({
//       url: "https://api.it120.cc/777ly/shop/goods/list"

//     })
//       .then(res=>{
//         console.log(res);
//         this.Goods=res.data;
//         let rightContent=res.data.data;
//         this.setData({
//           rightContent
//         })
//       })
//   },
//   handleItemTap(e){

//       const {index}=e.currentTarget.dataset;
//       this.setData({
//         currentIndex:index
//       })
//   }


// })